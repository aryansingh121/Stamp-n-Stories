import { motion } from "framer-motion";

export function StampsSection() {
  const stamps = [
    {
      title: "ROOTS STAMP",
      subtitle: "Curiosity and connection.",
      desc: "Learn one local story, speak meaningfully with one new person and write one reflection.",
      color: "border-[#F26A2E]",
      bg: "bg-[#F26A2E]/10",
    },
    {
      title: "WILD STAMP",
      subtitle: "Attention and courage.",
      desc: "Complete a silent mission, observe details and choose one safe act of courage.",
      color: "border-[#234A3C]",
      bg: "bg-[#234A3C]/10",
    },
    {
      title: "FIRE STAMP",
      subtitle: "Honesty and listening.",
      desc: "Join a phones-down story circle by sharing honestly or listening fully and appreciating someone.",
      color: "border-[#D9381E]", // a redder orange
      bg: "bg-[#D9381E]/10",
    },
    {
      title: "SUSEGAD STAMP",
      subtitle: "Presence and community.",
      desc: "Respect pace, complete a kindness mission, write passport notes and leave the place better.",
      color: "border-[#E1B12C]", // mustard yellow
      bg: "bg-[#E1B12C]/10",
    },
  ];

  const stampNotes = [
    {
      title: "What a stamp can signal",
      desc: "A stamp signifies recorded participation confirmed for that experience; it reflects past participation but is not a guarantee of future behaviour.",
    },
    {
      title: "What comes before it",
      desc: "Identity review, community-rule acceptance, experience information and policy understanding happen before members participate.",
    },
    {
      title: "What may be checked per experience",
      desc: "Host format, group size, comfort needs, emergency contact details, privacy rules and safety protocols are shared where applicable.",
    },
    {
      title: "What it does not promise",
      desc: "A stamp is not a character certificate. Red-flag reporting and personal boundaries still matter after every experience.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#202124] text-[#FFFDF9] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[#F6F0E6]">
            You cannot buy a stamp. You can only earn it.
          </h2>
          <p className="text-xl text-[#F26A2E] font-serif italic max-w-2xl mx-auto">
            Challenge + Participation + Witness + Ceremony = Earned Stamp
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stamps.map((stamp, i) => (
            <motion.div
              key={stamp.title}
              initial={{ opacity: 0, y: 30, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative aspect-square rounded-full border-2 border-dashed ${stamp.color} ${stamp.bg} flex flex-col items-center justify-center p-8 text-center cursor-pointer`}
            >
              <div
                className={`absolute inset-2 border ${stamp.color} rounded-full opacity-50`}
              ></div>
              <h3 className="font-serif font-bold text-lg tracking-wider mb-2">{stamp.title}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[#F6F0E6]/75 mb-3">
                {stamp.subtitle}
              </p>
              <p className="text-xs text-[#F6F0E6]/80 leading-relaxed max-w-[180px]">
                {stamp.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto border-t border-[#FFFDF9]/10 pt-12"
        >
          <p className="text-center text-lg font-sans text-[#FFFDF9]/90 leading-relaxed mb-4">
            You cannot buy a stamp. You can only earn it by showing up with presence, respect,
            courage and connection.
          </p>
          <p className="text-center text-sm font-sans text-[#FFFDF9]/60 leading-relaxed mb-10">
            Note: A stamp signifies recorded participation confirmed for that experience; it reflects past participation but is not a guarantee of future behaviour.
          </p>

          <div className="grid md:grid-cols-2 gap-4 text-left">
            {stampNotes.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#FFFDF9]/10 bg-[#FFFDF9]/5 p-5"
              >
                <h3 className="font-serif text-lg text-[#F6F0E6] mb-2">{item.title}</h3>
                <p className="text-sm font-sans text-[#FFFDF9]/75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
