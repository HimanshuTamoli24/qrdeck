import mongoose, { Schema, Model, Types } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, trim: true },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        profileImage: { type: String },

        isPremium: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },

        qrs: [{ type: Types.ObjectId, ref: "QR" }],
    },
    { timestamps: true }
);

export const User: Model<any> =
    mongoose.models.User || mongoose.model("User", userSchema);
