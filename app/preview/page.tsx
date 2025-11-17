"use client";

import DragAndDrop from "@/components/draganddrop";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PreviewPage() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    return (
        <section className="w-full h-screen bg-black box-border overflow-hidden">
            <main className="h-full grid grid-cols-9 w-full ">

                <aside className="bg-red-400 col-span-2 p-6">
                    <h1 className="text-3xl font-bold mb-4">Preview Page</h1>
                    <DragAndDrop setPreviewUrl={setPreviewUrl} />
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
                        <Button> Genrate QR</Button>
                    </div>
                </section>

                <aside className="bg-green-400 col-span-2 p-6">
                    <h1 className="text-3xl font-bold mb-4">Preview Page</h1>
                </aside>

            </main>
        </section>
    );
}
