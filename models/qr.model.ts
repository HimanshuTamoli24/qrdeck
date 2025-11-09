import mongoose, { Schema, model, models } from "mongoose";

const qrSchema = new Schema(
    {
        imageKitUrl: { type: String, required: true },
        uniqueLink: { type: String, required: true, unique: true },
        qrCode: { type: String, required: true },
        textData: { type: String },
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

// Prevent OverwriteModelError during hot reloads
export const QR = models.QR || model("QR", qrSchema);


