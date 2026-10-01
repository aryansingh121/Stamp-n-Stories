import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import {
  Users,
  Check,
  X,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Award,
  Sparkles,
  Compass,
} from "lucide-react";

/* ─────────────── 3D VISUAL STORYTELLING SCENES (LAZY) ─────────────── */

const RoadToGoaNightScene = lazy(() =>
  import("@/landing/components/goa-visuals/RoadToGoaNightScene").then((m) => ({
    default: m.RoadToGoaNightScene,
  }))
);
const SouthGoaJourneyMap = lazy(() =>
  import("@/landing/components/goa-visuals/SouthGoaJourneyMap").then((m) => ({
    default: m.SouthGoaJourneyMap,
  }))
);
const DayTwoTerrainScene = lazy(() =>
  import("@/landing/components/goa-visuals/DayTwoTerrainScene").then((m) => ({
    default: m.DayTwoTerrainScene,
  }))
);
const FourStampsJourneyScene = lazy(() =>
  import("@/landing/components/goa-visuals/FourStampsJourneyScene").then((m) => ({
    default: m.FourStampsJourneyScene,
  }))
);
const SusegadClosingScene = lazy(() =>
  import("@/landing/components/goa-visuals/SusegadClosingScene").then((m) => ({
    default: m.SusegadClosingScene,
  }))
);

/* ─────────────── DATA DEFINITIONS (LOCKED) ─────────────── */

const upcomingBatches = ["15 October", "29 October", "12 November"];

const stamps = [
  {
    id: "ROOTS",
    title: "Roots Stamp",
    color: "#234A3C",
    accentBg: "rgba(35, 74, 60, 0.12)",
    meaning: "Curiosity & Connection",
    philosophy:
      "Goa has lived for centuries before tourism arrived. Roots is about slowing down enough to listen to the people and heritage that anchor this land.",
    challenge:
      "Step into local Goa with genuine humility. Learn one local story, engage with at least one new person, and contribute your hands to the collective villa cookout.",
    proof: "One local story line + one co-traveller signature + assigned cookout role.",
  },
  {
    id: "WILD",
    title: "Wild Stamp",
    color: "#202124",
    accentBg: "rgba(32, 33, 36, 0.12)",
    meaning: "Attention & Courage",
    philosophy:
      "True wildness isn't reckless speed or loud adrenaline. It is quiet attention — walking through nature without performing for a camera.",
    challenge:
      "Complete the 30-minute silent beach walk with zero digital distraction. Respect the forest trail to Netravali waterfall, taking personal responsibility for shared group safety.",
    proof: "Silent walk observation notes + nature trek participation.",
  },
  {
    id: "FIRE",
    title: "Fire Stamp",
    color: "#F26A2E",
    accentBg: "rgba(242, 106, 46, 0.12)",
    meaning: "Honesty & Listening",
    philosophy:
      "Warmth doesn't happen by accident. It is created when people dare to ask real questions and listen without rushing to respond.",
    challenge:
      "Participate in the dusk Question Challenge. Paddle together on Cola backwaters, honor camera-down windows, and hold space for stories around the table.",
    proof: "Completed Question Challenge card + kayak participation + listening moment witness.",
  },
  {
    id: "SUSEGAD",
    title: "Susegad Stamp",
    color: "#7B5E3A",
    accentBg: "rgba(123, 94, 58, 0.12)",
    meaning: "Presence & Community",
    philosophy:
      "Susegad is not laziness. It is the profound art of contentment — knowing that the moment you are currently living is completely enough.",
    challenge:
      "Embrace the collective pace. Shape raw earth with your hands in group pottery, complete the closing passport exchange, and leave Goa kinder than you arrived.",
    proof: '"You made my Goa ______." — hand-written memory line signed by a co-traveller.',
  },
];

const itineraryDays = [
  {
    dayNumber: "DAY 0",
    badge: "THE OVERNIGHT OVERTURE",
    title: "Road to Goa",
    departure: "MUMBAI / BANGALORE → OVERNIGHT JOURNEY",
    stampAwarded: null,
    story:
      "The experience does not start at the villa doorstep; it begins the moment you step on board. The road is where guards drop, small conversations kindle, and the gang takes shape.",
    schedule: [
      {
        tag: "Pickup",
        heading: "Pickup & Quiet Welcome",
        desc: "Meet verified SnS trip captains at designated points. Group comfort check, emergency verification, and initial settling.",
      },
      {
        tag: "Briefing",
        heading: "The Passport & Ritual Briefing",
        desc: "Introduction to the philosophy of earned stamps. Why this is an intentional travel chapter rather than an attendance tour.",
      },
      {
        tag: "Handover",
        heading: "Physical Passport Handover",
        desc: "Each traveller receives their physical STAMPNSTORIES Passport, personalised name card, and the journey's Mission Sheet.",
      },
      {
        tag: "Mission 01",
        heading: "The Black Envelope Mission",
        desc: "A sealed envelope containing one private road challenge and personal observation role, to be revealed when prompted.",
      },
      {
        tag: "Debate",
        heading: "The Goa Courtroom Debate",
        desc: '"Goa is overrated vs Goa is misunderstood." High-spirited, humorous, and respectful perspectives shared across the aisle.',
      },
      {
        tag: "Rest Halt",
        heading: "Road Dinner & Group Reset",
        desc: "Shared pit stop to keep everyone refreshed, fed, and hydrated with light, grounded energy.",
      },
      {
        tag: "Night",
        heading: "Controlled Music & Lights-Off Rest",
        desc: "A warm acoustic playlist window followed by strict quiet hours so everyone arrives in Goa restored and ready.",
      },
    ],
  },
  {
    dayNumber: "DAY 1",
    badge: "HERITAGE, GAON & COOKOUT",
    title: "Roots",
    departure: "SOUTH GOA VILLA ARRIVAL",
    stampAwarded: "ROOTS",
    story:
      "Wake up to coconut palms and sea breeze. Today is dedicated to local roots: an authentic meal in a 90-year-old home, cycling colonial lanes, and cooking together under the open sky.",
    schedule: [
      {
        tag: "Morning",
        heading: "Villa Arrival & Soft Check-In",
        desc: "Arrive at our curated heritage South Goa villa. Freshen up, explore the grounds, unpack. Zero forced introductions — the first hour is gentle.",
      },
      {
        tag: "Briefing",
        heading: "Community Code & Phone Boundaries",
        desc: "Alignment on the Women-First social contract, consent-first photography, and criteria for earning the Roots Stamp.",
      },
      {
        tag: "Heritage Lunch",
        heading: "90-Year-Old Auntie's House & Gaon Meal",
        desc: "Sit down inside an ancestral village home. Savor authentic regional recipes while hearing generational stories of old Goa.",
      },
      {
        tag: "Exploration",
        heading: "Portuguese Lane Cycling",
        desc: "Gentle bicycle ride through timeless Fontainhas-style lanes. Observation prompts focused on architecture, colors, and quiet respect.",
      },
      {
        tag: "Golden Hour",
        heading: "Cabo de Rama Fort & Beach Sunset",
        desc: "Watch the sun sink into the Arabian Sea from historic cliff battlements. A group memory, not a content-creation photoshoot.",
      },
      {
        tag: "Reset",
        heading: "Villa Dip, Rest & Journaling",
        desc: "Return to basecamp. Swim in the pool, sit with tea, or journal your initial impressions.",
      },
      {
        tag: "Cookout",
        heading: "Gang Cookout with Local Guide",
        desc: "Everyone has a role: chopping, tasting, seasoning, serving. A participatory feast crafted together as a crew.",
      },
      {
        tag: "Night Circle",
        heading: "Acoustic Jamming & Letter to Future Self",
        desc: "Sit around the courtyard. Write a private letter to your future self, sealed inside your passport pocket for years to come.",
      },
    ],
  },
  {
    dayNumber: "DAY 2",
    badge: "SILENCE, WATERFALL & FIRE",
    title: "Wild → Fire",
    departure: "KOKOLEM · NETRAVALI · COLA BEACH",
    stampAwarded: "WILD & FIRE",
    story:
      "A transition from the stillness of hidden beaches to the adrenaline of mountain waterfalls, culminating in backwater kayaking and fireside honesty at Cola Beach.",
    schedule: [
      {
        tag: "Early AM",
        heading: "Calm Sunrise Departure",
        desc: "Gentle wake-up with fresh coffee and fruit. Depart before the heat and long before any tourist crowd arrives.",
      },
      {
        tag: "Kokolem",
        heading: "30-Minute Silent Beach Walk",
        desc: "Phones off. Shoes off. Walk along the deserted sands of Kokolem. Notice the foam, the cliffs, your thoughts. Write 3 observations.",
      },
      {
        tag: "Breakfast",
        heading: "Beachside Breakfast",
        desc: "Warm, wholesome breakfast enjoyed by the sound of breaking waves. Simple, unhurried, and grounded.",
      },
      {
        tag: "Trek",
        heading: "Guided Netravali Waterfall Trek",
        desc: "45-minute trail through lush Western Ghat foliage. Certified local guide, safe routes, and dip in crystalline forest spring waters.",
      },
      {
        tag: "Feast",
        heading: "Traditional Goan Fish Thali (Veg Options Pre-set)",
        desc: "Authentic lunch following the trek. Freshly sourced local preparations with pre-arranged vegan and allergy care.",
      },
      {
        tag: "Backwaters",
        heading: "Cola Beach Kayaking (45 Mins)",
        desc: "Paddle along the emerald backwater lagoon framed by palm groves. Life jackets, safety briefing, and tandem buddy system.",
      },
      {
        tag: "Dusk Ritual",
        heading: "Cola Lagoon Sunset & The Question Challenge",
        desc: "Pair up with a fellow traveller. Draw a question card designed to bypass small talk and spark genuine personal dialogue.",
      },
      {
        tag: "Night Ritual",
        heading: "The Memory Auction & Passport Stamping",
        desc: "Teams 'bid' with stories, songs, and observations to win memory relics. Official verification and stamping of Wild & Fire credentials.",
      },
    ],
  },
  {
    dayNumber: "DAY 3",
    badge: "PRESENCE & CLOSING RITUAL",
    title: "Susegad",
    departure: "COMMUNITY CLOSING & RETURN",
    stampAwarded: "SUSEGAD",
    story:
      "Slow mornings, tactile pottery, and the final stamp ceremony. Leave Goa not exhausted from checklist travel, but enriched by genuine connections.",
    schedule: [
      {
        tag: "Morning",
        heading: "Unscheduled Susegad Morning",
        desc: "Zero wake-up alarms. Wake slowly, sit on the veranda, linger over fresh breakfast, and pack at your own gentle rhythm.",
      },
      {
        tag: "Workshop",
        heading: "Hands-On Group Pottery Session",
        desc: "Sit at the potter's wheel with a local Goan artisan. Shape raw wet clay — a physical meditation on patience, touch, and centering.",
      },
      {
        tag: "Memory",
        heading: '"You Made My Goa ______" Exchange',
        desc: "Each traveller writes and receives handwritten words of affirmation and memory signatures directly into their physical passports.",
      },
      {
        tag: "Ceremony",
        heading: "Official Susegad Stamp Ceremony",
        desc: "The final seal is inked and embossed. Group photos with passports held high. Final toast to the chapter shared.",
      },
      {
        tag: "Return",
        heading: "AC Road Transport Return",
        desc: "Comfortable transit back to Mumbai / Bangalore. The journey concludes, while the WhatsApp batch fellowship stays active forever.",
      },
    ],
  },
];

const inclusions = [
  {
    title: "AC Road Transit",
    desc: "Mumbai / Bangalore ⇄ Goa round trip in comfortable, vetted air-conditioned vehicles.",
  },
  {
    title: "South Goa Villa Stay",
    desc: "Curated heritage property (shared occupancy, 2–3 per room) with pool, cookout kitchen, and quiet hours.",
  },
  {
    title: "All Meals Included",
    desc: "Authentic gaon lunch, gang cookout, beach breakfast, coastal thali, and village dinners.",
  },
  {
    title: "Portuguese Lane Cycling",
    desc: "Guided cycling tour through heritage Latin-style lanes with local storytelling prompts.",
  },
  {
    title: "Backwater Kayaking (45m)",
    desc: "Complete kayak gear, certified life jackets, and guide assistance on Cola Lagoon.",
  },
  {
    title: "Guided Netravali Trek",
    desc: "Forest trail permit, certified local nature guide, and safety-verified waterfall access.",
  },
  {
    title: "Secret Beach Access",
    desc: "Curated entry and silent walk facilitation at uncrowded shores (Kokolem and Cola).",
  },
  {
    title: "Artisan Pottery Workshop",
    desc: "Private clay workshop with a traditional Goan artisan to shape your own keepsake.",
  },
  {
    title: "STAMPNSTORIES Passport",
    desc: "Physical collector's passport, custom name card, mission sheets, and black envelope.",
  },
  {
    title: "Four Collectible Stamps",
    desc: "Roots, Wild, Fire, and Susegad seals earned through genuine participation.",
  },
  {
    title: "Consent-First Photography",
    desc: "Dedicated community photographer. Strict consent: zero photos published without explicit signoff.",
  },
  {
    title: "2 Verified SnS Hosts",
    desc: "Two full-time, vetted trip captains on ground ensuring comfort, logistics, and women-first care.",
  },
];

const exclusions = [
  "Personal transit to/from the confirmed pickup and drop-off hubs in Mumbai / Bangalore.",
  "Alcohol — strictly not permitted anywhere during official Stamp N Stories itinerary events.",
  "Personal shopping, cafe splurges, or individual spa appointments outside the schedule.",
  "Any unapproved activity or hazardous route outside the guided group itinerary.",
];

const experienceMoments = [
  {
    title: "SLOW MORNINGS",
    subtitle: "UNRUSHED SUNLIGHT",
    desc: "No wake-up sirens or rushing through breakfast to beat a tourist queue. You wake to the sound of birds, enjoy hot chai without glancing at a watch, and breathe before the day begins.",
    image:
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=1200&auto=format&fit=crop",
    quote: "“The luxury of an unscripted sunrise is something modern travel has completely forgotten.”",
  },
  {
    title: "LOCAL STORIES",
    subtitle: "BEYOND THE TOURIST LAYER",
    desc: "Step through the wooden doors of a 90-year-old auntie’s village home. Taste recipes passed down across generations and learn the Goa that exists far away from commercial beach shacks.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    quote: "“You don’t experience Goa by consuming it; you experience it by listening.”",
  },
  {
    title: "BEACHES WITHOUT THE CROWD",
    subtitle: "KOKOLEM & COLA",
    desc: "Golden sand fringed by basalt cliffs, where the only tracks are your own. A 30-minute silent walk with phones tucked away leaves room for your thoughts to finally catch up with your life.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    quote: "“Silence by the ocean isn’t empty; it is deeply, beautifully restorative.”",
  },
  {
    title: "THE GROUP BECOMES THE STORY",
    subtitle: "14 PEOPLE, NOT A CROWD",
    desc: "Chopping garlic side-by-side during the villa cookout, paddling in tandem through emerald lagoons, and answering cards that ask who you actually are. Shared rituals turn strangers into travel family.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    quote: "“You’re not joining a bus full of strangers. You’re joining a small chapter of people.”",
  },
];

const faqs = [
  {
    q: "Who is this trip for?",
    a: "Goa Uncovered is designed for travellers who are exhausted by chaotic, commercial sightseeing and crave a slower, more intentional community journey. It is especially suited for solo women, thoughtful explorers, and anyone wanting genuine human connection without forced partying.",
  },
  {
    q: "Why is the group strictly limited to 14 people?",
    a: "Mass group travel creates chaos and cliques. A small circle of 12 travellers and 2 verified hosts means seamless coordination, genuine dinner table conversations, personal comfort, and hosts who can look out for every single person individually.",
  },
  {
    q: "Do I need a Stamp N Stories Passport?",
    a: "Yes, passport verification is required to join. If you haven't received yours yet, simply submit your invite request — we verify IDs and issue your physical passport upon arrival during Day 0.",
  },
  {
    q: "What exactly is the ₹22,999 price?",
    a: "It is an all-inclusive price covering round-trip AC road transport from Mumbai/Bangalore, South Goa villa accommodation, all breakfasts, lunches, and dinners, guided cycling, Cola backwater kayaking, Netravali trek, pottery session, physical passport kit, and dedicated hosts.",
  },
  {
    q: "What does the ₹5,000 booking amount mean?",
    a: "The ₹5,000 booking amount reserves your confirmed spot and counts directly towards the total ₹22,999 trip cost. It is NOT an extra fee. The remaining ₹17,999 is paid later.",
  },
  {
    q: "When is the remaining payment due?",
    a: "The remaining ₹17,999 must be settled at least 7 days prior to departure, following full verification and logistics finalisation.",
  },
  {
    q: "What happens after I request an invite?",
    a: "Our community team reviews your application within 24–48 hours. If approved, we reach out via WhatsApp/email with a private payment link to confirm your batch spot with the ₹5,000 booking advance.",
  },
  {
    q: "Is alcohol allowed on the trip?",
    a: "No. Alcohol is strictly prohibited during official Stamp N Stories itinerary events and shared villa moments. We maintain a high-trust, safe, and clear-headed space where nobody feels uncomfortable or pressured.",
  },
  {
    q: "What if I don't want to be photographed?",
    a: "We operate on strict consent-first photography. If you prefer to stay off camera, your boundaries are 100% honored. Zero images or videos with recognizable faces are published without prior written consent.",
  },
  {
    q: "What happens if I don't want to participate in an activity?",
    a: "Everything is optional and respectful. If you prefer to sit by the pool, journal, or rest during a trek or kayak window, you are welcomed to do so with complete peace of mind. Nobody is judged or pressured.",
  },
  {
    q: "How does the Stamp system work?",
    a: "Stamps are earned through genuine participation, reflection, and peer witness — not merely by buying a ticket. Each stamp (Roots, Wild, Fire, Susegad) represents a unique ritual validated in your physical passport.",
  },
  {
    q: "What should I pack?",
    a: "Comfortable road clothing, walking/trekking shoes, beach slippers, sunscreen, a refillable water bottle, personal medicines, light cottons for daytime, a light jacket for road AC, a journal, and one white or pastel outfit for the closing photo ritual.",
  },
];

const navItems = [
  { label: "Overview", id: "overview" },
  { label: "The Idea", id: "the-idea" },
  { label: "Experience", id: "feels-like" },
  { label: "Journey", id: "journey" },
  { label: "Stamps", id: "stamps" },
  { label: "The Group", id: "people" },
  { label: "Safety & Code", id: "safety-code" },
  { label: "Included", id: "included" },
  { label: "Price", id: "price" },
  { label: "FAQ", id: "faq" },
];

/* ─────────────── 3D / TILT COMPONENTS ─────────────── */

function Stamp3DCard({
  stamp,
  index,
  reducedMotion,
}: {
  stamp: (typeof stamps)[0];
  index: number;
  reducedMotion: boolean | null;
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // max ±7 degrees subtle rotation
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setRotate({ x: rotateX, y: rotateY });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            !reducedMotion && isHovered
              ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-8px)`
              : "rotateX(0deg) rotateY(0deg) translateY(0px)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between hover:border-white/25 transition-all duration-300 shadow-md hover:shadow-2xl relative overflow-hidden"
      >
        {/* Subtle ambient stamp glow */}
        <div
          className="absolute -right-12 -top-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: stamp.color === "#202124" ? "#F26A2E" : stamp.color }}
        />

        <div style={{ transform: "translateZ(20px)" }}>
          {/* Stamp Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span
                className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border inline-block mb-2"
                style={{
                  borderColor: stamp.color === "#202124" ? "rgba(255,255,255,0.2)" : stamp.color + "90",
                  color: stamp.color === "#202124" ? "#FFFDF9" : stamp.color,
                }}
              >
                SEAL: {stamp.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#FFFDF9]">{stamp.title}</h3>
              <p className="text-xs font-sans tracking-widest uppercase text-[#FFFDF9]/60 mt-1">
                {stamp.meaning}
              </p>
            </div>

            <div
              className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500"
              style={{
                borderColor: stamp.color === "#202124" ? "rgba(255,255,255,0.4)" : stamp.color,
                background: stamp.accentBg,
              }}
            >
              <span
                className="text-[10px] font-bold tracking-widest"
                style={{ color: stamp.color === "#202124" ? "#FFFDF9" : stamp.color }}
              >
                {stamp.id}
              </span>
            </div>
          </div>

          <p className="text-sm font-sans text-[#FFFDF9]/80 leading-relaxed mb-6">{stamp.philosophy}</p>

          <div className="p-4 rounded-xl bg-black/30 border border-white/5 mb-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#F26A2E] block mb-1">
              The Challenge
            </span>
            <p className="text-xs font-sans text-[#FFFDF9]/85 leading-relaxed">{stamp.challenge}</p>
          </div>
        </div>

        <div
          style={{ transform: "translateZ(10px)" }}
          className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-[#FFFDF9]/60"
        >
          <span>
            <strong className="text-[#FFFDF9]/90 font-medium">Passport Proof: </strong>
            {stamp.proof}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceImageCard({
  image,
  alt,
  subtitle,
  reducedMotion,
}: {
  image: string;
  alt: string;
  subtitle: string;
  reducedMotion: boolean | null;
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // max ±5 degrees
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotate({ x: rotateX, y: rotateY });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  }

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform:
            !reducedMotion && isHovered
              ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-6px)`
              : "rotateX(0deg) rotateY(0deg) translateY(0px)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-[#202124]/15 shadow-sm group hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#202124]/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-5 left-6 right-6 pointer-events-none">
          <span className="text-xs font-bold tracking-widest uppercase text-[#FFFDF9]/90 font-sans drop-shadow-sm">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── MAIN PAGE COMPONENT ─────────────── */

export function GoaSusegadPage() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");
  const [scrollY, setScrollY] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parallax & Active Section tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          const scrollPos = window.scrollY + 220;
          for (let i = navItems.length - 1; i >= 0; i--) {
            const el = document.getElementById(navItems[i].id);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection(navItems[i].id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9] text-[#202124] antialiased selection:bg-[#F26A2E]/20 selection:text-[#F26A2E]">
      {/* ── 1. MAIN GLOBAL NAVBAR ── */}
      <Navbar />

      <main className="flex-1">
        {/* ── 2. HERO (COMMENCING AT VIEWPORT TOP Y=0) ── */}
        <section
          id="overview"
          className="relative bg-[#202124] overflow-hidden scroll-mt-0"
        >
          {/* Parallax Background Image */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transform: !prefersReduced && scrollY < 1200 ? `translateY(${scrollY * 0.22}px)` : "none",
              willChange: "transform",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1920&auto=format&fit=crop"
              alt="Goa Uncovered coastline"
              className="w-full h-full object-cover object-center opacity-45 mix-blend-luminosity scale-105"
            />
          </div>

          {/* Cinematic Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-[#202124]/60 to-[#202124]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-at-top-right from-transparent via-[#202124]/40 to-[#202124]/85 pointer-events-none" />

          {/* Hero Content Container with Safe Top Padding for Fixed Navbar */}
          <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 md:pb-16">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              {/* Category & Status Eyebrow */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs tracking-widest uppercase text-[#F6F0E6]/85 font-sans mb-6">
                <span className="text-[#F26A2E] font-bold">ROAD TRIP</span>
                <span>·</span>
                <span>TRAVEL</span>
                <span>·</span>
                <span className="text-[#F6F0E6]">SUSEGAD STAMP</span>
                <span>·</span>
                <span className="bg-[#FFFDF9]/10 border border-[#FFFDF9]/20 text-[#FFFDF9] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  PASSPORT REQUIRED
                </span>
                <span className="bg-[#FFFDF9]/10 border border-[#FFFDF9]/20 text-[#FFFDF9] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  4 STAMPS TO EARN
                </span>
              </div>

              {/* Title & Editorial Hook */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-[#FFFDF9] tracking-tight leading-[0.95] mb-6">
                GOA <span className="italic font-normal text-[#F6F0E6]/90">UNCOVERED.</span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#F6F0E6]/90 italic font-normal max-w-2xl leading-relaxed mb-8">
                “Not the Goa you came for.
                <br />
                The Goa you almost missed.”
              </p>

              {/* Editorial Metadata Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 px-6 rounded-2xl bg-[#FFFDF9]/10 backdrop-blur-md border border-[#FFFDF9]/15 mb-10 max-w-3xl">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#FFFDF9]/50 font-sans mb-0.5">
                    Location
                  </span>
                  <span className="text-sm font-sans font-semibold text-[#FFFDF9]">South Goa</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#FFFDF9]/50 font-sans mb-0.5">
                    Duration
                  </span>
                  <span className="text-sm font-sans font-semibold text-[#FFFDF9]">Day 0 + 3 Days</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#FFFDF9]/50 font-sans mb-0.5">
                    Cohort
                  </span>
                  <span className="text-sm font-sans font-semibold text-[#FFFDF9]">14 People Only</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#FFFDF9]/50 font-sans mb-0.5">
                    Investment
                  </span>
                  <span className="text-sm font-sans font-semibold text-[#F26A2E]">₹22,999 / Person</span>
                </div>
              </div>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/events/goa-susegad/request-invite"
                  className="bg-[#F26A2E] hover:bg-[#d9561e] text-white text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-[#F26A2E]/25 text-center flex items-center justify-center gap-2 group"
                >
                  <span>Request Invite</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#the-idea"
                  className="border border-[#FFFDF9]/30 hover:border-[#FFFDF9]/70 text-[#FFFDF9] hover:bg-[#FFFDF9]/5 text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full transition-colors text-center"
                >
                  Explore The Journey
                </a>
                <div className="flex items-center gap-2 px-3 text-xs text-[#FFFDF9]/70 font-sans">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>WAITING LIST IS OPEN</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 3. STICKY CHAPTER SUB-NAV (ATTACHING SEAMLESSLY AT TOP-16 MD:TOP-20) ── */}
        <nav
          aria-label="Experience Chapter Navigation"
          className="sticky top-16 md:top-20 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-y border-[#202124]/10 shadow-xs transition-all duration-200"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl flex items-center justify-between gap-4 h-14">
            {/* Scrollable Chapter Navigation */}
            <div className="flex items-center gap-6 sm:gap-7 text-xs font-sans overflow-x-auto no-scrollbar py-1 min-w-0">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative py-3.5 whitespace-nowrap transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-[#F26A2E] font-semibold"
                      : "text-[#202124]/70 hover:text-[#202124]"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="subnav-active-pill"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F26A2E] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Right Status & Action */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-[#F26A2E] bg-[#F26A2E]/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F26A2E] animate-pulse" />
                Waiting List Open
              </span>
              <Link
                to="/events/goa-susegad/request-invite"
                className="bg-[#F26A2E] hover:bg-[#d9561e] text-white text-xs font-bold tracking-widest uppercase px-4 sm:px-5 py-2 rounded-full transition-colors whitespace-nowrap shadow-xs"
              >
                Request Invite
              </Link>
            </div>
          </div>
        </nav>

        {/* ── 4. THE IDEA (FLOWS NATURALLY DIRECTLY BELOW THE EVENT SUB-NAVIGATION) ── */}
        <section
          id="the-idea"
          className="py-20 md:py-28 bg-[#FFFDF9] border-b border-[#202124]/10 scroll-mt-20 md:scroll-mt-24"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#F26A2E]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E]">THE IDEA</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#202124] leading-tight mb-8">
                  GOA, BUT DIFFERENT.
                </h2>
                <p className="text-xl sm:text-2xl font-serif text-[#202124]/85 leading-relaxed italic">
                  Three days of slow mornings, curated brunches, meaningful local experiences, women-first comfort, beach
                  walks, community challenges, and moments meant to be lived rather than constantly photographed.
                </p>
              </div>

              <div className="lg:col-span-5 space-y-6 pt-2">
                <div className="p-6 rounded-2xl bg-[#F6F0E6] border border-[#202124]/10">
                  <div className="text-xs font-bold tracking-widest uppercase text-[#7B5E3A] mb-2">
                    GOA UNCOVERED · SUSEGAD STAMP
                  </div>
                  <p className="text-sm font-sans text-[#202124]/80 leading-relaxed">
                    This is not about checking tourist attractions off a spreadsheet. It is about curiosity, connection,
                    presence, active participation, and small-group community trust.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                  <div className="p-4 rounded-xl border border-[#202124]/10 bg-white">
                    <span className="text-[#F26A2E] font-bold block mb-1">01. PRESENCE</span>
                    <span className="text-[#202124]/70">Phone-down windows to hear the waves and conversations.</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#202124]/10 bg-white">
                    <span className="text-[#234A3C] font-bold block mb-1">02. CONNECTION</span>
                    <span className="text-[#202124]/70">Curated question challenges designed to bypass small talk.</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#202124]/10 bg-white">
                    <span className="text-[#7B5E3A] font-bold block mb-1">03. RESPECT</span>
                    <span className="text-[#202124]/70">Honoring ancestral villages and regional Goan households.</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#202124]/10 bg-white">
                    <span className="text-[#202124] font-bold block mb-1">04. WOMAN-FIRST</span>
                    <span className="text-[#202124]/70">Rigorous safety vetting, boundaries, and 24x7 host support.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. WHAT THIS GOA FEELS LIKE ── */}
        <section
          id="feels-like"
          className="py-24 md:py-32 bg-[#F6F0E6] border-b border-[#202124]/10 scroll-mt-28 md:scroll-mt-36"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] block mb-3">
                IMMERSIVE STORYTELLING
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#202124] leading-tight">
                What the journey actually feels like.
              </h2>
              <p className="mt-4 text-[#202124]/70 font-sans text-base">
                Four distinct experiential chapters that anchor the rhythm of your Goa stay.
              </p>
            </div>

            <div className="space-y-16">
              {experienceMoments.map((item, idx) => (
                <div
                  key={item.title}
                  className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                    <ExperienceImageCard
                      image={item.image}
                      alt={item.title}
                      subtitle={item.subtitle}
                      reducedMotion={prefersReduced}
                    />
                  </div>

                  <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"} space-y-4`}>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#F26A2E]">
                      MOMENT 0{idx + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#202124]">{item.title}</h3>
                    <p className="text-sm sm:text-base font-sans text-[#202124]/75 leading-relaxed">{item.desc}</p>
                    <blockquote className="pt-3 border-t border-[#202124]/10 text-sm font-serif italic text-[#7B5E3A]">
                      {item.quote}
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VIZ 1: ROAD TO GOA NIGHT JOURNEY (DAY 0 ROAD TO GOA OVERTURE) ── */}
        <Suspense fallback={null}>
          <RoadToGoaNightScene />
        </Suspense>

        {/* ── 6. THE JOURNEY (PROGRESSIVE VISUAL ITINERARY) ── */}
        <section
          id="journey"
          className="py-24 md:py-32 bg-[#FFFDF9] border-b border-[#202124]/10 scroll-mt-28 md:scroll-mt-36"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] block mb-3">
                PROGRESSIVE ITINERARY
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#202124] leading-tight">
                The Journey through Goa.
              </h2>
              <p className="mt-4 text-[#202124]/70 font-sans text-base">
                An intentional 4-day progression from road overture to deep community presence.
              </p>
            </div>

            {/* Interactive Journey Milestones Path */}
            <div className="relative mb-12 py-4">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#202124]/10 -translate-y-1/2 hidden md:block" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-[#F26A2E] -translate-y-1/2 hidden md:block transition-all duration-500"
                style={{ width: `${(activeDay / (itineraryDays.length - 1)) * 100}%` }}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
                {itineraryDays.map((d, i) => (
                  <button
                    key={d.dayNumber}
                    onClick={() => setActiveDay(i)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                      activeDay === i
                        ? "bg-[#202124] text-white border-[#202124] shadow-md -translate-y-1"
                        : "bg-[#F6F0E6] text-[#202124]/75 border-[#202124]/10 hover:border-[#202124]/30"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        activeDay === i ? "bg-[#F26A2E] text-white" : "bg-white text-[#202124]"
                      }`}
                    >
                      {i}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono tracking-widest uppercase opacity-70 block">
                        {d.dayNumber}
                      </span>
                      <span className="text-xs font-bold truncate block">{d.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Day View */}
            {(() => {
              const d = itineraryDays[activeDay];
              return (
                <motion.div
                  key={d.dayNumber}
                  initial={prefersReduced ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl border border-[#202124]/15 bg-[#F6F0E6]/50 p-6 sm:p-10 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#202124]/10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#F26A2E]">
                          {d.dayNumber}
                        </span>
                        <span className="text-xs font-bold tracking-widest uppercase text-[#202124]/60">
                          {d.departure}
                        </span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-serif text-[#202124]">{d.title}</h3>
                    </div>

                    {d.stampAwarded && (
                      <div className="inline-flex items-center gap-2 bg-[#234A3C]/10 border border-[#234A3C]/25 text-[#234A3C] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider self-start md:self-auto">
                        <Award className="w-3.5 h-3.5" />
                        <span>STAMP: {d.stampAwarded}</span>
                      </div>
                    )}
                  </div>

                  <p className="py-6 text-base font-serif italic text-[#202124]/80 leading-relaxed border-b border-[#202124]/10">
                    {d.story}
                  </p>

                  <div className="pt-8 space-y-6">
                    {d.schedule.map((item, idx) => (
                      <div key={idx} className="flex gap-4 sm:gap-6 items-start">
                        <div className="w-24 sm:w-28 shrink-0 text-right">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F26A2E] bg-[#F26A2E]/10 px-2 py-1 rounded-md inline-block">
                            {item.tag}
                          </span>
                        </div>
                        <div className="flex-1 pb-6 border-b border-[#202124]/10 last:border-b-0">
                          <h4 className="text-base sm:text-lg font-serif text-[#202124] font-medium mb-1">
                            {item.heading}
                          </h4>
                          <p className="text-xs sm:text-sm font-sans text-[#202124]/75 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </section>

        {/* ── VIZ 2: SOUTH GOA JOURNEY MAP ── */}
        <Suspense fallback={null}>
          <SouthGoaJourneyMap />
        </Suspense>

        {/* ── VIZ 3: DAY 2 TERRAIN ELEVATION ── */}
        <Suspense fallback={null}>
          <DayTwoTerrainScene />
        </Suspense>

        {/* ── 7. FOUR STAMPS (HERO 3D DIFFERENTIATOR SECTION) ── */}
        <section
          id="stamps"
          className="py-24 md:py-32 bg-[#202124] text-[#FFFDF9] scroll-mt-28 md:scroll-mt-36"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] block mb-3">
                THE PASSPORT IDENTITY
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif text-[#FFFDF9] leading-tight">
                FOUR STAMPS.
                <br />
                <span className="italic font-normal text-[#F6F0E6]/80">ONE JOURNEY.</span>
              </h2>
              <p className="mt-4 text-[#FFFDF9]/70 font-sans text-base max-w-xl">
                A Stamp N Stories passport is never an attendance card. Each seal represents a distinct human virtue
                earned through mindful participation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {stamps.map((stamp, idx) => (
                <Stamp3DCard
                  key={stamp.id}
                  stamp={stamp}
                  index={idx}
                  reducedMotion={prefersReduced}
                />
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center max-w-2xl mx-auto">
              <p className="text-xs font-sans uppercase tracking-widest text-[#FFFDF9]/75">
                Core Credo:{" "}
                <span className="text-[#F26A2E] font-bold">
                  Challenge + Participation + Witness + Ceremony = Earned Stamp
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ── VIZ 4: FOUR STAMPS SPATIAL JOURNEY ── */}
        <Suspense fallback={null}>
          <FourStampsJourneyScene />
        </Suspense>

        {/* ── 8. THE PEOPLE (14 ONLY) ── */}
        <section
          id="people"
          className="py-24 md:py-32 bg-[#FFFDF9] border-b border-[#202124]/10 scroll-mt-28 md:scroll-mt-36"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E]">COHORT DYNAMICS</span>
                <h2 className="text-4xl sm:text-6xl font-serif text-[#202124] leading-tight">
                  14 PEOPLE ONLY.
                </h2>
                <p className="text-xl font-serif italic text-[#7B5E3A]">
                  “You’re not joining a bus full of strangers. You’re joining a small chapter of people.”
                </p>
                <p className="text-sm sm:text-base font-sans text-[#202124]/75 leading-relaxed">
                  We strictly cap every batch to 12 verified travellers and 2 trained Stamp N Stories hosts. We do not
                  believe in mass tour groups or anonymous attendance. A circle of 14 creates an environment where
                  introverts can be themselves, conversations flow without yelling, and hosts are genuinely present for
                  everyone.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-sans">
                  <div className="p-4 rounded-xl border border-[#202124]/10 bg-[#F6F0E6]">
                    <span className="font-bold text-[#202124] block mb-1">12 Travellers</span>
                    <span className="text-[#202124]/70">Verified members across creative, professional backgrounds.</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#202124]/10 bg-[#F6F0E6]">
                    <span className="font-bold text-[#202124] block mb-1">2 Vetted Hosts</span>
                    <span className="text-[#202124]/70">On-ground captains managing safety, pace, and logistics.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-8 sm:p-10 rounded-3xl bg-[#234A3C] text-[#FFFDF9] relative overflow-hidden shadow-lg">
                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-[#FFFDF9]/10 px-3 py-1 rounded-full text-xs font-sans tracking-widest uppercase text-[#FFFDF9]/80">
                      <Users className="w-3.5 h-3.5 text-[#F26A2E]" />
                      <span>The Cohort Philosophy</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif text-[#FFFDF9]">
                      Why Small Groups Change Everything
                    </h3>

                    <ul className="space-y-4 text-sm font-sans text-[#FFFDF9]/85">
                      <li className="flex gap-3">
                        <Check className="w-4 h-4 text-[#F26A2E] shrink-0 mt-0.5" />
                        <span><strong>Easier, Natural Conversations:</strong> No awkward microphone announcements or crowded dining lines.</span>
                      </li>
                      <li className="flex gap-3">
                        <Check className="w-4 h-4 text-[#F26A2E] shrink-0 mt-0.5" />
                        <span><strong>Zero Forced Chemistry:</strong> We don't guarantee instant best friends, but we guarantee space to be respected.</span>
                      </li>
                      <li className="flex gap-3">
                        <Check className="w-4 h-4 text-[#F26A2E] shrink-0 mt-0.5" />
                        <span><strong>Active Host Attentiveness:</strong> 1 host for every 6 travellers ensures personalized comfort and safety.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. SAFETY + COMMUNITY CODE ── */}
        <section
          id="safety-code"
          className="py-24 md:py-32 bg-[#F6F0E6] border-b border-[#202124]/10 scroll-mt-28 md:scroll-mt-36"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] block mb-3">
                MUTUAL SOCIAL CONTRACT
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#202124] leading-tight">
                Safety &amp; Community Code.
              </h2>
              <p className="mt-4 text-[#202124]/70 font-sans text-base">
                Our community principles are not legal fine print; they are the values that make our spaces peaceful and safe.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Community Code */}
              <div className="lg:col-span-7 bg-[#234A3C] rounded-3xl p-8 sm:p-10 text-[#FFFDF9] shadow-md">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#F26A2E]">
                    BEFORE YOU COME
                  </span>
                  <span className="text-xs text-[#FFFDF9]/60 font-sans">Social Contract</span>
                </div>

                <div className="space-y-5 text-sm sm:text-base font-sans text-[#FFFDF9]/90">
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#F26A2E]/20 text-[#F26A2E] font-bold flex items-center justify-center shrink-0 text-xs">
                      01
                    </span>
                    <p className="leading-relaxed">
                      <strong>Zero Pressure:</strong> No pressure for photos, dancing, loud drinking, conversations or social media exchange.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#F26A2E]/20 text-[#F26A2E] font-bold flex items-center justify-center shrink-0 text-xs">
                      02
                    </span>
                    <p className="leading-relaxed">
                      <strong>Alcohol-Free Operations:</strong> Alcohol is strictly not permitted on official itinerary segments.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#F26A2E]/20 text-[#F26A2E] font-bold flex items-center justify-center shrink-0 text-xs">
                      03
                    </span>
                    <p className="leading-relaxed">
                      <strong>Women-First Comfort:</strong> Crowd quality, physical boundaries, and emotional respect take absolute precedence.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#F26A2E]/20 text-[#F26A2E] font-bold flex items-center justify-center shrink-0 text-xs">
                      04
                    </span>
                    <p className="leading-relaxed">
                      <strong>Listening Is Valid:</strong> Nobody is forced to speak during deep circles. Silent listening is honorable participation.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#F26A2E]/20 text-[#F26A2E] font-bold flex items-center justify-center shrink-0 text-xs">
                      05
                    </span>
                    <p className="leading-relaxed">
                      <strong>Earned Credibility:</strong> Passport stamps are earned by showing up differently, not purchased.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-[#FFFDF9]/70">
                  <PhoneCall className="w-4 h-4 text-[#25D366]" />
                  <span>24x7 Community Helpline accessible to every traveller throughout the trip.</span>
                </div>
              </div>

              {/* Safety Structure */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-white border border-[#202124]/10 shadow-xs">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] block mb-2">BEFORE TRIP</span>
                  <p className="text-xs sm:text-sm font-sans text-[#202124]/75 leading-relaxed">
                    Aadhaar / ID proof verification, verified pickup coordination, medical allergies, and emergency contacts vetted before departure.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#202124]/10 shadow-xs">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#234A3C] block mb-2">DURING TRIP</span>
                  <p className="text-xs sm:text-sm font-sans text-[#202124]/75 leading-relaxed">
                    2 trained SnS hosts present 24/7. Certified local trek guides, life jackets for kayaking, and structured quiet hours at night.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#202124]/10 shadow-xs">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#7B5E3A] block mb-2">PRIVACY &amp; PHOTOS</span>
                  <p className="text-xs sm:text-sm font-sans text-[#202124]/75 leading-relaxed">
                    Consent is mandatory before photographing anyone up close. Phones-down windows to protect presence and peace of mind.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#202124]/10 shadow-xs">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#202124] block mb-2">AFTER TRIP</span>
                  <p className="text-xs sm:text-sm font-sans text-[#202124]/75 leading-relaxed">
                    Confidential feedback loop and red-flag reporting. Any boundary violation permanently revokes future community passport access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VIZ 5: SUSEGAD CLOSING SCENE ── */}
        <Suspense fallback={null}>
          <SusegadClosingScene />
        </Suspense>

        {/* ── 10. WHAT'S INCLUDED / NOT INCLUDED ── */}
        <section
          id="included"
          className="py-24 md:py-32 bg-[#FFFDF9] border-b border-[#202124]/10 scroll-mt-28 md:scroll-mt-36"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] block mb-3">
                TRANSPARENT VALUE
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#202124] leading-tight">
                Honest Inclusions.
              </h2>
              <p className="mt-4 text-[#202124]/70 font-sans text-base">
                Everything required for your stay, travel, meals, and curated experiences is handled seamlessly.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {inclusions.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-[#202124]/10 bg-[#F6F0E6]/30 hover:bg-[#F6F0E6]/60 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-[#234A3C]" />
                    <h3 className="font-serif text-lg text-[#202124]">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-[#202124]/70 leading-relaxed pl-6">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Exclusions Card */}
            <div className="p-8 rounded-3xl border border-[#202124]/10 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <X className="w-4 h-4 text-[#F26A2E]" />
                <h3 className="font-serif text-xl text-[#202124]">What is not included</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm font-sans text-[#202124]/65">
                {exclusions.map((ex, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#202124]/30 shrink-0 mt-2" />
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 11. PRICE SECTION ── */}
        <section
          id="price"
          className="py-24 md:py-32 bg-[#202124] text-[#FFFDF9] scroll-mt-28 md:scroll-mt-36"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] block mb-3">
                  TRANSPARENT INVESTMENT
                </span>
                <h2 className="text-4xl sm:text-6xl font-serif text-[#FFFDF9]">THE TRIP</h2>
                <p className="mt-4 text-[#FFFDF9]/65 font-sans text-sm sm:text-base">
                  No hidden service surcharges or unexpected onsite fees.
                </p>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#F26A2E] block mb-2">
                      ALL-INCLUSIVE TOTAL
                    </span>
                    <div className="text-5xl sm:text-6xl font-serif text-[#FFFDF9] font-normal leading-tight">
                      ₹22,999
                    </div>
                    <span className="text-xs font-sans uppercase tracking-widest text-[#FFFDF9]/60 block mt-1">
                      Per Person · South Goa Chapter
                    </span>

                    <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                      <div className="flex items-baseline justify-between text-sm font-sans">
                        <span className="text-[#FFFDF9]/80">Initial Booking Advance</span>
                        <span className="font-bold text-[#F26A2E] text-lg">₹5,000</span>
                      </div>
                      <div className="flex items-baseline justify-between text-sm font-sans">
                        <span className="text-[#FFFDF9]/80">Remaining Balance</span>
                        <span className="font-bold text-white text-lg">₹17,999</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 md:border-l md:border-white/10 md:pl-10">
                    <div className="p-4 rounded-2xl bg-black/35 border border-white/5 space-y-2">
                      <p className="text-xs font-sans text-[#FFFDF9]/90 leading-relaxed">
                        <strong>Payment Transparency:</strong> The ₹5,000 booking amount counts towards the full trip
                        cost. It is NOT an additional fee.
                      </p>
                      <p className="text-xs font-sans text-[#FFFDF9]/70 leading-relaxed">
                        The remaining ₹17,999 must be settled at least 7 days before the departure date.
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-[#FFFDF9]/50 block mb-2">
                        UPCOMING BATCHES
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {upcomingBatches.map((batch) => (
                          <span
                            key={batch}
                            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-[#FFFDF9]"
                          >
                            {batch}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center gap-2 text-xs text-[#25D366] font-sans mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                        <span>WAITING LIST IS OPEN · LIMITED TO 14 SPOTS</span>
                      </div>
                      <Link
                        to="/events/goa-susegad/request-invite"
                        className="w-full bg-[#F26A2E] hover:bg-[#d9561e] text-white text-sm font-bold tracking-widest uppercase py-4 px-8 rounded-full transition-all text-center flex items-center justify-center gap-2 group shadow-lg"
                      >
                        <span>Request Invite</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 12. FAQ SECTION ── */}
        <section
          id="faq"
          className="py-24 md:py-32 bg-[#FFFDF9] border-b border-[#202124]/10 scroll-mt-28 md:scroll-mt-36"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] block mb-3">
                QUESTIONS ANSWERED
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#202124]">Frequently Asked Questions</h2>
              <p className="mt-4 text-[#202124]/70 font-sans text-sm sm:text-base">
                Clear, honest answers to help you decide if this chapter is right for you.
              </p>
            </div>

            <div className="divide-y divide-[#202124]/10 border-y border-[#202124]/10">
              {faqs.map((faq, i) => (
                <details key={i} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-serif text-lg sm:text-xl text-[#202124] hover:text-[#F26A2E] transition-colors">
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 shrink-0 text-[#202124]/40 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <p className="mt-4 text-sm sm:text-base font-sans text-[#202124]/70 leading-relaxed pr-6">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-12 text-center text-xs font-sans text-[#202124]/60">
              Have a specific question not covered here? Reach out on our{" "}
              <a
                href="https://chat.whatsapp.com/BdfvQOFIm4DEiseiXVwUwf?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F26A2E] underline font-semibold"
              >
                WhatsApp Community
              </a>
              .
            </div>
          </div>
        </section>

        {/* ── 13. FINAL STORY CTA ── */}
        <section className="py-24 md:py-32 bg-[#F6F0E6] text-center">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold tracking-widest uppercase text-[#F26A2E] block mb-4">
                WAITING LIST IS OPEN
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif text-[#202124] mb-6 leading-tight">
                Road to Goa.
                <br />
                <span className="italic font-normal text-[#7B5E3A]">Four stamps to earn.</span>
              </h2>
              <p className="text-[#202124]/75 font-sans text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
                Tell us a little about yourself. We’ll take it from there. Remember, this isn’t a trip you casually book — it
                is a chapter you earn.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/events/goa-susegad/request-invite"
                  className="bg-[#F26A2E] hover:bg-[#d9561e] text-white font-bold tracking-widest uppercase text-sm px-10 py-4 rounded-full transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  Request Invite
                </Link>
                <Link
                  to="/experiences"
                  className="border border-[#202124]/20 hover:border-[#202124]/50 text-[#202124] font-bold tracking-widest uppercase text-sm px-10 py-4 rounded-full transition-colors w-full sm:w-auto"
                >
                  All Experiences
                </Link>
              </div>

              <p className="mt-8 text-xs font-sans text-[#202124]/50">
                14 members only per batch · Women-first safety &amp; verification ·{" "}
                <Link to="/refund-policy" className="underline hover:text-[#F26A2E]">
                  Refund Policy
                </Link>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
