import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { z } from "zod";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { Button } from "@/landing/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/landing/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/landing/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/landing/components/ui/select";
import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import {
  partnerInquirySchema,
  partnershipTypeOptions,
  sanitizeOptional,
  validateWebsite,
} from "@/lib/partner-inquiry";

type PartnerInquiryFormValues = z.infer<typeof partnerInquirySchema>;

const submitPartnerInquiry = createServerFn({ method: "POST" })
  .validator(partnerInquirySchema)
  .handler(async ({ data }) => {
    const { sendPartnerInquiryEmail } = await import("@/lib/partner-inquiry.server");
    const normalizedData = {
      ...data,
      fullName: data.fullName.trim(),
      workEmail: data.workEmail.trim(),
      phoneNumber: sanitizeOptional(data.phoneNumber),
      organizationName: data.organizationName.trim(),
      role: data.role.trim(),
      partnershipType: data.partnershipType.trim(),
      website: sanitizeOptional(data.website),
      city: data.city.trim(),
      partnershipIdea: data.partnershipIdea.trim(),
      additionalInfo: sanitizeOptional(data.additionalInfo),
    };

    if (!normalizedData.fullName) {
      throw new Error("Please enter your full name.");
    }
    if (!normalizedData.workEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedData.workEmail)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!normalizedData.organizationName) {
      throw new Error("Please enter your organisation or company name.");
    }
    if (!normalizedData.role) {
      throw new Error("Please enter your role or designation.");
    }
    if (!normalizedData.city) {
      throw new Error("Please enter your city or location.");
    }
    if (!normalizedData.partnershipIdea) {
      throw new Error("Please tell us a little about your partnership idea.");
    }
    if (
      normalizedData.partnershipType &&
      !partnershipTypeOptions.includes(
        normalizedData.partnershipType as (typeof partnershipTypeOptions)[number],
      )
    ) {
      throw new Error("Please select a partnership type.");
    }
    if (normalizedData.website && !validateWebsite(normalizedData.website)) {
      throw new Error("Please enter a valid website or social profile URL.");
    }
    if (normalizedData.phoneNumber && normalizedData.phoneNumber.length > 30) {
      throw new Error("Please enter a valid phone number.");
    }
    if (normalizedData.additionalInfo && normalizedData.additionalInfo.length > 4000) {
      throw new Error("Additional information is too long.");
    }

    await sendPartnerInquiryEmail(normalizedData);
    return { success: true };
  });

export const Route = createFileRoute("/partner")({
  component: PartnerPage,
});

function PartnerPage() {
  const sendInquiry = useServerFn(submitPartnerInquiry);
  const form = useForm<PartnerInquiryFormValues>({
    resolver: zodResolver(partnerInquirySchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      phoneNumber: "",
      organizationName: "",
      role: "",
      partnershipType: "",
      website: "",
      city: "",
      partnershipIdea: "",
      additionalInfo: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (values: PartnerInquiryFormValues) => {
    try {
      await sendInquiry({ data: values });
      setIsSuccess(true);
      form.reset({
        fullName: "",
        workEmail: "",
        phoneNumber: "",
        organizationName: "",
        role: "",
        partnershipType: "",
        website: "",
        city: "",
        partnershipIdea: "",
        additionalInfo: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      form.setError("root", { message });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#202124] text-[#FFFDF9]">
      <Navbar />
      <main className="flex-1 pt-20 pb-20">
        <div className="container mx-auto max-w-5xl px-6 md:px-12">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#FFFDF9]/70 hover:text-[#F26A2E] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#F26A2E]">Partnerships</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#FFFDF9] leading-tight">
              Partner With Stamp ’N’ Stories
            </h1>
            <p className="mt-5 text-base md:text-lg text-[#FFFDF9]/70 leading-relaxed">
              Tell us a little about your organisation and how you’d like to collaborate with us. We’ll review your idea and get back to you.
            </p>
          </motion.div>

          <div className="mt-10 rounded-[28px] border border-[#FFFDF9]/10 bg-[#FFFDF9] p-6 md:p-10 shadow-2xl shadow-black/10">
            {!isSuccess ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-[#202124] font-semibold">Full Name <span className="text-[#F26A2E]">*</span></FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your full name"
                              aria-invalid={Boolean(form.formState.errors.fullName)}
                              className="h-12 rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] placeholder:text-[#202124]/45 focus-visible:ring-[#F26A2E]"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workEmail"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-[#202124] font-semibold">Work Email <span className="text-[#F26A2E]">*</span></FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="you@company.com"
                              aria-invalid={Boolean(form.formState.errors.workEmail)}
                              className="h-12 rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] placeholder:text-[#202124]/45 focus-visible:ring-[#F26A2E]"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-[#202124] font-semibold">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              aria-invalid={Boolean(form.formState.errors.phoneNumber)}
                              className="h-12 rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] placeholder:text-[#202124]/45 focus-visible:ring-[#F26A2E]"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-[#202124] font-semibold">Organisation / Company Name <span className="text-[#F26A2E]">*</span></FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Company or organisation name"
                              aria-invalid={Boolean(form.formState.errors.organizationName)}
                              className="h-12 rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] placeholder:text-[#202124]/45 focus-visible:ring-[#F26A2E]"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-[#202124] font-semibold">Your Role / Designation <span className="text-[#F26A2E]">*</span></FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Founder, Marketing Manager, Partnerships Lead, etc."
                              aria-invalid={Boolean(form.formState.errors.role)}
                              className="h-12 rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] placeholder:text-[#202124]/45 focus-visible:ring-[#F26A2E]"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="partnershipType"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-[#202124] font-semibold">Partnership Type <span className="text-[#F26A2E]">*</span></FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] focus:ring-[#F26A2E]">
                                <SelectValue placeholder="Select partnership type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#FFFDF9] text-[#202124] border-[#202124]/10">
                              {partnershipTypeOptions.map((option) => (
                                <SelectItem key={option} value={option} className="focus:bg-[#F6F0E6]">
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-[#202124] font-semibold">Website / Social Media</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="url"
                              placeholder="https://..."
                              aria-invalid={Boolean(form.formState.errors.website)}
                              className="h-12 rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] placeholder:text-[#202124]/45 focus-visible:ring-[#F26A2E]"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-[#202124] font-semibold">City / Location <span className="text-[#F26A2E]">*</span></FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Mumbai, Delhi, Goa, etc."
                              aria-invalid={Boolean(form.formState.errors.city)}
                              className="h-12 rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] placeholder:text-[#202124]/45 focus-visible:ring-[#F26A2E]"
                            />
                          </FormControl>
                          <FormMessage className="text-[#F26A2E]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="partnershipIdea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-semibold">Tell us about the partnership <span className="text-[#F26A2E]">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Tell us what you have in mind, what you offer, and how you see us working together."
                            className="min-h-[140px] rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] placeholder:text-[#202124]/45 focus-visible:ring-[#F26A2E] resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#202124] font-semibold">Anything else?</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Any additional information you'd like us to know."
                            className="min-h-[110px] rounded-xl border-[#202124]/10 bg-[#F6F0E6]/60 text-[#202124] placeholder:text-[#202124]/45 focus-visible:ring-[#F26A2E] resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-[#F26A2E]" />
                      </FormItem>
                    )}
                  />

                  {form.formState.errors.root && (
                    <div className="rounded-xl border border-[#F26A2E]/25 bg-[#F26A2E]/10 px-4 py-3 text-sm text-[#202124]">
                      {form.formState.errors.root.message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="h-14 w-full rounded-full bg-[#F26A2E] text-white hover:bg-[#E95B1F] disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Partnership Inquiry"}
                  </Button>
                </form>
              </Form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F26A2E]/10 border border-[#F26A2E]/30">
                  <CheckCircle2 className="h-10 w-10 text-[#F26A2E]" />
                </div>
                <h2 className="font-serif text-3xl text-[#202124]">Thanks for reaching out.</h2>
                <p className="mt-4 max-w-lg text-[#202124]/70 leading-relaxed">
                  Your partnership inquiry has been received. We’ll review the details and get back to you.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
