import { Schema, model, models, Types } from "mongoose";

const qrSchema = new Schema(
    {
        originalImageUrl: { type: String, required: true },
        qrCodeImageUrl: { type: String, required: true },
        uniqueLink: { type: String, required: true, unique: true, index: true },
        textData: { type: String, default: "" },
        owner: { type: Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export const QR = models.QR || model("QR", qrSchema);
