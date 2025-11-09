import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import QRCode from "qrcode";
import { QR } from "@/models/qr.model";
import imagekit from "@/lib/imagekit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, owner, textData } = body;

    if (!url || !owner) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    const buffer = await QRCode.toBuffer(url, {
      type: "png",
      errorCorrectionLevel: "H",
    });
    const uploaded = await imagekit.upload({
      file: buffer,
      fileName: `qr-${Date.now()}.png`,
    });

    const qr = await QR.create({
      uniqueLink: Math.random().toString(36).substring(2, 15),
      imageKitUrl: url,
      qrCode: await uploaded.url,
      textData: textData || "",
      owner,
    });

    return NextResponse.json(qr, { status: 201 });
  } catch (err: any) {
    console.error("/api/qrs error:", err);
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}
