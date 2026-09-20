import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { FAQSection } from "@/landing/components/sections/FAQSection";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { EyeOff, MessageSquare, ShieldCheck, Users } from "lucide-react";

/* ─────────────── DATA FROM PDF ─────────────── */

const stamps = [
  {
    id: "ROOTS",
    color: "#234A3C",
    meaning: "Curiosity & Connection",
    earnedBy:
      "Learning one local story, connecting with at least one new person, respecting the place and contributing to the shared cookout.",
    proof: "One local story line + one co-traveller signature + one cookout role.",
  },
  {
    id: "WILD",
    color: "#202124",
    meaning: "Attention & Courage",
    earnedBy:
      "Completing the silent beach walk, respecting the nature route, choosing one safe act of courage and being responsible for self or group comfort.",
    proof: "Silent walk notes + nature trek participation.",
  },
  {
    id: "FIRE",
    color: "#F26A2E",
    meaning: "Honesty & Listening",
    earnedBy:
      "Participating in the question challenge, listening without interrupting, respecting phone/recording boundaries and adding warmth to the group.",
    proof: "Question challenge card + kayak participation + listening moment.",
  },
  {
    id: "SUSEGAD",
    color: "#7B5E3A",
    meaning: "Presence & Community",
    earnedBy:
      "Respecting the group's pace, participating in pottery, completing the passport ritual and leaving the group space better than you found it.",
    proof: '"You made my Goa ______." — one line signed by a co-traveller.',
  },
];

const itinerary = [
  {
    day: "Day 0",
    label: "ROAD TO GOA",
    theme: "The road journey is where the gang begins.",
    date: "Mumbai / Bangalore — Overnight",
    stamp: null,
    items: [
      {
        time: "Pickup",
        label: "Road journey begins",
        note: "Trip captain verifies names, comfort needs and emergency contacts at the confirmed pickup point.",
      },
      {
        time: "Briefing",
        label: "Passport & stamp explanation",
        note: "Explain the STAMP & STORIES PASSPORT, how stamps are earned and why this is not an attendance-based trip.",
      },
      {
        time: "Handover",
        label: "Physical passport handover",
        note: "Each traveller receives the passport, name card and mission sheet. The passport becomes your identity.",
      },
      {
        time: "Challenge 1",
        label: "Black Envelope Mission",
        note: "Every traveller receives a sealed envelope with one secret role or personal road challenge. Revealed later.",
      },
      {
        time: "Challenge 2",
        label: "Goa Courtroom debate",
        note: '"Goa is overrated vs Goa is misunderstood." Funny, respectful points only.',
      },
      {
        time: "Dinner halt",
        label: "Road dinner & comfort break",
        note: "Keep the group together. Check comfort and restart with a lighter energy.",
      },
      {
        time: "Night",
        label: "Music, playlist & lights-off",
        note: "A controlled music window, short jam moment and group playlist. After lights-off, rest is respected.",
      },
    ],
    note: "No stamp yet. Day 0 unlocks the journey and prepares the group for the Roots Stamp.",
  },
  {
    day: "Day 1",
    label: "ROOTS STAMP",
    theme: "Local Goa, villa arrival, sunset and shared meal.",
    date: "Arrival in Goa",
    stamp: "ROOTS",
    items: [
      {
        time: "Arrival",
        label: "Check-in at South Goa villa",
        note: "Arrive, freshen up and settle. No forced games immediately. First hour is light.",
      },
      {
        time: "Briefing",
        label: "Detailed day briefing",
        note: "Route, timings, community code, phone policy and Roots Stamp earning conditions explained.",
      },
      {
        time: "Spot 1",
        label: "90-year-old auntie's house / local gaon lunch",
        note: "A local meal and story-led interaction. Learn one real Goa story instead of a tourist meal.",
      },
      {
        time: "Spot 2",
        label: "Cycling in Portuguese lanes",
        note: "Cycle through old Fontainhas-style lanes. Focus on slow observation, photos with consent and local respect.",
      },
      {
        time: "Spot 3",
        label: "Cabo de Rama Beach / Fort sunset",
        note: "One of the strongest sunset views in South Goa. A group memory, not a production set.",
      },
      {
        time: "Evening",
        label: "Back to villa — change & relax",
        note: "Soft reset before dinner. Rest, swim or journal.",
      },
      {
        time: "Night",
        label: "Gang cookout with local guide",
        note: "The group cooks together with assigned roles. Nobody stays only a spectator.",
      },
      {
        time: "Late night",
        label: "Jamming, horror stories & letter to future self",
        note: "Group circle. Everyone writes one private future-self letter to keep inside the passport.",
      },
    ],
    note: "ROOTS STAMP earned by: learning one local story, connecting with at least one new person, respecting the place and contributing to the shared cookout.",
  },
  {
    day: "Day 2 AM",
    label: "WILD STAMP",
    theme: "Kokolem Beach, Netravali Valley and the Wild Stamp.",
    date: "Water, Silence & Wilderness",
    stamp: "WILD",
    items: [
      {
        time: "Early AM",
        label: "Calm wake-up & depart",
        note: "No loud announcements. Water, light snack and essentials before leaving.",
      },
      {
        time: "Morning",
        label: "Kokolem Beach — arrive before the crowd",
        note: "A quiet beach start.",
      },
      {
        time: "Mission",
        label: "30-minute silent beach walk",
        note: "No phones, no talking, no photos. Just you, water and sky. Each person writes three things they noticed.",
      },
      {
        time: "Breakfast",
        label: "Breakfast at the beach",
        note: "Simple, slow and grounded. Not rushed.",
      },
      {
        time: "Reset",
        label: "Back to villa for rest",
        note: "Enough time to freshen up, change and reset before the waterfall route.",
      },
      {
        time: "Nature",
        label: "Netravali Valley waterfall trek",
        note: "A 45-minute guided trek. Subject to weather, permissions and safety confirmation.",
      },
      {
        time: "Pause",
        label: "Peaceful time at the waterfall",
        note: "No compulsory jumping or risky pressure. Enjoy the space, water and silence safely.",
      },
      {
        time: "Lunch",
        label: "Local cuisine / fish thali",
        note: "A local lunch after the trek. Vegetarian and allergy-safe alternatives pre-arranged.",
      },
    ],
    note: "Safety note: trek, waterfall access and swimming are guide-approved only. No one earns extra value through unsafe risk.",
  },
  {
    day: "Day 2 PM",
    label: "FIRE STAMP",
    theme: "Cola Beach, kayaking, dinner discussion and group entertainment.",
    date: "Backwater, Questions & Night Ritual",
    stamp: "FIRE",
    items: [
      {
        time: "Afternoon",
        label: "Off to Cola Beach",
        note: "Move after lunch with buffer for traffic, road conditions and light.",
      },
      {
        time: "Mission",
        label: "Backwater kayaking — 45 minutes",
        note: "With safety briefing, life jackets and confirmed guide/vendor.",
      },
      {
        time: "Sunset",
        label: "Cola Beach sunset",
        note: "Slow sunset pause. Capture ambience and group memory, not forced content.",
      },
      {
        time: "Challenge",
        label: "Question Challenge",
        note: "Each traveller asks one meaningful question to someone new. Honest connection, not performance.",
      },
      {
        time: "Return",
        label: "Back to villa — freshen up",
        note: "Relax into a dinner setting.",
      },
      {
        time: "Dinner",
        label: "Local Goa dinner + morning question discussion",
        note: "Discuss what people noticed during the silent walk. Voluntary and respectful.",
      },
      {
        time: "Ritual",
        label: "Passport stamping ritual",
        note: "Wild and Fire proofs checked: silent walk notes, kayak participation, question challenge, listening moment.",
      },
      {
        time: "Entertainment",
        label: "The Memory Auction",
        note: 'Teams "bid" with stories, songs or inside jokes to win memory cards. No money, no pressure.',
      },
    ],
    note: "Suggested extras: Memory Auction, Guess The Road Name, Goa Courtroom Round 2, Secret Role Reveal, SnS Midnight Radio.",
  },
  {
    day: "Day 3",
    label: "SUSEGAD STAMP",
    theme: "Slow morning, pottery and the final stamp.",
    date: "The Closing Chapter",
    stamp: "SUSEGAD",
    items: [
      {
        time: "Morning",
        label: "Slow morning — no loud energy",
        note: "Wake at your own pace. Sit quietly, talk, journal or pack slowly.",
      },
      {
        time: "Breakfast",
        label: "Shared breakfast table at villa",
        note: "One last meal together before checkout.",
      },
      {
        time: "Checkout",
        label: "Check out from villa",
        note: "Luggage loaded, rooms checked and shared items collected.",
      },
      {
        time: "Skill",
        label: "Group pottery session",
        note: "Learn a new skill together. Pottery is a physical metaphor for patience, presence and community.",
      },
      {
        time: "Ritual",
        label: "Trip-end passport ritual",
        note: '"You made my Goa ______." Every traveller receives one memorable line from co-travellers with signatures.',
      },
      {
        time: "Photo",
        label: "Final group photo with passports",
        note: "The official batch memory.",
      },
      {
        time: "Final stamp",
        label: "Susegad Stamp ceremony",
        note: "The SUSEGAD STAMP is given after the closing ritual — not casually before departure.",
      },
      {
        time: "Return",
        label: "Back to Mumbai / Bangalore by road",
        note: "Trip ends. The WhatsApp group continues as the batch community.",
      },
    ],
    note: "SUSEGAD STAMP earned by: respecting pace, participating in pottery, completing the passport ritual and leaving the group space better than they found it.",
  },
];

const included = [
  {
    icon: "🚌",
    label: "Road transport",
    detail: "Mumbai / Bangalore → Goa → return by road (AC vehicle)",
  },
  {
    icon: "🏡",
    label: "South Goa villa stay",
    detail: "Shared villa with cookout permission and quiet-hour policy",
  },
  {
    icon: "🍽️",
    label: "All meals",
    detail: "Local gaon lunch, gang cookout, beach breakfast, fish thali, Goa dinners",
  },
  {
    icon: "🚲",
    label: "Cycling in Portuguese lanes",
    detail: "Guided route through Fontainhas-style lanes with local map prompts",
  },
  {
    icon: "🌊",
    label: "Backwater kayaking",
    detail: "45 min kayak with life jackets and safety briefing",
  },
  {
    icon: "🥾",
    label: "Netravali Valley trek",
    detail: "45-minute guided waterfall trek (weather & safety confirmed)",
  },
  {
    icon: "🏖️",
    label: "Beach experiences",
    detail: "Kokolem Beach silent walk + Cola Beach sunset",
  },
  {
    icon: "🏺",
    label: "Group pottery session",
    detail: "Day 3 skill session — the physical ritual before the final stamp",
  },
  {
    icon: "📖",
    label: "Physical passport",
    detail: "Your STAMP & STORIES passport, name card and mission sheet",
  },
  {
    icon: "🎟️",
    label: "Four stamps",
    detail: "Roots, Wild, Fire and Susegad — all earned through challenges, not attendance",
  },
  {
    icon: "📸",
    label: "Community photographer",
    detail: "Present on key experiences. No faces posted without explicit consent.",
  },
  { icon: "🛡️", label: "Trip captain + hosts", detail: "Two trained SnS hosts present throughout" },
];

const notIncluded = [
  "Personal travel to/from the pickup point",
  "Alcohol (not permitted on this experience)",
  "Personal shopping or spa treatments",
  "Any activity outside the itinerary",
];

const packingList = [
  "Comfortable road outfit",
  "Beachwear",
  "Walking shoes",
  "Extra slippers",
  "Small towel",
  "Sunscreen",
  "Refillable bottle",
  "Personal medicines",
  "Light jacket",
  "Power bank",
  "ID proof",
  "Journal",
  "One white/light outfit for sunset or group photo",
];

const communityRules = [
  "No pressure for photos, dancing, drinking, conversations or social media exchange.",
  "Consent is required before posting or recording anyone closely.",
  "Women-first comfort: crowd quality, boundaries and respect come before entertainment.",
  "No one is forced to speak in emotional moments. Listening is valid participation.",
  "Late-night music has a cut-off so rest remains respected.",
  "Passport stamps are not given because someone paid. They are earned by showing up differently.",
];

const safetySnapshot = [
  {
    icon: ShieldCheck,
    title: "Before",
    desc: "Passport verification, confirmed pickup points, route details, group size and emergency contacts are checked before departure.",
  },
  {
    icon: Users,
    title: "During",
    desc: "Two SnS staff are included in the 14-person group, with trip briefings, guide-approved activities and clear participation boundaries.",
  },
  {
    icon: MessageSquare,
    title: "After",
    desc: "Feedback, discomfort reports and red-flag concerns can be raised with the team and may affect future access.",
  },
  {
    icon: EyeOff,
    title: "Privacy",
    desc: "No faces are posted without explicit consent, and phone or recording boundaries are part of the community code.",
  },
];

const faqs = [
  {
    q: "Do I need a verified passport to join?",
    a: "Yes. This experience is for verified members only. Apply for your passport first — once accepted you can register for events.",
  },
  {
    q: "Is this a party trip?",
    a: "No. It is a mission-led, curated community experience. There is no alcohol, no nightclub, and no pressure to perform or create content.",
  },
  {
    q: "How do I earn the stamps?",
    a: "Every stamp needs a challenge, participation, a witness and a ceremony. You cannot buy a stamp — you earn it by showing up differently.",
  },
  {
    q: "What if I want to sit out an activity?",
    a: "Everything is community-first and safe. No risky pressure. Choosing not to do something is respected.",
  },
  {
    q: "Can I come alone?",
    a: "Yes — most women do. The format is designed so you feel at ease whether you come solo or with a friend.",
  },
  {
    q: "What is the pickup point?",
    a: "Confirmed pickup points in Mumbai and Bangalore will be shared on registration. The road journey itself is part of the experience.",
  },
  {
    q: "What's the refund policy?",
    a: "Full refund up to 14 days before departure. 50% refund 7–14 days before. No refund within 7 days, but your spot can be transferred to another verified member.",
  },
];

/* ─────────────── COMPONENTS ─────────────── */

function StampBadge({ id, color }: { id: string; color: string }) {
  return (
    <div
      className="relative w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 border-dashed shrink-0"
      style={{ borderColor: color + "60", background: color + "15" }}
    >
      <p
        className="text-[9px] font-bold tracking-widest text-center leading-none"
        style={{ color }}
      >
        {id}
      </p>
    </div>
  );
}


const stampColors: Record<string, string> = {
  ROOTS: "#234A3C",
  WILD: "#202124",
  FIRE: "#F26A2E",
  SUSEGAD: "#7B5E3A",
};

/* ─────────────── PAGE ─────────────── */

export function GoaSusegadPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-end bg-[#202124] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1600&auto=format&fit=crop"
          alt="Goa"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-[#202124]/60 to-transparent" />

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-[#FFFDF9]/70 mb-6">
              <a href="/#events" className="hover:text-[#F26A2E] transition-colors">
                Events
              </a>
              <span>/</span>
              <span className="text-[#FFFDF9]/70">Goa Susegad Weekend</span>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] border border-[#F26A2E]/40 rounded-full px-3 py-1">
                ROAD TRIP
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#FFFDF9]/75 border border-[#FFFDF9]/20 rounded-full px-3 py-1">
                4 Stamps to Earn
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#FFFDF9]/75 border border-[#FFFDF9]/20 rounded-full px-3 py-1">
                Passport Required
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FFFDF9] leading-tight mb-6">
              The Susegad
              <br />
              <span className="italic text-[#F6F0E6]/80">Stamp — Goa</span>
            </h1>

            <div className="flex flex-wrap gap-8 text-sm font-sans text-[#FFFDF9]/75 mb-8">
              <div>
                <span className="text-[#FFFDF9]/65 block text-xs uppercase tracking-widest mb-1">
                  Departure
                </span>
                Mumbai / Bangalore
              </div>
              <div>
                <span className="text-[#FFFDF9]/65 block text-xs uppercase tracking-widest mb-1">
                  Destination
                </span>
                South Goa (villa stay)
              </div>
              <div>
                <span className="text-[#FFFDF9]/65 block text-xs uppercase tracking-widest mb-1">
                  Duration
                </span>
                Day 0 road + 3 days
              </div>
              <div>
                <span className="text-[#FFFDF9]/65 block text-xs uppercase tracking-widest mb-1">
                  Stamps
                </span>
                Roots · Wild · Fire · Susegad
              </div>
            </div>

            {/* Four stamp pills */}
            <div className="flex gap-3 flex-wrap">
              {stamps.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 border"
                  style={{ borderColor: s.color + "50", background: s.color + "20" }}
                >
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: s.color }}
                  >
                    {s.id}
                  </span>
                  <span className="text-[10px] text-[#FFFDF9]/70 font-sans">{s.meaning}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky nav bar ── */}
      <div className="sticky top-[56px] z-40 bg-[#FFFDF9]/95 backdrop-blur border-b border-[#202124]/10 py-3">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs font-sans text-[#202124]/60 overflow-x-auto">
            <a
              href="#overview"
              className="hover:text-[#F26A2E] whitespace-nowrap transition-colors"
            >
              Overview
            </a>
            <a href="#event-safety" className="hover:text-[#F26A2E] whitespace-nowrap transition-colors">
              Safety
            </a>
            <a href="#stamps" className="hover:text-[#F26A2E] whitespace-nowrap transition-colors">
              Stamps
            </a>
            <a
              href="#itinerary"
              className="hover:text-[#F26A2E] whitespace-nowrap transition-colors"
            >
              Itinerary
            </a>
            <a
              href="#includes"
              className="hover:text-[#F26A2E] whitespace-nowrap transition-colors"
            >
              Included
            </a>
            <a href="#rules" className="hover:text-[#F26A2E] whitespace-nowrap transition-colors">
              Rules
            </a>
            <a href="#packing" className="hover:text-[#F26A2E] whitespace-nowrap transition-colors">
              Packing
            </a>
            <a href="#faq" className="hover:text-[#F26A2E] whitespace-nowrap transition-colors">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-[#F26A2E] font-bold uppercase tracking-widest">
                4 spots left
              </p>
              <p className="text-xs text-[#202124]/40 font-sans">of 14 total</p>
            </div>
            <Link
              to="/events/goa-susegad/request-invite"
              className="bg-[#F26A2E] text-white text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-[#e0571c] transition-colors whitespace-nowrap inline-flex items-center justify-center"
            >
              Request Invite
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* ── Overview ── */}
        <section id="overview" className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
                  What this is
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-[#202124] mb-6 leading-tight">
                  A mission-led Goa itinerary built around the Community Passport.
                </h2>
                <div className="space-y-4 text-[#202124]/70 font-sans leading-relaxed text-base">
                  <p>
                    This is not a random package, not a dating trip, not only a party, not a
                    forced-content creator trip. It is a curated women-first social hangout
                    experience where members meet, explore and collect stories through guided
                    challenges.
                  </p>
                  <p>
                    The road journey, local food, beaches, backwaters, conversations and pottery are
                    all turned into earned memories inside the STAMP &amp; STORIES PASSPORT. Four
                    stamps. Four meanings. All earned — not given.
                  </p>
                  <p className="font-bold text-[#202124]">
                    Challenge + Participation + Witness + Ceremony = Earned Stamp.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Availability */}
                <div className="bg-[#202124] rounded-3xl p-8 text-[#FFFDF9]">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-2">
                    Availability
                  </p>
                  <p className="text-5xl font-serif text-[#F26A2E] mb-1">
                    4 <span className="text-xl text-[#FFFDF9]/75 font-sans">spots left</span>
                  </p>
                  <div className="mt-4 mb-6">
                    <div className="h-2 rounded-full bg-[#FFFDF9]/10">
                      <div className="h-full rounded-full bg-[#F26A2E]" style={{ width: "71%" }} />
                    </div>
                    <p className="text-xs text-[#FFFDF9]/70 mt-2 font-sans">
                      10 of 14 spots filled (incl. 2 SnS staff)
                    </p>
                  </div>
                  <Link
                    to="/events/goa-susegad/request-invite"
                    className="flex justify-center items-center w-full bg-[#F26A2E] text-white font-bold tracking-widest uppercase text-sm py-4 rounded-2xl hover:bg-[#e0571c] transition-colors"
                  >
                    Request Invite
                  </Link>
                  <p className="text-xs text-[#FFFDF9]/65 text-center mt-3 font-sans">
                    Passport verification required ·{" "}
                    <Link
                      to="/refund-policy"
                      className="underline hover:text-[#F26A2E] transition-colors"
                    >
                      Refund Policy
                    </Link>
                  </p>
                </div>

                {/* Quick facts */}
                <div className="border border-[#202124]/10 rounded-3xl p-6 space-y-4">
                  {[
                    ["🚌", "Route", "Mumbai / Bangalore → South Goa → Return by road"],
                    [
                      "🏡",
                      "Stay",
                      "South Goa villa (shared, 2–3 per room) with cookout permission",
                    ],
                    ["👥", "Group", "14 members — 12 travellers + 2 verified SnS staff"],
                    ["📅", "Dates", "Day 0 departure + 3 days in Goa"],
                    ["🎟️", "Stamps Earned", "Roots · Wild · Fire · Susegad"],
                    [
                      "💰",
                      "Cost",
                      "₹9,500 per person (transport + stay + all activities included)",
                    ],
                  ].map(([icon, label, value]) => (
                    <div key={String(label)} className="flex gap-4 items-start">
                      <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                      <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-[#202124]/40 mb-0.5">
                          {label}
                        </p>
                        <p className="text-sm font-sans text-[#202124]/80">{value}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-[#202124]/10 flex items-center justify-between text-xs text-[#202124]/65 font-sans">
                    <span>Cancellation &amp; Booking Terms</span>
                    <Link
                      to="/refund-policy"
                      className="text-[#F26A2E] hover:underline font-semibold"
                    >
                      Refund Policy →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              id="event-safety"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 rounded-3xl bg-[#F6F0E6] p-6 md:p-8"
            >
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-3">
                    Safety snapshot
                  </p>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#202124]">
                    How this experience is structured.
                  </h2>
                </div>
                <Link
                  to="/safety"
                  className="text-xs font-bold tracking-widest uppercase text-[#202124]/45 hover:text-[#F26A2E] transition-colors"
                >
                  Full safety guide
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {safetySnapshot.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-2xl border border-[#202124]/10 bg-white p-5">
                    <Icon className="h-5 w-5 text-[#F26A2E] mb-4" />
                    <h3 className="font-serif text-xl text-[#202124] mb-2">{title}</h3>
                    <p className="text-sm text-[#202124]/65 font-sans leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Four Stamps ── */}
        <section id="stamps" className="py-20 md:py-28 bg-[#202124]">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
                What you earn
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#FFFDF9] mb-3">Four stamps.</h2>
              <p className="text-[#FFFDF9]/75 font-sans text-sm max-w-xl">
                You cannot buy a stamp. You can only earn it by showing up differently.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {stamps.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl p-6 border"
                  style={{ borderColor: s.color + "30", background: s.color + "15" }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    {/* Stamp circle */}
                    <div
                      className="w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 border-dashed shrink-0"
                      style={{ borderColor: s.color + "80" }}
                    >
                      <p
                        className="text-[10px] font-bold tracking-widest leading-none text-center"
                        style={{ color: s.color }}
                      >
                        {s.id}
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-xl text-[#FFFDF9] leading-snug">{s.id} Stamp</p>
                      <p
                        className="text-xs font-sans tracking-widest uppercase mt-1"
                        style={{ color: s.color }}
                      >
                        {s.meaning}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#FFFDF9]/75 font-sans leading-relaxed mb-3">
                    {s.earnedBy}
                  </p>
                  <div className="border-t border-[#FFFDF9]/10 pt-3">
                    <p className="text-xs text-[#FFFDF9]/65 font-sans">
                      <span className="font-bold text-[#FFFDF9]/75">Passport proof: </span>
                      {s.proof}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 border border-[#FFFDF9]/10 rounded-2xl p-5 text-center"
            >
              <p className="text-[#FFFDF9]/75 font-sans text-sm">
                <span className="font-bold text-[#FFFDF9]/70">Core stamp rule: </span>
                Challenge + Participation + Witness + Ceremony = Earned Stamp
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Itinerary ── */}
        <section id="itinerary" className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
                Day by day
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#202124]">Full itinerary.</h2>
              <p className="text-[#202124]/40 font-sans mt-3 text-sm">
                All timings are approximate. Draft itinerary subject to vendor, route, weather and
                permission confirmation.
              </p>
            </motion.div>

            <div className="space-y-10">
              {itinerary.map((day, di) => {
                const stampColor = day.stamp ? stampColors[day.stamp] : undefined;
                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: di * 0.08 }}
                    className="rounded-3xl overflow-hidden border border-[#202124]/10"
                  >
                    {/* Day header */}
                    <div
                      className="px-6 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      style={{ background: stampColor ? stampColor : "#202124" }}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-bold tracking-widest uppercase text-white/50">
                            {day.date}
                          </span>
                          {day.stamp && (
                            <span className="text-[10px] font-bold tracking-widest uppercase border border-white/30 rounded-full px-2 py-0.5 text-white/70">
                              {day.stamp} STAMP
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-2xl text-white">
                          {day.day} — {day.label}
                        </h3>
                        <p className="text-sm text-white/50 font-sans italic mt-1">{day.theme}</p>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="divide-y divide-[#202124]/6 bg-white">
                      {day.items.map((item, ii) => (
                        <div key={ii} className="flex gap-5 items-start px-6 md:px-8 py-4">
                          <span
                            className="text-xs font-mono shrink-0 mt-1 w-20 font-bold"
                            style={{ color: stampColor ?? "#F26A2E" }}
                          >
                            {item.time}
                          </span>
                          <div>
                            <p className="font-serif text-[#202124] text-base">{item.label}</p>
                            <p className="text-xs text-[#202124]/50 font-sans mt-0.5 leading-relaxed">
                              {item.note}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Day note */}
                    <div className="px-6 md:px-8 py-4 bg-[#F6F0E6] border-t border-[#202124]/10">
                      <p className="text-xs font-sans text-[#202124]/60 leading-relaxed">
                        <span className="font-bold text-[#202124]/70">Note: </span>
                        {day.note}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── What's Included ── */}
        <section id="includes" className="py-20 md:py-28 bg-[#F6F0E6]">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
                What you get
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#202124]">
                Everything included.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {included.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex gap-5 items-start bg-white rounded-2xl p-5 shadow-sm"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-serif text-[#202124] text-base mb-0.5">{item.label}</p>
                    <p className="text-sm text-[#202124]/60 font-sans">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border border-[#202124]/10 rounded-2xl p-6 bg-white">
              <p className="text-xs font-bold tracking-widest uppercase text-[#202124]/40 mb-4">
                Not included
              </p>
              <ul className="grid md:grid-cols-2 gap-2">
                {notIncluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-sans text-[#202124]/50"
                  >
                    <span className="w-4 h-4 rounded-full border border-[#202124]/20 flex items-center justify-center shrink-0 text-[10px] text-[#202124]/30">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Community Rules ── */}
        <section id="rules" className="py-20 md:py-28 bg-[#202124]">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
                Before you come
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#FFFDF9]">Community code.</h2>
              <p className="text-[#FFFDF9]/40 font-sans mt-3 text-sm">
                Agreeing to these is part of your registration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {communityRules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4 items-start bg-[#FFFDF9]/5 border border-[#FFFDF9]/10 rounded-2xl p-5"
                >
                  <span className="w-7 h-7 rounded-full bg-[#F26A2E]/20 border border-[#F26A2E]/40 text-[#F26A2E] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm font-sans text-[#FFFDF9]/70 leading-relaxed">{rule}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Packing Guide ── */}
        <section id="packing" className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
                What to bring
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#202124]">Packing guide.</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl">
              {packingList.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-center gap-3 bg-[#F6F0E6] rounded-xl px-4 py-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F26A2E] shrink-0" />
                  <p className="text-sm font-sans text-[#202124]/80">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQSection
          id="faq"
          badge="Questions"
          title="FAQ."
          items={faqs}
          bgClassName="bg-[#F6F0E6]"
          align="left"
        />

        {/* ── Bottom CTA ── */}
        <section className="py-20 md:py-28 bg-[#202124] text-center">
          <div className="container mx-auto px-6 md:px-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] mb-4">
                4 spots remaining
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#FFFDF9] mb-6 leading-tight">
                Road to Goa.
                <br />
                <span className="italic text-[#FFFDF9]/40">Four stamps to earn.</span>
              </h2>
              <p className="text-[#FFFDF9]/50 font-sans mb-10 leading-relaxed">
                This is not a trip you book. It is a chapter you earn. You need a verified passport
                to register — apply first if you don't have one yet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/events/goa-susegad/request-invite"
                  className="bg-[#F26A2E] text-white font-bold tracking-widest uppercase text-sm px-10 py-4 rounded-full hover:bg-[#e0571c] transition-colors inline-flex items-center justify-center text-center"
                >
                  Request Invite
                </Link>
                <a
                  href="/#events"
                  className="border border-[#FFFDF9]/20 text-[#FFFDF9]/70 font-bold tracking-widest uppercase text-sm px-10 py-4 rounded-full hover:border-[#FFFDF9]/40 hover:text-[#FFFDF9] transition-colors inline-flex items-center justify-center text-center"
                >
                  See All Events
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
