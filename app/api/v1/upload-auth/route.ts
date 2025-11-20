
import env from "@/config/env";
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {

    const { token, expire, signature } = getUploadAuthParams({
        privateKey: env.IMAGEKIT_PRIVATE_KEY,
        publicKey: env.IMAGEKIT_PUBLIC_KEY,
    })
    try {
        return Response.json({ token, expire, signature, publicKey: env.IMAGEKIT_PUBLIC_KEY })

    } catch (error) {
        console.error("Error generating upload auth params:", error);
        return new Response("Internal Server Error", { status: 500 });

    }
}