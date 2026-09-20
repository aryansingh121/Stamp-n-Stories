import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/landing/components/ui/accordion";

export interface FAQItem {
  q: string;
  a: string;
}

export const defaultCommunityFaqs: FAQItem[] = [
  {
    q: "Is this a women-only community?",
    a: "No. Women First does not necessarily mean Women Only. Women's safety, comfort, privacy and respect are prioritized, while selected experiences may include men based on the experience format and participation requirements.",
  },
  {
    q: "Does Women First mean random crowd?",
    a: "No. StampNStories is not an unrestricted entry crowd. Members and experiences are structured through passport review, community expectations and experience-specific criteria.",
  },
  {
    q: "What happens before, during and after an experience?",
    a: "Before: verification, screening and clear experience information. During: boundaries, host support where applicable and reporting paths. After: feedback, red-flag reporting and follow-up where needed.",
  },
  {
    q: "Is this a dating community?",
    a: "No. Not a dating app or singles party. Real connections may happen naturally, but the promise is safer social hangout spaces for women.",
  },
  {
    q: "Can I buy the passport online?",
    a: "No. Create a passport profile online, but the physical passport is issued only at a verified offline experience.",
  },
  {
    q: "How are stamps earned?",
    a: "Every stamp is earned through a mission, participation, witness proof and ceremony. Attendance alone does not earn a stamp.",
  },
  {
    q: "What happens if someone misbehaves?",
    a: "Serious misconduct can lead to an internal Red Stamp review, permanent removal and loss of future access.",
  },
  {
    q: "What kind of experiences do you host?",
    a: "Curated trips, city meetups, house parties, movie nights, cultural experiences and brand-backed utility events.",
  },
];

export interface FAQSectionProps {
  id?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  className?: string;
  bgClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  align?: "left" | "center";
}

export function FAQSection({
  id,
  badge,
  title = "Common questions",
  subtitle,
  items = defaultCommunityFaqs,
  className = "",
  bgClassName = "bg-[#FFFDF9]",
  containerClassName,
  contentClassName,
  align = "center",
}: FAQSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const isLeft = align === "left";
  const defaultContainer = isLeft ? "max-w-6xl" : "max-w-3xl";
  const resolvedContainer = containerClassName ?? defaultContainer;

  return (
    <section id={id} className={`py-20 md:py-28 ${bgClassName} ${className}`.trim()}>
      <div className={`container mx-auto px-6 md:px-12 ${resolvedContainer}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={isLeft ? "mb-12 text-left" : "text-center mb-16"}
        >
          {badge && (
            <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
              {badge}
            </p>
          )}
          <h2 className="text-3xl md:text-5xl font-serif text-[#202124]">{title}</h2>
          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-[#202124]/70 font-sans leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={contentClassName ?? (isLeft ? "max-w-3xl" : "w-full")}
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-[#202124]/10">
                <AccordionTrigger className="text-left font-serif text-lg md:text-xl text-[#202124] hover:no-underline hover:text-[#F26A2E] py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#202124]/70 font-sans text-base leading-relaxed pb-6 pr-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
