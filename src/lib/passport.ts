// Derive travel personality, vibe tags, level from profile data.

export type ProfileLike = {
  interests?: string[] | null;
  travel_vibe?: string | null;
  cant_stop_doing?: string | null;
  stamps?: Array<{ event: string; emoji?: string; date?: string }> | null;
  status?: string | null;
};

const ICEBREAKERS = [
  "What's the most random place you'd take a stranger on a first hang?",
  "House party or rooftop sunset — pick one and defend it.",
  "What's the song that owns your current mood?",
  "If your camera roll had a title this month, what would it be?",
  "Best meetup or party you've been to this year?",
  "Street food you'd cross the city for?",
  "One neighborhood in your city everyone sleeps on?",
  "The smallest thing that instantly makes a hangout feel special?",
  "Group chat name for our next plan — go.",
  "Trip, meetup, or house party — what's your default 'yes'?",
];

const VIBE_TAGS: Record<string, string[]> = {
  music: ["#PlaylistCurator", "#GigBuddy"],
  food: ["#FoodHunter", "#LateNightSnacker"],
  coffee: ["#CafeHopper"],
  photography: ["#FrameChaser", "#GoldenHourSquad"],
  hiking: ["#TrailSeeker"],
  beach: ["#SaltyHair"],
  party: ["#NightOwl", "#DanceFloorRegular"],
  yoga: ["#SlowMornings"],
  art: ["#GalleryDay"],
  film: ["#CinemaKid"],
  books: ["#PageTurner"],
  surf: ["#WaveChaser"],
  bike: ["#TwoWheelTribe"],
  gaming: ["#CouchCoOp"],
  fashion: ["#FitCheck"],
  crypto: ["#OnChain"],
  startup: ["#BuilderEnergy"],
  cooking: ["#KitchenChaos"],
  travel: ["#NextFlightOut"],
  writing: ["#JournalKeeper"],
};

export function vibeTags(interests: string[] = []): string[] {
  const set = new Set<string>();
  for (const raw of interests) {
    const k = raw.toLowerCase().trim();
    for (const key of Object.keys(VIBE_TAGS)) {
      if (k.includes(key)) VIBE_TAGS[key].forEach((t) => set.add(t));
    }
  }
  if (!set.size) set.add("#FreshArrival");
  return Array.from(set).slice(0, 5);
}

export function travelPersonality(p: ProfileLike): string {
  const all =
    (p.interests || []).join(" ").toLowerCase() +
    " " +
    (p.travel_vibe || "").toLowerCase() +
    " " +
    (p.cant_stop_doing || "").toLowerCase();
  if (/food|eat|cook|coffee|snack|brunch/.test(all)) return "The Food Hunter";
  if (/party|dance|club|music|gig|house party/.test(all)) return "The Party Starter";
  if (/photo|camera|film|content|reel|write|story/.test(all)) return "The Storyteller";
  if (/hike|surf|climb|trek|adventure|mountain|travel|trip/.test(all)) return "The Explorer";
  if (/people|squad|host|community|meetup|network/.test(all)) return "The Connector";
  if (/chill|read|yoga|slow|cafe|garden/.test(all)) return "The Daydreamer";
  return "The Connector";
}

export function passportLevel(p: ProfileLike): { name: string; tier: number } {
  const stamps = p.stamps?.length || 0;
  if (stamps >= 10) return { name: "Elite Member", tier: 4 };
  if (stamps >= 5) return { name: "Squad Member", tier: 3 };
  if (stamps >= 1) return { name: "Social Member", tier: 2 };
  return { name: "New Member", tier: 1 };
}

export function icebreakerFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return ICEBREAKERS[h % ICEBREAKERS.length];
}

export function squadScore(a: ProfileLike, b: ProfileLike): number {
  const ai = new Set((a.interests || []).map((s) => s.toLowerCase().trim()));
  const bi = new Set((b.interests || []).map((s) => s.toLowerCase().trim()));
  let overlap = 0;
  ai.forEach((x) => bi.has(x) && overlap++);
  const union = new Set([...ai, ...bi]).size || 1;
  let score = (overlap / union) * 80;
  if (a.travel_vibe && a.travel_vibe === b.travel_vibe) score += 20;
  return Math.round(Math.min(100, score));
}

export const TRAVEL_VIBES = [
  "Party Lover",
  "Explorer",
  "Foodie",
  "Adventure Seeker",
  "Chill Hangout",
  "Content Creator",
  "Culture Buff",
  "Meetup Regular",
  "House Party Host",
  "City Local",
  "Digital Nomad",
] as const;

export const SUGGESTED_INTERESTS = [
  "Music",
  "Food",
  "Coffee",
  "Photography",
  "Hiking",
  "Beach",
  "Party",
  "Yoga",
  "Art",
  "Film",
  "Books",
  "Surfing",
  "Biking",
  "Gaming",
  "Fashion",
  "Cooking",
  "Travel",
  "Writing",
  "Startup",
  "Crypto",
];
