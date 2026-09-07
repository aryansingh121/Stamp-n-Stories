import {
  BadgeCheck,
  UserCheck,
  ClipboardCheck,
  FileCheck,
  Bell,
  Lock,
  Flag,
  EyeOff,
} from "lucide-react";

export const mechanisms = [
  {
    key: "identity",
    icon: BadgeCheck,
    title: "Identity verification",
    desc: "We verify who is joining, helping set a safer baseline before the experience begins.",
    status: "In product",
  },
  {
    key: "member",
    icon: UserCheck,
    title: "Member screening",
    desc: "Applicants are reviewed with clear expectations and a consistent approval process.",
    status: "In product",
  },
  {
    key: "host",
    icon: ClipboardCheck,
    title: "Host screening",
    desc: "Hosts are checked through a clear protocol before they can lead an experience.",
    status: "Placeholder protocol",
  },
  {
    key: "group",
    icon: FileCheck,
    title: "Group screening",
    desc: "Invite-based groups are assessed to make sure the right people are in the room.",
    status: "Placeholder protocol",
  },
  {
    key: "emergency",
    icon: Bell,
    title: "Emergency contacts",
    desc: "Key contact details are surfaced where they matter most, without making the experience feel intrusive.",
    status: "In product / per experience",
  },
  {
    key: "privacy",
    icon: Lock,
    title: "Privacy",
    desc: "Personal details stay protected and only the minimum required information is surfaced.",
    status: "In product",
  },
  {
    key: "redflag",
    icon: Flag,
    title: "Red-flag reporting",
    desc: "Members can flag issues and trust the community to respond with a defined process.",
    status: "Community process",
  },
  {
    key: "discreet",
    icon: EyeOff,
    title: "Discreet design",
    desc: "The experience is designed to feel respectful, private and low-pressure for women.",
    status: "Community rule",
  },
];

export function findMechanismsForText(text: string) {
  const t = (text || "").toLowerCase();
  const picks: string[] = [];
  if (t.includes("passport")) picks.push("identity");
  if (t.includes("passport") || t.includes("application") || t.includes("apply")) picks.push("member");
  if (t.includes("host") || t.includes("captain") || t.includes("trip")) picks.push("host");
  if (t.includes("invite") || t.includes("invite-only")) picks.push("group");
  if (t.includes("emergency") || t.includes("emergency")) picks.push("emergency");
  if (t.includes("privacy") || t.includes("private") || t.includes("discreet")) picks.push("privacy");
  if (t.includes("red-flag") || t.includes("red stamp") || t.includes("report")) picks.push("redflag");
  if (t.includes("discreet") || t.includes("phone") || t.includes("consent")) picks.push("discreet");
  // remove duplicates while keeping order
  return Array.from(new Set(picks));
}

export default mechanisms;
