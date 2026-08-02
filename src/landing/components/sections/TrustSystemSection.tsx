import { motion } from "framer-motion";

export function TrustSystemSection() {
  const steps = [
    {
      title: "Apply Online",
      desc: "Create a passport profile with basic details, comfort preferences and community-rule acceptance.",
    },
    {
      title: "Verification Check",
      desc: "Accepted identity document verified with a privacy-conscious process. One real member, not random entry.",
    },
    {
      title: "Show Up Offline",
      desc: "Physical passport cannot be bought online. Issued only at a verified offline experience.",
    },
    {
      title: "Unique Code",
      desc: "Each passport gets one lifetime member code linking stamps, access level and behaviour history.",
    },
    {
      title: "Earn Trust",
      desc: "Respectful participation earns stamps and unlocks future experiences.",
    },
    {
      title: "Consequences",
      desc: "Serious misconduct leads to Red Stamp review, permanent removal, loss of future access.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F6F0E6]">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[#202124] mb-6">
            A filtered community where people are accountable for how they behave.
          </h2>
          <p className="text-lg text-[#F26A2E] font-medium font-serif italic">
            For women, this means they are not entering a random crowd.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line connecting timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#202124]/10 transform -translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`md:w-1/2 flex flex-col ${i % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"} text-center`}
                >
                  <div className="bg-[#FFFDF9] p-8 rounded-2xl shadow-sm border border-[#202124]/5 w-full relative group hover:border-[#F26A2E]/20 transition-colors">
                    <h3 className="font-serif font-bold text-xl text-[#202124] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#202124]/70 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute md:static left-1/2 transform -translate-x-1/2 md:translate-x-0 bg-[#202124] w-12 h-12 rounded-full border-4 border-[#F6F0E6] flex items-center justify-center text-[#FFFDF9] font-serif font-bold text-lg z-10 hidden md:flex shadow-md">
                  0{i + 1}
                </div>

                {/* Mobile number badge (inline) */}
                <div className="bg-[#202124] w-10 h-10 rounded-full border-2 border-[#F6F0E6] flex items-center justify-center text-[#FFFDF9] font-serif font-bold text-sm z-10 md:hidden mt-[-2rem]">
                  0{i + 1}
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
