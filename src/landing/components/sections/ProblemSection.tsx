import { motion } from "framer-motion";

export function ProblemSection() {
  const fears = [
    "Random groups",
    "Poor moderation",
    "Pressure culture",
    "Unknown crowd",
    "Unclear rules",
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F6F0E6] relative">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[#202124] mb-8 leading-tight">
            Women want to go out. <br />
            <span className="text-[#F26A2E] italic">Most plans don't feel safe enough.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#202124]/80 leading-relaxed max-w-3xl mx-auto font-sans">
            Women want to go out, travel, meet new people and experience more of life. But most
            offline plans come with one big question: Will the crowd feel safe enough? Random
            groups, poor moderation, pressure culture, forced content, unknown men and unclear rules
            make many women think twice before saying yes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#202124] text-[#F6F0E6] p-8 md:p-12 rounded-2xl my-16 text-center shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F26A2E] to-transparent opacity-50"></div>
          <h3 className="font-serif text-2xl md:text-4xl italic font-medium leading-relaxed">
            "Women should not have to think ten times before saying yes to a plan."
          </h3>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {fears.map((fear, i) => (
            <motion.div
              key={fear}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#FFFDF9] border border-[#202124]/10 px-6 py-3 rounded-full text-[#202124] font-medium text-sm shadow-sm hover:border-[#F26A2E]/50 transition-colors"
            >
              {fear}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center font-serif text-xl md:text-2xl text-[#202124] font-bold"
        >
          StampNStories exists to solve this trust gap.
        </motion.p>
      </div>
    </section>
  );
}
