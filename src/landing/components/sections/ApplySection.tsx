import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitApplication } from "@/landing/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/landing/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/landing/components/ui/form";
import { Input } from "@/landing/components/ui/input";
import { Textarea } from "@/landing/components/ui/textarea";
import { Checkbox } from "@/landing/components/ui/checkbox";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  age: z.coerce.number().min(18, "You must be at least 18 years old").max(100),
  city: z.string().min(2, "City is required"),
  instagramOrLinkedin: z.string().optional(),
  whyJoin: z.string().min(10, "Please tell us a bit more (min 10 characters)"),
  whatMakesSafe: z.string().min(10, "Please tell us a bit more (min 10 characters)"),
  comfortPreferences: z.string().optional(),
  emergencyContact: z.string().optional(),
  acceptedRules: z.boolean().refine((val) => val === true, {
    message: "You must accept the community rules to apply",
  }),
});

export function ApplySection({ standalone = false }: { standalone?: boolean }) {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      city: "",
      instagramOrLinkedin: "",
      whyJoin: "",
      whatMakesSafe: "",
      comfortPreferences: "",
      emergencyContact: "",
      acceptedRules: false,
    },
  });

  const submitApp = useSubmitApplication();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitApp.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  };

  return (
    <section className={`bg-[#F6F0E6] ${standalone ? "pt-32 pb-24" : "py-24"}`}>
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left info column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <h2 className="text-4xl md:text-5xl font-serif text-[#202124] mb-6 leading-tight">
              Apply for your Community Passport
            </h2>
            <p className="text-lg text-[#202124]/70 mb-8 leading-relaxed font-sans">
              This is not open booking. Apply and tell us why you want to join a
              safer, more meaningful offline community.
            </p>

            <div className="bg-[#FFFDF9] border border-[#202124]/10 p-6 rounded-2xl mb-12 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F26A2E]"></div>
              <p className="text-[#202124] font-medium leading-relaxed font-serif italic text-lg">
                "You can create your passport profile online, but you cannot buy
                the physical passport directly. The physical passport is earned
                by showing up at your first verified StampNStories offline
                experience."
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold uppercase tracking-widest text-xs text-[#202124]/50 mb-4">
                The Process
              </h3>
              {[
                "Create passport profile online",
                "Application reviewed for community fit",
                "Accepted members receive event invite",
                "Member shows up offline",
                "Physical passport is issued",
                "Stamps unlock future access",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#202124] text-[#FFFDF9] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium text-[#202124]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF9] rounded-3xl p-8 md:p-12 shadow-xl border border-[#202124]/5 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 bg-[#F26A2E]/10 rounded-full flex items-center justify-center mb-6 border border-[#F26A2E]/30">
                      <span className="text-[#F26A2E] text-3xl">✓</span>
                    </div>
                    <h3 className="text-3xl font-serif text-[#202124] mb-4">
                      Application Received
                    </h3>
                    <p className="text-[#202124]/70 max-w-md mx-auto leading-relaxed">
                      Thank you for taking the time to apply. We will review
                      your profile carefully and send an invite via email or
                      WhatsApp if it's a good fit for the community.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel className="text-[#202124] font-semibold">Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jane Doe" className="bg-[#F6F0E6]/50 border-[#202124]/10 focus-visible:ring-[#F26A2E]" {...field} />
                                </FormControl>
                                <FormMessage className="text-[#F26A2E]" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel className="text-[#202124] font-semibold">Age *</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="25" className="bg-[#F6F0E6]/50 border-[#202124]/10 focus-visible:ring-[#F26A2E]" {...field} />
                                </FormControl>
                                <FormMessage className="text-[#F26A2E]" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel className="text-[#202124] font-semibold">City *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Mumbai" className="bg-[#F6F0E6]/50 border-[#202124]/10 focus-visible:ring-[#F26A2E]" {...field} />
                                </FormControl>
                                <FormMessage className="text-[#F26A2E]" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="instagramOrLinkedin"
                            render={({ field }) => (
                              <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel className="text-[#202124] font-semibold">Insta/LinkedIn Link</FormLabel>
                                <FormControl>
                                  <Input placeholder="instagram.com/..." className="bg-[#F6F0E6]/50 border-[#202124]/10 focus-visible:ring-[#F26A2E]" {...field} />
                                </FormControl>
                                <FormMessage className="text-[#F26A2E]" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="whyJoin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#202124] font-semibold">Why do you want to join? *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="I'm looking for a space where..."
                                  className="min-h-[100px] bg-[#F6F0E6]/50 border-[#202124]/10 focus-visible:ring-[#F26A2E] resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[#F26A2E]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="whatMakesSafe"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#202124] font-semibold">What makes you feel safe in a group? *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Clear boundaries, smaller group sizes..."
                                  className="min-h-[100px] bg-[#F6F0E6]/50 border-[#202124]/10 focus-visible:ring-[#F26A2E] resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[#F26A2E]" />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="comfortPreferences"
                            render={({ field }) => (
                              <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel className="text-[#202124] font-semibold">Comfort preferences</FormLabel>
                                <FormControl>
                                  <Input placeholder="Dietary, room-sharing, etc." className="bg-[#F6F0E6]/50 border-[#202124]/10 focus-visible:ring-[#F26A2E]" {...field} />
                                </FormControl>
                                <FormMessage className="text-[#F26A2E]" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="emergencyContact"
                            render={({ field }) => (
                              <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel className="text-[#202124] font-semibold">Emergency contact</FormLabel>
                                <FormControl>
                                  <Input placeholder="Name & Number" className="bg-[#F6F0E6]/50 border-[#202124]/10 focus-visible:ring-[#F26A2E]" {...field} />
                                </FormControl>
                                <FormMessage className="text-[#F26A2E]" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="acceptedRules"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-[#202124]/10 rounded-lg bg-[#F6F0E6]/30 mt-6">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-1 border-[#202124]/30 data-[state=checked]:bg-[#F26A2E] data-[state=checked]:border-[#F26A2E]"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-[#202124] font-semibold cursor-pointer">
                                  I accept the community rules
                                </FormLabel>
                                <p className="text-sm text-[#202124]/60">
                                  I understand this is a verified community and poor behaviour has real consequences.
                                </p>
                              </div>
                            </FormItem>
                          )}
                        />

                        {submitApp.isError && (
                          <div className="p-4 rounded-lg bg-[#F26A2E]/10 border border-[#F26A2E]/30 text-[#F26A2E] text-sm">
                            {submitApp.error?.error || "Failed to submit application. Please try again."}
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full h-14 rounded-full bg-[#F26A2E] hover:bg-[#F26A2E]/90 text-white font-bold text-lg tracking-wide shadow-lg mt-8"
                          disabled={submitApp.isPending}
                        >
                          {submitApp.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
