import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { QR } from "@/models/qr.model";
import { QRUpdateSchema } from "@/schemas/backend";
interface Params {
  id: string;
}

// get request to fetch a qr code by id
export async function GET(request: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    const { id } = await params;
    const qr = await QR.findById(id);
    return NextResponse.json(qr, { status: 200 });
  } catch (err: any) {
    console.error("/api/qrs GET error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}

// delete request to delete a qr code by id
export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    const { id } = await params;
    await QR.findByIdAndDelete(id);
    return NextResponse.json({ message: "QR code deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("/api/qrs DELETE error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}

//patch  request also here to update textData
export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const parsedBody = QRUpdateSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.issues }, { status: 400 });
    }

    const { textData, uniqueLink, originalImageUrl } = parsedBody.data;
    const qr = await QR.findByIdAndUpdate(id, { textData, uniqueLink, originalImageUrl }, { new: true });
    return NextResponse.json(qr, { status: 200 });
  }
  catch (err: any) {
    console.error("/api/qrs PATCH error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}