import { colors, patterns, Testimonials } from "@/config/constant";
import { ArrowRight } from "lucide-react";
import { Card } from "../ui/card";


export default function TestimonialSection() {
    let index = 0;
    let p = 0;
    const rows = [];

    while (index < Testimonials.length) {
        const count = patterns[p % patterns.length];
        rows.push(Testimonials.slice(index, index + count));
        index += count;
        p++;
    }

    return (
        <section className="w-full py-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="space-y-0  border-border border-md">
                    {rows.map((row, i) => (
                        <div
                            key={i}
                            className="flex  flex-col sm:grid gap-0"
                            style={{
                                gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
                            }}
                        >
                            {row.map((testimonial) => (
                                <CardBox key={testimonial.id} {...testimonial} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


interface CardProps {
    title: string;
    description: string;
    link: string;
}

function CardBox({ title, description, link }: CardProps) {
    const bgColor = colors[Math.floor(Math.random() * colors.length)]
    return (
        <Card className="group rounded-none border-2 border-border transition-all duration-300 bg-transparent hover:bg-white/5 hover:border-primary hover:rounded-sm cursor-pointer    ">
            <div className="p-4 flex flex-col h-full justify-between">

                <div
                    className="text-sm font-semibold px-3 py-1 rounded-md text-white w-fit mb-3"
                    style={{ backgroundColor: bgColor }}
                >
                    {title}
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed">
                    {description}
                </p>

                <div className="flex justify-between items-center pt-4">
                    {link && (
                        <a href={link} className="text-sm text-blue-400 hover:underline">
                            Read more
                        </a>
                    )}

                    <ArrowRight className="text-zinc-500 size-4 group-hover:text-primary hover:scale-105 transition-colors duration-300" />
                </div>
            </div>
        </Card>
    );

}
