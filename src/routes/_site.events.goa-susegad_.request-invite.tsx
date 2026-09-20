import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { Button } from "@/landing/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/landing/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/landing/components/ui/form";
import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import {
  requestInviteSchema,
  RequestInviteFormValues,
  genderOptions,
  goaExperienceOptions,
  dateCommitmentOptions,
  tripCostOptions,
  verificationCallOptions,
  upcomingBatchOptions,
} from "@/lib/request-invite";

const submitRequestInvite = createServerFn({ method: "POST" })
  .validator(requestInviteSchema)
  .handler(async ({ data }) => {
    const { sendRequestInviteEmail } = await import("@/lib/request-invite.server");
    const normalizedData = {
      ...data,
      name: data.name.trim(),
      profession: data.profession.trim(),
      interests: data.interests.trim(),
      instagram: data.instagram.trim(),
      whatsappNumber: data.whatsappNumber.trim(),
      emailId: data.emailId.trim(),
    };

    await sendRequestInviteEmail(normalizedData);
    return { success: true };
  });

export const Route = createFileRoute("/_site/events/goa-susegad_/request-invite")({
  component: RequestInvitePage,
});

function RadioCard({
  name,
  value,
  selectedValue,
  onChange,
  children,
}: {
  name?: string;
  value: string;
  selectedValue: string | undefined;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  const isSelected = value === selectedValue;
  return (
    <label
      className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-[#F26A2E] ${
        isSelected
          ? "border-[#F26A2E] bg-[#F26A2E]/5 ring-1 ring-[#F26A2E]"
          : "border-[#202124]/10 bg-[#FFFDF9]"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        className="sr-only"
        checked={isSelected}
        onChange={() => onChange(value)}
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <div className="text-sm font-medium text-[#202124]">{children}</div>
        </div>
        <div
          className={`shrink-0 ml-3 h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
            isSelected ? "border-[#F26A2E]" : "border-[#202124]/30"
          }`}
        >
          {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-[#F26A2E]" />}
        </div>
      </div>
    </label>
  );
}

function RequestInvitePage() {
  const sendInquiry = useServerFn(submitRequestInvite);
  const navigate = useNavigate();
  
  const form = useForm<RequestInviteFormValues>({
    resolver: zodResolver(requestInviteSchema),
    defaultValues: {
      name: "",
      age: undefined,
      gender: undefined,
      profession: "",
      interests: "",
      goaExperience: undefined,
      dateCommitment: undefined,
      tripCostResponse: undefined,
      instagram: "",
      verificationCall: undefined,
      upcomingBatch: undefined,
      whatsappNumber: "",
      emailId: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (values: RequestInviteFormValues) => {
    try {
      await sendInquiry({ data: values });
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      form.setError("root", { message });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#202124] text-[#FFFDF9]">
      <Navbar />
      <main className="flex-1 pt-16 pb-20">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          
          <div className="mb-10">
            <Link
              to="/events/goa-susegad"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#FFFDF9]/70 hover:text-[#F26A2E] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Goa Susegad
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F26A2E]">
              The Susegad Stamp — Goa
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#FFFDF9] leading-tight mb-4">
              Request Your Invite
            </h1>
            <p className="text-base md:text-lg text-[#FFFDF9]/70 leading-relaxed max-w-xl mx-auto">
              Tell us a little about yourself. We’ll review your application and get back to you.
            </p>
          </motion.div>

          <div className="rounded-[28px] border border-[#FFFDF9]/10 bg-[#FFFDF9] p-6 md:p-12 shadow-2xl shadow-black/10 text-[#202124]">
            {!isSuccess ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10" noValidate>
                  
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-bold text-lg">1. What do we call you? <span className="text-[#F26A2E]">*</span></FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your name"
                            aria-invalid={Boolean(form.formState.errors.name)}
                            className="h-14 rounded-xl border-[#202124]/20 bg-white text-[#202124] placeholder:text-[#202124]/40 focus-visible:ring-[#F26A2E] text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  {/* Age and Gender */}
                  <div className="grid gap-10 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#202124] font-bold text-lg">2. How old are you? <span className="text-[#F26A2E]">*</span></FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Your age"
                              min={18}
                              max={100}
                              aria-invalid={Boolean(form.formState.errors.age)}
                              value={field.value !== undefined && !isNaN(field.value) ? field.value : ""}
                              onChange={(e) => {
                                const val = e.target.value === "" ? undefined : Number(e.target.value);
                                field.onChange(val);
                              }}
                              className="h-14 rounded-xl border-[#202124]/20 bg-white text-[#202124] placeholder:text-[#202124]/40 focus-visible:ring-[#F26A2E] text-base"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#202124] font-bold text-lg">3. Gender <span className="text-[#F26A2E]">*</span></FormLabel>
                          <div className="grid grid-cols-2 gap-3">
                            {genderOptions.map((opt) => (
                              <RadioCard
                                key={opt}
                                name="gender"
                                value={opt}
                                selectedValue={field.value}
                                onChange={field.onChange}
                              >
                                {opt}
                              </RadioCard>
                            ))}
                          </div>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Profession */}
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-bold text-lg">4. What do you do? <span className="text-[#F26A2E]">*</span></FormLabel>
                        <p className="text-sm text-[#202124]/60 mb-3">Your Profession</p>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your Profession"
                            aria-invalid={Boolean(form.formState.errors.profession)}
                            className="h-14 rounded-xl border-[#202124]/20 bg-white text-[#202124] placeholder:text-[#202124]/40 focus-visible:ring-[#F26A2E] text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  {/* Interests */}
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-bold text-lg">5. What are you into outside of your work? <span className="text-[#F26A2E]">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Tell us what you enjoy outside of work..."
                            className="min-h-[140px] rounded-xl border-[#202124]/20 bg-white text-[#202124] placeholder:text-[#202124]/40 focus-visible:ring-[#F26A2E] text-base resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  {/* Goa Experience */}
                  <FormField
                    control={form.control}
                    name="goaExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-bold text-lg">6. What’s your experience with Goa off-beat experiences? <span className="text-[#F26A2E]">*</span></FormLabel>
                        <div className="grid gap-3 sm:grid-cols-2 mt-3">
                          {goaExperienceOptions.map((opt) => (
                            <RadioCard
                              key={opt}
                              name="goaExperience"
                              value={opt}
                              selectedValue={field.value}
                              onChange={field.onChange}
                            >
                              {opt}
                            </RadioCard>
                          ))}
                        </div>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  {/* Date Commitment */}
                  <FormField
                    control={form.control}
                    name="dateCommitment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-bold text-lg">7. The date you picked — How locked in are you? <span className="text-[#F26A2E]">*</span></FormLabel>
                        <p className="text-sm text-[#202124]/60 mb-3">Be real, it saves us both an awkward call later.</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {dateCommitmentOptions.map((opt) => (
                            <RadioCard
                              key={opt}
                              name="dateCommitment"
                              value={opt}
                              selectedValue={field.value}
                              onChange={field.onChange}
                            >
                              {opt}
                            </RadioCard>
                          ))}
                        </div>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  {/* Trip Cost Response */}
                  <FormField
                    control={form.control}
                    name="tripCostResponse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-bold text-lg">8. Trip Cost — ₹22,999 <span className="text-[#F26A2E]">*</span></FormLabel>
                        <p className="text-sm text-[#202124]/60 mb-3">Includes everything mentioned.</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {tripCostOptions.map((opt) => (
                            <RadioCard
                              key={opt}
                              name="tripCostResponse"
                              value={opt}
                              selectedValue={field.value}
                              onChange={field.onChange}
                            >
                              {opt}
                            </RadioCard>
                          ))}
                        </div>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  {/* Instagram Profile */}
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-bold text-lg">9. Your Instagram Profile <span className="text-[#F26A2E]">*</span></FormLabel>
                        <p className="text-sm text-[#202124]/60 mb-3">Apply for your Community Passport for verification.</p>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="@username or https://instagram.com/..."
                            aria-invalid={Boolean(form.formState.errors.instagram)}
                            className="h-14 rounded-xl border-[#202124]/20 bg-white text-[#202124] placeholder:text-[#202124]/40 focus-visible:ring-[#F26A2E] text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  {/* Verification Call */}
                  <FormField
                    control={form.control}
                    name="verificationCall"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-bold text-lg">10. If your application gets shortlisted, are you okay to join a 1–2 min verification call? <span className="text-[#F26A2E]">*</span></FormLabel>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {verificationCallOptions.map((opt) => (
                            <RadioCard
                              key={opt}
                              name="verificationCall"
                              value={opt}
                              selectedValue={field.value}
                              onChange={field.onChange}
                            >
                              {opt}
                            </RadioCard>
                          ))}
                        </div>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  {/* Upcoming Batch */}
                  <FormField
                    control={form.control}
                    name="upcomingBatch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-bold text-lg">11. Upcoming Batches <span className="text-[#F26A2E]">*</span></FormLabel>
                        <div className="grid gap-3 sm:grid-cols-3 mt-3">
                          {upcomingBatchOptions.map((opt) => (
                            <RadioCard
                              key={opt}
                              name="upcomingBatch"
                              value={opt}
                              selectedValue={field.value}
                              onChange={field.onChange}
                            >
                              {opt}
                            </RadioCard>
                          ))}
                        </div>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-10 md:grid-cols-2">
                    {/* WhatsApp */}
                    <FormField
                      control={form.control}
                      name="whatsappNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#202124] font-bold text-lg">12. What’s your WhatsApp Number? <span className="text-[#F26A2E]">*</span></FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              aria-invalid={Boolean(form.formState.errors.whatsappNumber)}
                              className="h-14 rounded-xl border-[#202124]/20 bg-white text-[#202124] placeholder:text-[#202124]/40 focus-visible:ring-[#F26A2E] text-base"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="emailId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#202124] font-bold text-lg">13. Your Email ID <span className="text-[#F26A2E]">*</span></FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="you@example.com"
                              aria-invalid={Boolean(form.formState.errors.emailId)}
                              className="h-14 rounded-xl border-[#202124]/20 bg-white text-[#202124] placeholder:text-[#202124]/40 focus-visible:ring-[#F26A2E] text-base"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Root Error */}
                  {form.formState.errors.root && (
                    <div className="rounded-xl border border-[#F26A2E]/25 bg-[#F26A2E]/10 px-4 py-4 text-sm text-[#202124]">
                      {form.formState.errors.root.message}
                    </div>
                  )}

                  {/* Submit CTA */}
                  <div className="pt-6 border-t border-[#202124]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <Button
                      type="submit"
                      className="h-16 w-full md:w-auto md:px-12 rounded-full bg-[#F26A2E] text-white font-bold tracking-widest uppercase hover:-translate-y-1 hover:shadow-lg hover:shadow-[#F26A2E]/20 hover:bg-[#E95B1F] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 transition-all text-sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit My Application"}
                    </Button>
                    <p className="text-xs text-[#202124]/60 font-sans">
                      By submitting, you acknowledge our{" "}
                      <Link
                        to="/refund-policy"
                        target="_blank"
                        className="text-[#F26A2E] underline hover:text-[#E95B1F] font-medium transition-colors"
                      >
                        Refund Policy
                      </Link>
                      .
                    </p>
                  </div>
                </form>
              </Form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#F26A2E]/10 border border-[#F26A2E]/30">
                  <CheckCircle2 className="h-12 w-12 text-[#F26A2E]" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#202124] mb-4">Application Received ✓</h2>
                <p className="max-w-lg text-[#202124]/70 leading-relaxed text-base md:text-lg mb-10">
                  Thanks for applying for The Susegad Stamp — Goa. We’ve received your application and will review it shortly.
                </p>
                <Button
                  onClick={() => navigate({ to: "/events/goa-susegad" })}
                  className="h-14 px-8 rounded-full bg-[#F26A2E] text-white font-bold tracking-widest uppercase hover:bg-[#E95B1F] transition-all text-sm"
                >
                  Back to Goa Susegad
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
