"use client";
import { Image } from "@imagekit/next";
import { useSession, signOut } from "next-auth/react";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

export default function HomePage() {
    const { data: session } = useSession();
    const fileRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const authenticator = async () => {
        const res = await fetch("/api/upload-auth");
        if (!res.ok) throw new Error("Failed to get auth params");
        return res.json();
    };

    if (!session) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-blue-200">
                <p>Please log in</p>
                <a href="/auth">Login</a>
            </main>
        );
    }

    const abortController = new AbortController();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const localUrl = URL.createObjectURL(file);
            setPreviewUrl(localUrl);
        }
    };

    const handleUpload = async () => {
        const file = fileRef.current?.files?.[0];
        if (!file) return alert("Please select a file");

        const { signature, expire, token, publicKey } = await authenticator();

        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                onProgress: (e) => console.log("Progress:", (e.loaded / e.total) * 100),
                abortSignal: abortController.signal,
            });

            const ownerId = (session.user as any)?.id || (session.user as any)?._id || null;
            const saveRes = await fetch("/api/qrs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: uploadResponse.url, owner: ownerId, textData: "hey" }),
            });

            if (!saveRes.ok) {
                console.error("Failed to save QR record:", await saveRes.text());
            } else {
                const created = await saveRes.json();
                console.log("Saved QR record:", created);
            }

            console.log("Upload response:", uploadResponse);
            // uploadResponse.url may be undefined; ensure we pass string | null
            setUploadedUrl(uploadResponse.url ?? null);
        } catch (error) {
            if (error instanceof ImageKitAbortError)
                console.error("Upload aborted.");
            else if (error instanceof ImageKitInvalidRequestError)
                console.error("Invalid request:", error.message);
            else if (error instanceof ImageKitServerError)
                console.error("Server error:", error.message);
            else if (error instanceof ImageKitUploadNetworkError)
                console.error("Network error:", error.message);
            else console.error("Unexpected error:", error);
        }
    };
 

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-red-200">
            <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
            <p className="mt-4 text-2xl">Hello, {session.user?.name}!</p>

            <span onClick={() => signOut()} className="cursor-pointer underline">
                Log out
            </span>

            {/* Show preview before upload */}
            {previewUrl && (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-64 h-64 object-cover rounded-lg shadow-md mt-4"
                />
            )}

            {/* Show final uploaded image */}
            {uploadedUrl && (
                <Image
                    src={uploadedUrl}
                    urlEndpoint="https://ik.imagekit.io/qrdeck/"
                    width={500}
                    height={500}
                    alt="Uploaded Image"
                    className="mt-6"
                />
            )}

            <input type="file" ref={fileRef} onChange={handleFileChange} />
            <button type="button" onClick={handleUpload} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                Upload file
            </button>
        </main>
    );
}
