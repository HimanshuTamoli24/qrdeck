import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form, FormField, FormLabel, FormMessage, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

import { toast } from "sonner"
const contentSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address"),
    message: z.string().min(1, "Message is required"),
});

export default function Contact() {
    const form = useForm({
        resolver: zodResolver(contentSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });



    return (
        <section className="w-full min-h-screen flex items-center justify-center bg -amber-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden max-w-4xl w-full">

                {/* LEFT IMAGE */}
                <div className="relative h-64 md:h-auto overflow-hidden">

                    <Image
                        src="/contact.png"
                        alt="Contact"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* gradient fade overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-background via-background/40 via-background/20 to-transparent" />
                </div>


                {/* RIGHT FORM */}
                <div className="p-6 flex items-center inset-0 bg-gradient-to-r from-background via-background/70 to-transparent">
                    <Form {...form}>
                        <form
                            className="space-y-4 w-full"
                            onSubmit={form.handleSubmit((data) => console.log(data))}
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <Input placeholder="Enter your email" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <Textarea placeholder="Enter your message" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end">
                                <Button type="submit" className="cursor-pointer">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>
        </section>
    );
}
