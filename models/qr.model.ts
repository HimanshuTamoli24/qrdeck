import mongoose, { Model, Schema } from "mongoose";

const qrSchema = new Schema({
    uniqueLink: { type: String, required: true, unique: true },
    qrCodeImage: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
},
    { timestamps: true }
);

export const QR: Model<any> = mongoose.models.QR || mongoose.model("QR", qrSchema);
