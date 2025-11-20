import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import QRCode from "qrcode";
import { QR } from "@/models/qr.model";
import imagekit from "@/lib/imagekit";
import { QRCreateSchema } from "@/schemas/backend";
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const parsedBody = QRCreateSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.issues }, { status: 400 });
    }

    const { originalImageUrl, owner, textData } = parsedBody.data;

    // generate QR PNG buffer
    const buffer = await QRCode.toBuffer(originalImageUrl, {
      type: "png",
      errorCorrectionLevel: "H",
    });

    // upload to imagekit
    const uploaded = await imagekit.upload({
      file: buffer,
      fileName: `qr-${Date.now()}.png`,
    });

    function shortId(length = 6) {
      return crypto.randomBytes(Math.ceil(length * 0.75))
        .toString("base64url")   // URL-safe
        .slice(0, length);
    }

    // store in DB
    const qr = await QR.create({
      originalImageUrl,
      owner,
      uniqueLink: shortId(5),
      qrCodeImageUrl: uploaded.url,
      textData: textData || "",
    });

    return NextResponse.json(qr, { status: 201 });
  } catch (err: any) {
    console.error("/api/qrs error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const qrs = await QR.find().sort({ createdAt: -1 });
    return NextResponse.json(qrs, { status: 200 });
  } catch (err: any) {
    console.error("/api/qrs GET error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
