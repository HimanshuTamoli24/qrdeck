"use client";
import { useSession,signOut } from "next-auth/react";

export default function HomePage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-yellow-200">
                Loading session...
            </main>
        );
    }

    if (!session) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-blue-200">
                <p>Please log in</p>
                <a href="/auth">Login</a>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-red-200">
            <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
            {session.user?.name && (
                <p className="mt-4 text-2xl">Hello, {session.user.name}!</p>
            )}
            <span onClick={() => signOut()}>log out</span>
        </main>
    );
}