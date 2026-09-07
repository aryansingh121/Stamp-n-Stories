import { motion } from "framer-motion";
import { EyeOff, HandHeart, HeartHandshake, Lock, ShieldCheck } from "lucide-react";

export function WomenFirstVsOnlySection() {
  const womenFirstMeans = [
    { icon: ShieldCheck, label: "Safety" },
    { icon: HandHeart, label: "Comfort" },
    { icon: Lock, label: "Privacy" },
    { icon: HeartHandshake, label: "Respect" },
    { icon: EyeOff, label: "Discretion" },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#202124] text-[#FFFDF9]">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
            India’s Women-First Social Community
          </p>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Women First ≠ Women Only</h2>
          <p className="text-lg text-[#FFFDF9]/75 font-sans max-w-2xl mx-auto">
            Women First means women's safety, comfort, boundaries and overall experience are
            considered first when the community and experiences are designed. It does not mean
            every experience is exclusively for women.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16">
          {womenFirstMeans.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-[#FFFDF9]/10 bg-[#FFFDF9]/5 px-4 py-5 text-center"
            >
              <Icon className="mx-auto mb-3 h-5 w-5 text-[#F26A2E]" />
              <p className="text-sm font-bold tracking-wide uppercase text-[#FFFDF9]/75">{label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-3xl md:text-4xl font-serif">Women First vs Women Only</h3>
          <p className="mt-3 text-base text-[#FFFDF9]/75 font-sans">
            A common question, answered clearly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#FFFDF9]/5 border border-[#FFFDF9]/10 rounded-2xl p-8 md:p-12 hover:border-[#F26A2E]/50 transition-colors"
          >
            <h3 className="text-2xl font-serif text-[#F26A2E] mb-4">WOMEN FIRST</h3>
            <p className="text-[#FFFDF9]/80 font-sans leading-relaxed text-lg">
              Women First means women's safety, comfort, boundaries and overall experience are
              considered first when the community and experiences are designed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#FFFDF9]/5 border border-[#FFFDF9]/10 rounded-2xl p-8 md:p-12 hover:border-[#FFFDF9]/30 transition-colors"
          >
            <h3 className="text-2xl font-serif mb-4">WOMEN ONLY</h3>
            <p className="text-[#FFFDF9]/80 font-sans leading-relaxed text-lg">
              Women Only means an experience or community that is exclusively for women. Some
              StampNStories experiences may follow this format, depending on the event design.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto bg-[#F6F0E6] text-[#202124] p-8 rounded-2xl shadow-lg"
        >
          <p className="text-xl font-serif mb-2 font-bold text-[#F26A2E]">
            Women First doesn’t mean Women Only.
          </p>
          <p className="text-lg font-sans text-[#202124]/80 leading-relaxed">
            Selected experiences may include men, but women’s safety, comfort, privacy, and respect
            remain the design priority. Participation depends on the experience format and
            community requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
