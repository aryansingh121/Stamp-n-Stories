import { motion } from "framer-motion";

export function ExperiencesSection() {
  const experiences = [
    {
      title: "GOA EXPERIENCE",
      stamp: "The Susegad Stamp",
      desc: "Earn your chill. No tourists allowed. Three days. Four stamps. One uncommon Goa.",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "MUMBAI / DELHI / BENGALURU",
      stamp: "City Stamp",
      desc: "Short, curated meetups for verified members who want low-pressure offline plans.",
      image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "HOUSE PARTIES",
      stamp: "Circle Stamp",
      desc: "Invite-only gatherings with host-led moderation and clear community rules.",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "MOVIE NIGHTS",
      stamp: "Screen Stamp",
      desc: "Easy hangout format for women who want to meet people without awkward networking.",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "NATURE MISSIONS",
      stamp: "Wild Stamp",
      desc: "Phones down, guided routes, courage without unsafe pressure.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "BRAND EXPERIENCES",
      stamp: "Partner Stamp",
      desc: "Women-focused brands add comfort, safety and utility to real-life moments.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FFFDF9]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[#202124] mb-4">
            A year-round community.
          </h2>
          <p className="text-xl md:text-2xl text-[#202124]/70 font-serif italic">
            A passport that grows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#202124] flex items-end p-6 cursor-pointer"
            >
              <img 
                src={exp.image} 
                alt={exp.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-[#202124]/50 to-transparent"></div>
              
              <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full border border-[#F26A2E] flex items-center justify-center bg-[#F26A2E]/20 backdrop-blur-sm text-[#FFFDF9] text-xs">
                    <span className="w-2 h-2 bg-[#F26A2E] rounded-full"></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E]">
                    {exp.stamp}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#FFFDF9] mb-3">
                  {exp.title}
                </h3>
                <p className="text-sm text-[#FFFDF9]/80 leading-relaxed font-sans opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 overflow-hidden">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
