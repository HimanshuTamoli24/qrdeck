import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const PLANS = [
  {
    name: "5 Week Plan",
    price: "₹499",
    duration: "per 5 weeks",
    highlight: false,
    description: "Perfect for short-term testing and feature exploration.",
    features: [
      "Up to 50 QR Codes",
      "Basic Analytics",
      "Custom Branding",
      "Email Support",
      "Limited Scan History",
    ],
  },
  {
    name: "Yearly Plan",
    price: "₹4,999",
    duration: "per year",
    highlight: true,
    description: "Best value for long-term creators and businesses.",
    features: [
      "Unlimited QR Codes",
      "Advanced Analytics",
      "Priority Support",
      "Custom Domains",
      "Full Scan History",
    ],
  },
];

export default function PricingPage() {
  return (
    <section className="w-full py-20 flex justify-center items-center">
      <div className="max-w-5xl w-full px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold">Simple Pricing</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Choose a plan that matches your workflow
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative w-sm ">
                <Image src="/plan.png" alt="Plan Image" fill className="object-cover absolute" />
            </div>
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative rounded-2xl border transition-all hover:border-primary`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}

              <CardHeader className="space-y-2">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">
                    {plan.duration}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.highlight ? "" : "variant-outline"
                  }`}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}