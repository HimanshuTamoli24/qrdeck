"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { people } from "@/config/constant"
import { AnimatedTooltip } from "../ui/animated-tooltip"
import { Button } from "../ui/button"

export default function HeroSection() {
  const router = useRouter()

  return (
    <section className="w-full h-screen flex items-center mx-auto max-w-7xl px-4">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between w-full">

        {/* LEFT */}
        <div className="flex flex-col sm:items-start items-center sm:text-left text-center max-w-lg">

          <div className="flex items-center justify-center sm:justify-start w-full mb-10">
            <AnimatedTooltip items={people} />
            <span className="ml-5 text-xl text-primary">{people.length}+ Paid Users</span>
          </div>

          <h3 className="md:text-5xl sm:text-4xl text-xl font-bold mb-4 max-w-xl">
            Image → QR Code.
            <span className="whitespace-nowrap"> Fast, Reliable, Shareable.</span>
          </h3>

          <div className="text-md sm:text-lg  mb-8 max-w-xl leading-tight">
            A single QR keeps your image always{" "}
            {["accessible,", "anywhere,", "anytime"].map((word, i) => (
              <span key={i} className="text-primary font-semibold px-1">
                {word}
              </span>
            ))}
            .
          </div>

          <Button
            variant="primary"
            className="font-semibold"
            onClick={() => router.push("/preview")}
          >
            Get Started
          </Button>
        </div>

        {/* RIGHT */}
        <div className="relative w-full w-80 h-80 sm:w-96 sm:h-96 my-10 sm:mt-0">
          <Image
            src="/land.jpg"
            alt="Hero Image"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}
