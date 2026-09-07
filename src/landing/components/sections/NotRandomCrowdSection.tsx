import { motion } from "framer-motion";
import { ClipboardCheck, ShieldCheck, Users } from "lucide-react";

export function NotRandomCrowdSection() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Curated trips",
      desc: "Thoughtful itineraries designed with clear expectations, comfort and respect.",
    },
    {
      icon: Users,
      title: "City hangouts",
      desc: "Low-pressure local gatherings where participation is intentional and purpose-driven.",
    },
    {
      icon: ClipboardCheck,
      title: "Uncommon experiences",
      desc: "Formats that prioritise boundaries, consent and a considered crowd — not random entry.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F6F0E6] text-[#202124]">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block border border-[#F26A2E]/30 bg-[#F26A2E]/10 text-[#F26A2E] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8">
            Building safer social hangout spaces for women.
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Women First ≠ Random Crowd</h2>
          <p className="text-lg md:text-xl font-sans leading-relaxed text-[#202124]/80 max-w-3xl mx-auto">
            Curated trips, city hangouts and uncommon experiences where participants are
            passport-reviewed, boundaries are respected, and every experience becomes a stamp in
            your passport.
          </p>
          <p className="mt-4 text-base font-sans leading-relaxed text-[#202124]/75 max-w-2xl mx-auto">
            Men can be part of selected SNS experiences, but there is no open/random entry.
          </p>
          <p className="mt-4 text-base font-sans leading-relaxed text-[#202124]/75 max-w-2xl mx-auto">
            Our approach is intentional: who joins, how groups form, and the expectations everyone
            agrees to before an experience begins.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {points.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#FFFDF9] border border-[#202124]/10 rounded-2xl p-6 shadow-sm"
            >
              <Icon className="h-5 w-5 text-[#F26A2E] mb-4" />
              <h3 className="font-serif text-xl text-[#202124] mb-2">{title}</h3>
              <p className="text-sm font-sans text-[#202124]/65 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
