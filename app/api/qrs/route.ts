import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import QRCode from "qrcode";
import { QR } from "@/models/qr.model";
import imagekit from "@/lib/imagekit";

export async function POST(request: Request) {
  try {
    await connectDB();  // ALWAYS FIRST

    const body = await request.json();
    const { url, owner, textData } = body;

    if (!url || !owner) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // generate QR PNG buffer
    const buffer = await QRCode.toBuffer(url, {
      type: "png",
      errorCorrectionLevel: "H",
    });

    // upload to imagekit
    const uploaded = await imagekit.upload({
      file: buffer,
      fileName: `qr-${Date.now()}.png`,
    });

    // store in DB
    const qr = await QR.create({
      owner,
      uniqueLink: Math.random().toString(36).substring(2, 15),
      qrCode: uploaded.url,
      imageKitUrl: uploaded.url,
      textData: textData || "",
    });

    return NextResponse.json(qr, { status: 201 });
  } catch (err: any) {
    console.error("/api/qrs error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
