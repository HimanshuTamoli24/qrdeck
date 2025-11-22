"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function NotFound() {
  const [devName, setDevName] = useState("");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background  py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2  items-center"
      >
        <div className="relative  flex justify-center items-center">
          <div className=" w-full h-200 relative mx-auto">
            <Image
              src="/404.png"
              alt="404 Death Page"
              fill
              priority
              className="object-contain size-60 min-w-xl sm:min-w-2xl md:min-w-4xl h-full z-0"
            />
          </div>

          <div className="absolute text-xs overflow-hidden top-55 right-20 max-w-40  font-extrabold 
            text-primary-foreground z-30 px-4 py-3 text-pretty "> 
            {devName
              ? `Developer ${devName} has been officially summoned by Death.`
              : "Type a developer name... judgment awaits."}
          </div>
        </div>

        <div className="flex flex-col space-y-4 justify-center items-center  text-center md:text-left order-2 ">
          <span className="text-primary font-semibold tracking-wide">Oops!!</span>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Page Not Found
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            The page you are looking for wandered into the void and never returned.
            The Death Creature is already blaming someone for this catastrophe.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl w-full sm:w-auto">
                <ArrowLeft className="mr-2 size-4" />
                Go Back Home
              </Button>
            </Link>

            <div className="flex w-full sm:w-auto z-40">
              <Input
                value={devName}
                onChange={(e) => setDevName(e.target.value)}
                placeholder="Enter developer name..."
                className="rounded-none  border-r-0 focus-visible:ring-primary"
              />
              <Button className="rounded-none  bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
