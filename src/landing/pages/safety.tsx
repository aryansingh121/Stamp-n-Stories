import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { Button } from "@/landing/components/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  ClipboardCheck,
  Flag,
  HeartHandshake,
  ShieldCheck,
  EyeOff,
  FileCheck,
  Lock,
  type LucideIcon,
  UserCheck,
  Users,
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import mechanisms from "@/landing/lib/safety";

type SafetyItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
  status: string;
};

const journey: Array<{
  phase: string;
  eyebrow: string;
  title: string;
  desc: string;
  color: string;
  items: SafetyItem[];
}> = [
  {
    phase: "Before",
    eyebrow: "Verification & context",
    title: "Know what you’re joining before you say yes.",
    desc: "What identity checks, participant rules and event details are in place before the experience starts.",
    color: "#F26A2E",
    items: [
      {
        icon: BadgeCheck,
        title: "Identity verification",
        desc: "Passport applicants upload a profile, photo and ID proof. Admin review is used before passports are made public.",
        status: "In product",
      },
      {
        icon: UserCheck,
        title: "Member screening",
        desc: "Applications and community-rule acceptance help provide context and reduce random entry.",
        status: "In product",
      },
      {
        icon: FileCheck,
        title: "Experience details",
        desc: "Event pages list group size, host presence, venue notes and participation requirements when available.",
        status: "Per experience",
      },
      {
        icon: ClipboardCheck,
        title: "Venue & vendor checks",
        desc: "Basic checks and suitability reviews are performed where applicable; a fuller verification programme is planned as the product scales.",
        status: "Planned",
      },
    ],
  },
  {
    phase: "During",
    eyebrow: "Boundaries & support",
    title: "The experience should feel guided, not chaotic.",
    desc: "Hosts, trip captains and community rules help keep group participation respectful and clear.",
    color: "#234A3C",
    items: [
      {
        icon: HeartHandshake,
        title: "Host presence",
        desc: "Hosts or trip captains are present for many experiences; this is described on event pages where applicable.",
        status: "Per experience",
      },
      {
        icon: Bell,
        title: "Emergency & support",
        desc: "Emergency contacts and briefings are included for travel or higher-risk formats where relevant.",
        status: "In product / per experience",
      },
      {
        icon: EyeOff,
        title: "Private, discreet design",
        desc: "Consent, quiet time and opt-out options are part of the community code.",
        status: "Community rule",
      },
    ],
  },
  {
    phase: "After",
    eyebrow: "Feedback & accountability",
    title: "What happens afterwards still matters.",
    desc: "Feedback, reporting and stamp history help the community and the team improve and decide future access.",
    color: "#D9381E",
    items: [
      {
        icon: Flag,
        title: "Reporting & red-flag review",
        desc: "Serious reports trigger internal review processes and may affect future participation.",
        status: "Community process",
      },
      {
        icon: ShieldCheck,
        title: "Account actions",
        desc: "Access can be limited or removed if a member violates community standards.",
        status: "In product",
      },
    ],
  },
];

function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span
      className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
      style={{ borderColor: color + "35", color }}
    >
      {status}
    </span>
  );
}

export function SafetyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9]">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 border border-[#F26A2E]/30 bg-[#F26A2E]/10 text-[#F26A2E] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              <ShieldCheck className="h-3.5 w-3.5" />
              Safety Guide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#202124] leading-[1.1] mb-6">
              What happens before, during and after I participate in an experience?
            </h1>
            <p className="text-lg md:text-xl text-[#202124]/70 font-sans leading-relaxed max-w-3xl mx-auto">
              StampNStories is built to help women go out more with less uncertainty. Safety here means passport-reviewed participants where required, per-experience screening and clear boundaries — see the mechanism map for which items are in product, per experience, or planned.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-12 grid sm:grid-cols-3 gap-4"
          >
            <div className="rounded-2xl border border-[#202124]/10 bg-white p-4">
              <div className="flex items-start gap-3">
                <BadgeCheck className="h-6 w-6 text-[#F26A2E]" />
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-1">Before</p>
                  <p className="text-sm text-[#202124]/75">Verification, clear event details, and group context.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#202124]/10 bg-white p-4">
              <div className="flex items-start gap-3">
                <HeartHandshake className="h-6 w-6 text-[#234A3C]" />
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#234A3C] mb-1">During</p>
                  <p className="text-sm text-[#202124]/75">Clear boundaries, host support, and discreet options.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#202124]/10 bg-white p-4">
              <div className="flex items-start gap-3">
                <Flag className="h-6 w-6 text-[#D9381E]" />
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#D9381E] mb-1">After</p>
                  <p className="text-sm text-[#202124]/75">Feedback, red-flag reporting and follow-up where applicable.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16 rounded-3xl bg-[#202124] p-6 md:p-8 text-[#FFFDF9]"
          >
            <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">Transparent note</p>
                <p className="font-serif text-2xl md:text-3xl leading-tight">Not every safety mechanism is an automated feature.</p>
              </div>
              <p className="text-sm leading-relaxed text-[#FFFDF9]/60">
                Some protections are already built into the passport flow. Some are operational
                protocols shared per experience. Placeholder protocol items are marked clearly
                below so the site does not overpromise.
              </p>
            </div>
          </motion.div>

          <div className="space-y-8">
            <section className="rounded-3xl border border-[#202124]/10 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-[#202124] mb-3">Before You Go</h2>
              <p className="text-sm text-[#202124]/70 mb-4">Know what you're signing up for. Key things you can expect before an experience:</p>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#202124]/75">
                <li>Who can participate — rules are set per experience.</li>
                <li>Member verification — ID proof and passport submission for participants.</li>
                <li>Community screening — applications and passport review where applicable.</li>
                <li>Host and experience details — format, size, timings and what's included.</li>
                <li>Community expectations and conduct rules.</li>
                <li>How to raise concerns before joining (contact hosts or support).</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-[#202124]/10 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-[#202124] mb-3">While You're There</h2>
              <p className="text-sm text-[#202124]/70 mb-4">What safety looks like during an experience, and how to get help if you need it.</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#202124]/10">
                  <h3 className="font-serif text-lg mb-2">Respectful conduct</h3>
                  <p className="text-sm text-[#202124]/70">Clear boundaries and consent are expected.</p>
                </div>
                <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#202124]/10">
                  <h3 className="font-serif text-lg mb-2">Ask for help</h3>
                  <p className="text-sm text-[#202124]/70">Speak to the host or contact the team privately.</p>
                </div>
                <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#202124]/10">
                  <h3 className="font-serif text-lg mb-2">Emergency paths</h3>
                  <p className="text-sm text-[#202124]/70">Emergency contacts and procedures where applicable.</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#202124]/10 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-[#202124] mb-3">After the Experience</h2>
              <p className="text-sm text-[#202124]/70 mb-4">What happens if something goes wrong, and how feedback is handled.</p>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#202124]/75">
                <li>Feedback and reporting — share concerns about hosts, format, or behaviour.</li>
                <li>Red-flag reporting — serious concerns trigger review and possible access changes.</li>
                <li>Follow-up and support — the team may follow up while protecting privacy.</li>
                <li>Community accountability — reports can affect future participation or access.</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-[#202124]/10 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-[#202124] mb-4">Questions You Shouldn’t Have to Wonder About</h2>
              <div className="max-w-3xl">
                <Accordion type="single" collapsible defaultValue="q1">
                  <AccordionItem value="q1">
                    <AccordionTrigger>Who can join an SnS experience?</AccordionTrigger>
                    <AccordionContent>
                      Participation depends on the experience. Many offline formats require a
                      passport application and approval; event pages list participation criteria.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q2">
                    <AccordionTrigger>Are men allowed to participate?</AccordionTrigger>
                    <AccordionContent>
                      Men can be part of selected SnS experiences, but there is no open/random entry.
                      Participation rules are set per experience.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q3">
                    <AccordionTrigger>What does Women First actually mean?</AccordionTrigger>
                    <AccordionContent>
                      Women First means women’s safety, comfort, privacy and respect are the
                      priority when designing community formats and experiences.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q4">
                    <AccordionTrigger>How are members verified?</AccordionTrigger>
                    <AccordionContent>
                      Passport applicants upload a profile, photo and ID proof. Admin review is used
                      before public approval — ID proofs are private to admins.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q5">
                    <AccordionTrigger>What does community screening mean?</AccordionTrigger>
                    <AccordionContent>
                      Screening includes application questions, passport review and acceptance of
                      community rules to ensure participants understand expectations.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q6">
                    <AccordionTrigger>How do I know who I'm going with?</AccordionTrigger>
                    <AccordionContent>
                      Event pages share group size, host presence and participation format when
                      available. Some details are shared before the experience to reduce uncertainty.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q7">
                    <AccordionTrigger>What happens if I feel uncomfortable during an experience?</AccordionTrigger>
                    <AccordionContent>
                      Speak to the host or contact the StampNStories team privately. Use the
                      reporting paths provided on the event page or in post-event communication.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q8">
                    <AccordionTrigger>How do I report a concern?</AccordionTrigger>
                    <AccordionContent>
                      Report privately to hosts or via the community reporting channels. Serious
                      reports trigger internal review and possible access changes.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q9">
                    <AccordionTrigger>What does my Stamp mean?</AccordionTrigger>
                    <AccordionContent>
                      A stamp records respectful participation in a specific experience. It helps
                      build trust but does not guarantee future behaviour.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q10">
                    <AccordionTrigger>Does a Stamp guarantee someone's behaviour or safety?</AccordionTrigger>
                    <AccordionContent>
                      No. A stamp is a signal of past participation and should not be taken as a
                      guarantee of future behaviour.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>

            {journey.map((stage, stageIndex) => (
              <motion.section
                key={stage.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: stageIndex * 0.05 }}
                className="rounded-3xl border border-[#202124]/10 bg-white p-6 md:p-8 shadow-sm"
              >
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
                  <div>
                    <p
                      className="text-xs font-bold tracking-widest uppercase mb-3"
                      style={{ color: stage.color }}
                    >
                      {stage.phase} / {stage.eyebrow}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#202124] leading-tight mb-4">
                      {stage.title}
                    </h2>
                    <p className="text-sm md:text-base text-[#202124]/65 font-sans leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {stage.items.map(({ icon: Icon, title, desc, status }) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-[#202124]/10 bg-[#FFFDF9] p-5"
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <Icon className="h-5 w-5 shrink-0" style={{ color: stage.color }} />
                          <StatusBadge status={status} color={stage.color} />
                        </div>
                        <h3 className="font-serif text-xl text-[#202124] mb-2">{title}</h3>
                        <p className="text-sm text-[#202124]/65 font-sans leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="mb-10 max-w-3xl">
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">Mechanism map</p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#202124] leading-tight">Safety is a set of small, visible checks.</h2>
              <p className="mt-4 text-[#202124]/65 font-sans leading-relaxed">The clearest experience is the one where you can see what is checked, what is expected and what to do if something goes wrong.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mechanisms.map(({ icon: Icon, title, desc, status }) => (
                <div key={title} className="rounded-2xl border border-[#202124]/10 bg-[#F6F0E6] p-5">
                  <Icon className="h-5 w-5 text-[#F26A2E] mb-4" />
                  <h3 className="font-serif text-xl text-[#202124] mb-2">{title}</h3>
                  <p className="text-sm text-[#202124]/65 leading-relaxed mb-4">{desc}</p>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#202124]/45">{status}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-20 grid gap-6 lg:grid-cols-2"
          >
            <div className="rounded-3xl bg-[#202124] p-8 text-[#FFFDF9]">
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">Women First vs Women Only</p>
              <h2 className="text-3xl md:text-4xl font-serif leading-tight mb-5">Women First does not necessarily mean Women Only.</h2>
              <p className="text-[#FFFDF9]/70 leading-relaxed">Women First means women’s safety, comfort, privacy, respect and overall experience are prioritized. Selected experiences may include men, but the format is still designed around women’s experience.</p>
            </div>

            <div className="rounded-3xl bg-[#F6F0E6] border border-[#202124]/10 p-8">
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">Stamp and passport signals</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#202124] leading-tight mb-5">A stamp is history, not a guarantee.</h2>
              <p className="text-[#202124]/70 leading-relaxed">Community Verified means a passport has been reviewed. Stamps show past verified participation in specific experiences. They help build trust, but boundaries, reports and personal judgement still matter every time.</p>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <p className="mx-auto mb-6 max-w-2xl text-[#202124]/60 leading-relaxed">The aim is simple: help members understand how this works, what safeguards are in place and what to do if something feels wrong.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/passport">
                <Button className="w-full sm:w-auto bg-[#F26A2E] hover:bg-[#F26A2E]/90 text-white rounded-full px-8 h-12">Apply for Passport</Button>
              </Link>
              <Link to="/rules">
                <Button variant="outline" className="w-full sm:w-auto rounded-full border-[#202124]/25 px-8 h-12">Read Community Rules</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
