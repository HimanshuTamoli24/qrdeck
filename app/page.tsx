"use client";
import { useSession } from "next-auth/react";
import HeroSection from "@/components/custom/hero-section";
import WorkingFlow from "@/components/custom/working-flow-section";
import TestimonialSection from "@/components/custom/testimonial-section";

export default function HomePage() {
    const { data: session } = useSession();
    if (!session) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-blue-200">
                <p>Please log in</p>
                <a href="/auth">Login</a>
            </main>
        );
    }
    return (

        <section>
            <HeroSection />
            <WorkingFlow />
            <TestimonialSection />
        </section>
    );
}
