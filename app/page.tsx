"use client";
import HeroSection from "@/components/custom/hero-section";
import WorkingFlow from "@/components/custom/working-flow-section";
import TestimonialSection from "@/components/custom/testimonial-section";
import FAQ from "@/components/custom/FAQ";
import Footer from "@/components/custom/footer";
import Contact from "@/components/custom/contact";
import Plan from "@/components/custom/plan";

export default function HomePage() {
    return (

        <section className="">

            <HeroSection />
            <WorkingFlow />
            <TestimonialSection />
            <Plan />
            <FAQ />
            <Contact />
            <Footer />
        </section>
    );
}
