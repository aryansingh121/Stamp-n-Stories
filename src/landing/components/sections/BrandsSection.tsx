import { motion } from "framer-motion";
import { Button } from "@/landing/components/ui/button";

export function BrandsSection() {
  const benefits = [
    {
      title: "Real product usage",
      desc: "Get your product in the hands of a curated audience in real-world scenarios.",
    },
    {
      title: "Content assets",
      desc: "Earn authentic, non-staged content of real women experiencing your brand.",
    },
    {
      title: "Passport recall",
      desc: "Brands get represented as official stamps in the member's lifetime passport.",
    },
    {
      title: "Trust transfer",
      desc: "Align your brand with safety, respect, and premium curation.",
    },
    {
      title: "Feedback",
      desc: "Direct, honest insights from a highly engaged female demographic.",
    },
    {
      title: "Differentiation",
      desc: "Move away from noisy influencer feeds to meaningful offline experiences.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#202124] text-[#FFFDF9]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block border border-[#FFFDF9]/20 bg-[#FFFDF9]/5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8">
            For Brands
          </span>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
            Partner with the community helping women feel comfortable saying yes.
          </h2>
          <p className="text-lg text-[#FFFDF9]/70 font-sans leading-relaxed">
            Your brand is not interrupting the experience. Your brand is helping women feel prepared
            enough to enter it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-left border border-[#FFFDF9]/10 p-8 rounded-2xl bg-[#FFFDF9]/5 hover:bg-[#FFFDF9]/10 transition-colors"
            >
              <h3 className="font-serif text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-[#FFFDF9]/60 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-[#F26A2E] text-[#F26A2E] hover:bg-[#F26A2E] hover:text-[#FFFDF9] rounded-full px-8 h-14 font-bold tracking-wide uppercase transition-all"
          >
            Partner with us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
