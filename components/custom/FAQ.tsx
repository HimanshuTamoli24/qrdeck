import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQs } from "@/config/constant"



export default function FAQ() {
  return (
    <section className="w-full py-16 flex justify-center">
      <div className="w-full max-w-3xl px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-2">FAQs</h2>
          <p className="text-muted-foreground text-sm ">
            Need help? Find quick answers here or contact us at
            <a
              href="mailto:himanshutamoli2005@gmail.com"
              className="text-primary font-medium ml-1 whitespace-nowrap"
            >
              himanshutamoli2005@gmail.com
            </a>
          </p>
        </div>

        {/* FAQ List */}
        <Accordion type="single" collapsible className="space-y-3 ">
          {FAQs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-xl border border-border bg-transparent px-4"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
