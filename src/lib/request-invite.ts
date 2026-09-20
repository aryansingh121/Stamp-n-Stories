import { z } from "zod";

export const genderOptions = ["Male", "Female"] as const;

export const goaExperienceOptions = [
  "Yes and love it",
  "Yes — disaster, trying again",
  "No, but genuinely ready",
  "Solo only — this sounded interesting",
] as const;

export const dateCommitmentOptions = [
  "Dates blocked, I’m 100% in",
  "90% — just need to confirm",
  "Keen, but the date might still shift",
  "Just exploring now",
] as const;

export const tripCostOptions = [
  "I’m in, if the crowd is together",
  "Nah, too expensive for me",
] as const;

export const verificationCallOptions = ["Yes", "No"] as const;

export const upcomingBatchOptions = ["25 Sep", "12 Oct", "16 Oct"] as const;

// Allow @username or full URL for Instagram
export function validateInstagram(value: string) {
  if (!value) return false;
  // Match @username, username, or instagram.com/username
  const trimmed = value.trim();
  if (trimmed.startsWith("http") && !trimmed.includes("instagram.com")) {
    return false;
  }
  return trimmed.length > 0;
}

export const requestInviteSchema = z.object({
  name: z.string().min(1, "Please enter your name.").max(100),
  age: z
    .number({
      required_error: "Please enter your age.",
      invalid_type_error: "Age must be a valid number.",
    })
    .min(18, "You must be at least 18 years old.")
    .max(100, "Please enter a valid age."),
  gender: z.enum(genderOptions, {
    required_error: "Please select your gender.",
  }),
  profession: z.string().min(1, "Please enter your profession.").max(200),
  interests: z
    .string()
    .min(1, "Please tell us what you enjoy outside of work.")
    .max(2000),
  goaExperience: z.enum(goaExperienceOptions, {
    required_error: "Please select your experience with Goa.",
  }),
  dateCommitment: z.enum(dateCommitmentOptions, {
    required_error: "Please select your date commitment.",
  }),
  tripCostResponse: z.enum(tripCostOptions, {
    required_error: "Please select your response.",
  }),
  instagram: z
    .string()
    .min(1, "Please provide your Instagram profile.")
    .max(200)
    .refine(validateInstagram, "Please enter a valid Instagram profile/handle."),
  verificationCall: z.enum(verificationCallOptions, {
    required_error: "Please indicate if you are okay with a verification call.",
  }),
  upcomingBatch: z.enum(upcomingBatchOptions, {
    required_error: "Please select a batch.",
  }),
  whatsappNumber: z
    .string()
    .min(1, "Please enter your WhatsApp number.")
    .max(30, "Please enter a valid WhatsApp number.")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Please enter a valid WhatsApp number with at least 10 digits.",
    ),
  emailId: z
    .string()
    .min(1, "Please enter a valid email address.")
    .email("Please enter a valid email address."),
});

export type RequestInviteFormValues = z.infer<typeof requestInviteSchema>;
