import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { Button } from "@/landing/components/ui/button";
import { StampsSection } from "@/landing/components/sections/StampsSection";
import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export function ExperiencesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Experiences | Stamp N Stories";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9] text-[#202124]">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 bg-[#FFFDF9] border-b border-[#202124]/6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.25em] uppercase text-[#F26A2E] mb-4"
            >
              EXPERIENCES
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#202124] leading-tight mb-6"
            >
              Experiences Built Around People.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#202124]/75 font-sans max-w-2xl mx-auto leading-relaxed"
            >
              Every Stamp N Stories experience is intentional, small-group and passport-reviewed.
              We don&apos;t do crowded tours or generic sightseeing — we curate moments that leave a
              lasting mark.
            </motion.p>
          </div>
        </section>

        {/* Flagship Event: Goa Uncovered */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F6F0E6]">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-2">
                  Featured Experience
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-[#202124]">
                  Now Accepting Applications
                </h2>
              </div>
              <Link
                to="/events/goa-susegad"
                className="text-xs font-bold tracking-widest uppercase text-[#202124]/60 hover:text-[#F26A2E] transition-colors mt-4 md:mt-0 flex items-center gap-1.5"
              >
                View Full Itinerary <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden bg-[#202124] text-[#FFFDF9] shadow-xl border border-[#202124]/10 grid md:grid-cols-12"
            >
              <div className="md:col-span-6 relative min-h-[320px] md:min-h-full">
                <img
                  src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop"
                  alt="Goa Uncovered"
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#202124]/80 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#FFFDF9] bg-[#F26A2E] px-3 py-1 rounded-full">
                    TRAVEL
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#FFFDF9]/90 bg-[#202124]/70 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
                    SUSEGAD STAMP
                  </span>
                </div>
              </div>

              <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 text-[#FFFDF9]">
                    Goa Uncovered
                  </h3>
                  <p className="text-base text-[#FFFDF9]/80 font-sans leading-relaxed mb-6">
                    A slow, soulful retreat in South Goa. Slow mornings, local bakeries, curated
                    brunches, sunset cliffs and phones-down story circles.
                  </p>

                  <div className="space-y-3 mb-8 text-sm text-[#FFFDF9]/70 font-sans">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#F26A2E]" />
                      <span className="text-[#FFFDF9] font-medium">15 Sep & 25 Sep 2026</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#F26A2E]" />
                      <span className="text-[#FFFDF9] font-medium">South Goa</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-[#F26A2E]" />
                      <span className="text-[#FFFDF9] font-medium">14 People Only</span>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#F26A2E] bg-[#F26A2E]/10 border border-[#F26A2E]/20 px-2 py-0.5 rounded-full ml-1">
                        Applications Open
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                  <Link to="/events/goa-susegad">
                    <Button className="w-full sm:w-auto rounded-full px-8 py-5 text-xs font-bold tracking-widest uppercase bg-[#F26A2E] hover:bg-[#F26A2E]/90 text-white border-transparent">
                      VIEW EVENT →
                    </Button>
                  </Link>
                  <Link to="/events/goa-susegad/request-invite">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto rounded-full px-8 py-5 text-xs font-bold tracking-widest uppercase border-white/20 text-[#FFFDF9] hover:bg-white/10"
                    >
                      REQUEST INVITE
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stamps Overview Section */}
        <StampsSection />

        {/* Vision Link CTA */}
        <section className="py-20 px-6 md:px-12 bg-[#FFFDF9] text-center border-t border-[#202124]/8">
          <div className="container mx-auto max-w-3xl">
            <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">
              Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#202124] mb-4">
              Behind Every Experience Is A Vision.
            </h2>
            <p className="text-base text-[#202124]/70 font-sans max-w-xl mx-auto mb-8">
              Discover how we are rethinking community, travel, and belonging.
            </p>
            <Link to="/vision">
              <Button className="rounded-full px-8 py-5 text-xs font-bold tracking-widest uppercase bg-[#202124] hover:bg-[#202124]/90 text-[#FFFDF9]">
                READ OUR VISION →
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
