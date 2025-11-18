"use client";

import DragAndDrop from "@/components/draganddrop";
import { Button } from "@/components/ui/button";
import { ImageKitAbortError, upload } from "@imagekit/next";
import { X } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCreateQr, useImagekitAuthCheck } from "@/hooks/base.hook";
import { redirect } from "next/navigation";

export default function PreviewPage() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { data: session } = useSession();
    const abortControllerRef = useRef<AbortController | null>(null);
    const { data: imagekitAuthData } = useImagekitAuthCheck();
    const { mutateAsync: uploadImage, isLoading, isError } = useCreateQr();
    const [uploading, setUploading] = useState(false);
    const handleUpload = async () => {
        if (!previewUrl) return;
        setUploading(true);
        abortControllerRef.current = new AbortController();

        try {
            const { signature, expire, token, publicKey } = imagekitAuthData || {};
            const uploadResponse = await uploadToImagekit(previewUrl, { signature, expire, token, publicKey }, abortControllerRef.current.signal);
            console.log("Upload started...");
            const url = (uploadResponse && (uploadResponse as any).url) || null;
            if (!url) throw new Error("Upload succeeded but no URL was returned");

            const ownerId = (session?.user as any)?.id || (session?.user as any)?._id || null;

            uploadImage({ originalImageUrl: url, owner: ownerId, textData: "hey" });
            console.log("Upload response:", uploadResponse);
            setPreviewUrl(null);
        } catch (error) {
            if (error instanceof ImageKitAbortError) console.error("Upload aborted.");
            else console.error(error);
        } finally {
            setUploading(false);
            abortControllerRef.current = null;
            redirect('/dashboard')
        }
    };

    return (
        <section className="w-full h-screen bg-black box-border overflow-hidden">
            <main className="h-full grid grid-cols-9 w-full ">

                <aside className="bg-red-400 col-span-2 p-6">
                    <h1 className="text-3xl font-bold mb-4">Preview Page</h1>
                    <div>

                    </div>

                </aside>

                <section className="bg-blue-400 col-span-5 p-6 flex flex-col items-center justify-center">
                    <div className="w-full relative min-h-60 max-h-120 h-full flex items-center justify-center border-4 border-dashed border-gray-300 rounded-lg">

                        {previewUrl && (
                            <span
                                onClick={() => setPreviewUrl(null)}
                                className="absolute right-1 top-1 rounded-full hover:bg-white/40 z-10 cursor-pointer"
                            >
                                <X />
                            </span>
                        )}

                        {previewUrl ? (
                            <div className="relative w-full h-full ">
                                <Image
                                    src={previewUrl}
                                    alt="preview"
                                    fill
                                    className="object-contain rounded-md p-2"
                                />
                            </div>
                        ) : (
                            <DragAndDrop setPreviewUrl={setPreviewUrl} />
                        )}
                    </div>
                    <div className="mt-4">
                        <Button onClick={handleUpload} disabled={!previewUrl || uploading}>
                            {uploading ? "Uploading..." : "Generate QR"}
                        </Button>
                    </div>
                </section>

                <aside className="bg-green-400 col-span-2 p-6">
                    <h1 className="text-3xl font-bold mb-4">Preview Page</h1>
                </aside>

            </main>
        </section>
    );
}

interface UploadAuth {
    signature: string;
    expire: number;
    token: string;
    publicKey: string;
}
async function uploadToImagekit(previewUrl: string, auth: UploadAuth, signal: AbortSignal) {
    const { signature, expire, token, publicKey } = auth;

    return await upload({
        expire,
        token,
        signature,
        publicKey,
        file: previewUrl,
        fileName: `${Date.now()}.png`,
        abortSignal: signal,
    });
}
