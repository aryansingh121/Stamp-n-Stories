import { z } from "zod";

export const partnershipTypeOptions = [
  "Brand Partnership",
  "Event Partnership",
  "Venue Partnership",
  "Travel Partnership",
  "Hospitality Partnership",
  "Community Partnership",
  "Creator / Media Partnership",
  "Sponsorship",
  "Other",
] as const;

export const partnerInquirySchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name.").max(120),
  workEmail: z.string().trim().email("Please enter a valid email address.").max(200),
  phoneNumber: z.string().trim().max(30).optional(),
  organizationName: z
    .string()
    .trim()
    .min(1, "Please enter your organisation or company name.")
    .max(150),
  role: z.string().trim().min(1, "Please enter your role or designation.").max(150),
  partnershipType: z
    .string()
    .min(1, "Please select a partnership type.")
    .refine((value) => partnershipTypeOptions.includes(value as (typeof partnershipTypeOptions)[number]), {
      message: "Please select a partnership type.",
    }),
  website: z.string().trim().max(300).optional(),
  city: z.string().trim().min(1, "Please enter your city or location.").max(120),
  partnershipIdea: z
    .string()
    .trim()
    .min(1, "Please tell us a little about your partnership idea.")
    .max(4000),
  additionalInfo: z.string().trim().max(4000).optional(),
});

export function sanitizeOptional(value: string | undefined | null) {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

export function validateWebsite(value: string | undefined) {
  if (!value) return true;
  const normalized = value.trim();
  if (!normalized) return true;

  try {
    const url = new URL(normalized);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export function formatText(value: string | undefined) {
  return value && value.trim().length > 0 ? value.trim() : "-";
}

