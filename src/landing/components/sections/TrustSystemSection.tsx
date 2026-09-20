import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, UserCheck, HeartHandshake } from "lucide-react";

export function TrustSystemSection() {
  return (
    <section className="py-20 md:py-24 bg-[#F6F0E6]">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-[#202124] mb-3">
            Safety is intentional — before, during and after.
          </h2>
          <p className="text-base text-[#202124]/65 max-w-2xl mx-auto leading-relaxed">
            Participants who apply for experiences go through passport submission and admin review when required. Women’s comfort determines how experiences are designed; some additional checks are performed per experience where applicable.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-[#202124]/10 bg-white p-6 text-center">
            <h4 className="text-sm font-bold uppercase text-[#F26A2E] mb-2">Participants</h4>
            <p className="text-sm text-[#202124]/70">Passport submission and ID proof are required for participants in eligible experiences.</p>
          </div>
          <div className="rounded-2xl border border-[#202124]/10 bg-white p-6 text-center">
            <h4 className="text-sm font-bold uppercase text-[#234A3C] mb-2">Community screening</h4>
            <p className="text-sm text-[#202124]/70">Applications and review provide context and accountability.</p>
          </div>
          <div className="rounded-2xl border border-[#202124]/10 bg-white p-6 text-center">
            <h4 className="text-sm font-bold uppercase text-[#D9381E] mb-2">Women’s comfort</h4>
            <p className="text-sm text-[#202124]/70">Designs and formats are influenced by women’s comfort needs.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-[#202124]/10 bg-white p-6 text-center">
            <BadgeCheck className="mx-auto mb-3 h-6 w-6 text-[#F26A2E]" />
            <h3 className="font-serif text-lg text-[#202124] mb-1">Passport-reviewed participants</h3>
            <p className="text-sm text-[#202124]/65">Passport-led profiles and identity checks where applicable.</p>
          </div>

          <div className="rounded-2xl border border-[#202124]/10 bg-white p-6 text-center">
            <UserCheck className="mx-auto mb-3 h-6 w-6 text-[#234A3C]" />
            <h3 className="font-serif text-lg text-[#202124] mb-1">Screened Experiences</h3>
            <p className="text-sm text-[#202124]/65">Participation is structured; formats and criteria are shared upfront.</p>
          </div>

          <div className="rounded-2xl border border-[#202124]/10 bg-white p-6 text-center">
            <HeartHandshake className="mx-auto mb-3 h-6 w-6 text-[#D9381E]" />
            <h3 className="font-serif text-lg text-[#202124] mb-1">Clear Boundaries</h3>
            <p className="text-sm text-[#202124]/65">Consent, privacy and respectful behaviour are expected and communicated.</p>
          </div>
        </div>

        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/safety">
            <button className="inline-flex items-center gap-3 bg-[#202124] hover:bg-[#202124]/90 text-[#FFFDF9] rounded-full px-6 py-3 text-base font-medium transition-all">
              How we keep it safe
            </button>
          </Link>
          <Link
            to="/refund-policy"
            className="text-xs text-[#202124]/70 hover:text-[#F26A2E] font-medium transition-colors underline"
          >
            Review Booking &amp; Refund Policy
          </Link>
        </div>
      </div>
    </section>
  );
}
