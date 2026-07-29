import { motion } from "framer-motion";

export function RulesSection() {
  const nos = [
    "No pressure for numbers, DMs, photos, dancing or social media.",
    "No unwanted touching, comments or forced closeness.",
    "No filming private moments without consent.",
    "No alcohol-led behaviour that affects others' comfort.",
    "No disrespect towards women, crew, locals or other members.",
    "No passport, no entry to offline experiences.",
  ];

  const yeses = [
    "Be friendly, not forceful.",
    "Ask before recording.",
    "Respect silence, rest and personal space.",
    "Contribute to the group without dominating.",
    "Report discomfort privately and early.",
    "Earn trust by how you behave, not by what you pay.",
  ];

  return (
    <section className="flex flex-col lg:flex-row min-h-[80vh]">
      {/* NO Section */}
      <div className="lg:w-1/2 bg-[#234A3C] text-[#FFFDF9] py-24 px-8 md:px-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto lg:mr-0 w-full"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Zero Tolerance.</h2>
          <p className="text-[#F26A2E] font-bold tracking-widest uppercase text-sm mb-12">
            Clear rules. Real consequences.
          </p>

          <ul className="space-y-6">
            {nos.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-6 h-6 shrink-0 rounded-full border border-[#FFFDF9]/30 flex items-center justify-center mt-0.5 text-xs text-[#FFFDF9]/50">
                  ✕
                </span>
                <span className="text-lg leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* YES Section */}
      <div className="lg:w-1/2 bg-[#F6F0E6] text-[#202124] py-24 px-8 md:px-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto lg:ml-0 w-full"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Community Code.</h2>
          <p className="text-[#202124]/60 font-bold tracking-widest uppercase text-sm mb-12">
            How we show up.
          </p>

          <ul className="space-y-6">
            {yeses.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-6 h-6 shrink-0 rounded-full border border-[#202124]/30 flex items-center justify-center mt-0.5 text-xs text-[#202124]/50">
                  ✓
                </span>
                <span className="text-lg leading-snug font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
