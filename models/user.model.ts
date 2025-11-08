import mongoose, { Schema, Model } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String },
    isPremimum: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    qrs: [{ type: Schema.Types.ObjectId, ref: "QR" }],
}, {
    timestamps: true,
})
export const User: Model<any> = mongoose.models.User || mongoose.model("User", userSchema);
