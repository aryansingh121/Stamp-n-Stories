import { Navbar } from "@/landing/components/layout/Navbar";
import { Footer } from "@/landing/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export function RefundPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0B] text-[#F7F5F0]">
      <Navbar />

      <main className="flex-1 pt-28 pb-32">
        <div className="container mx-auto max-w-5xl px-6 md:px-12">
          {/* Breadcrumb / Back Link */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#7E7465] hover:text-[#C59B58] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to home
            </Link>
          </div>

          {/* SECTION 01: HOW IT WORKS & CANCELLATION POLICY */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 md:mb-20"
          >
            <h1 className="font-serif italic font-normal text-5xl sm:text-6xl md:text-7xl text-[#F7F5F0] tracking-tight leading-none mb-3">
              How It Works
            </h1>
            <p className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#7E7465] font-semibold mb-12">
              BOOKING AMOUNT &nbsp;·&nbsp; ADJUSTED AGAINST TOTAL TRIP COST
            </p>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Information Bullets */}
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59B58] shrink-0 mt-2.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-[#E6E4DD] font-sans mb-1.5">
                      You pay ₹2,500
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#9E988F] font-sans leading-relaxed">
                      This confirms your seat. The amount is adjusted against the total trip price — you're not paying extra.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59B58] shrink-0 mt-2.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-[#E6E4DD] font-sans mb-1.5">
                      First come, first serve
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#9E988F] font-sans leading-relaxed">
                      You are already shortlisted, hence instant seat confirmation right after the advance payment is received.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59B58] shrink-0 mt-2.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-[#E6E4DD] font-sans mb-1.5">
                      Counts toward the full trip cost
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#9E988F] font-sans leading-relaxed">
                      This isn't an extra charge. ₹2,500 is adjusted against the total amount — you're not paying twice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59B58] shrink-0 mt-2.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-[#E6E4DD] font-sans mb-1.5">
                      Secure payment via Razorpay
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#9E988F] font-sans leading-relaxed">
                      UPI · Cards · Net Banking. All accepted. Always save your payment confirmation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Cancellation Policy Card */}
              <div className="lg:col-span-5">
                <div className="border border-[#26211A] bg-[#11100E] rounded-[16px] overflow-hidden shadow-2xl divide-y divide-[#26211A]">
                  {/* Header */}
                  <div className="px-6 sm:px-7 py-4 sm:py-5">
                    <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7740] font-normal">
                      CANCELLATION POLICY
                    </p>
                  </div>

                  {/* Row 1 */}
                  <div className="px-6 sm:px-7 py-4 sm:py-5 flex justify-between items-center text-[14px] sm:text-[15px] gap-4">
                    <span className="font-sans text-[#9A9388]">Cancel 15 days before trip</span>
                    <span className="font-mono text-[14px] sm:text-[15px] text-[#2EE59D] font-normal whitespace-nowrap">
                      100% refund
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="px-6 sm:px-7 py-4 sm:py-5 flex justify-between items-center text-[14px] sm:text-[15px] gap-4">
                    <span className="font-sans text-[#9A9388]">Cancel 7 days before trip</span>
                    <span className="font-mono text-[14px] sm:text-[15px] text-[#554F46] font-normal whitespace-nowrap">
                      No refund
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="px-6 sm:px-7 py-4 sm:py-5 flex justify-between items-center text-[14px] sm:text-[15px] gap-4">
                    <span className="font-sans text-[#9A9388]">No show on the trip</span>
                    <span className="font-mono text-[14px] sm:text-[15px] text-[#554F46] font-normal whitespace-nowrap">
                      No refund
                    </span>
                  </div>

                  {/* Row 4 */}
                  <div className="px-6 sm:px-7 py-4 sm:py-5 flex justify-between items-center text-[14px] sm:text-[15px] gap-4">
                    <span className="font-sans text-[#9A9388]">Stamp n Stories cancels the trip</span>
                    <span className="font-mono text-[14px] sm:text-[15px] text-[#2EE59D] font-normal whitespace-nowrap">
                      100% refund
                    </span>
                  </div>

                  {/* Row 5 */}
                  <div className="px-6 sm:px-7 py-4 sm:py-5 flex justify-between items-center text-[14px] sm:text-[15px] gap-4">
                    <span className="font-sans text-[#9A9388]">Seat confirmed on payment ✓</span>
                    <span className="font-mono text-[14px] sm:text-[15px] text-[#C59B58] font-normal whitespace-nowrap">
                      Instant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* NUMBERED POLICY CLAUSES: 1.1 TO 1.5 */}
          <section className="mb-24 space-y-8 sm:space-y-10">
            <div className="flex items-start gap-4 sm:gap-6">
              <span className="font-mono text-xs sm:text-sm text-[#5C564B] shrink-0 pt-0.5 w-7 text-left">
                1.1
              </span>
              <p className="text-sm sm:text-[15px] text-[#CFCBC2] font-sans leading-relaxed">
                Refunds are only issued when <strong className="font-semibold text-[#F5F3ED]">Stamp n Stories cancels the trip</strong> — whether due to insufficient registrations, force majeure, or any other reason initiated by <strong className="font-semibold text-[#F5F3ED]">Stamp n Stories</strong>. In this case, 100% of the total amount paid will be refunded.
              </p>
            </div>

            <div className="flex items-start gap-4 sm:gap-6">
              <span className="font-mono text-xs sm:text-sm text-[#5C564B] shrink-0 pt-0.5 w-7 text-left">
                1.2
              </span>
              <p className="text-sm sm:text-[15px] text-[#CFCBC2] font-sans leading-relaxed">
                If <strong className="font-semibold text-[#F5F3ED]">Stamp n Stories</strong> cancels a trip due to <strong className="font-semibold text-[#F5F3ED]">force majeure</strong> (natural disasters, government orders, extreme weather, political unrest, or any event beyond reasonable control), travelers will receive a full refund or the option to transfer to a future batch. No additional compensation will be provided.
              </p>
            </div>

            <div className="flex items-start gap-4 sm:gap-6">
              <span className="font-mono text-xs sm:text-sm text-[#5C564B] shrink-0 pt-0.5 w-7 text-left">
                1.3
              </span>
              <p className="text-sm sm:text-[15px] text-[#CFCBC2] font-sans leading-relaxed">
                Traveler-initiated cancellations are <strong className="font-semibold text-[#F5F3ED]">not eligible for any refund</strong>, regardless of the reason or the notice period. We encourage you to plan carefully before confirming your booking.
              </p>
            </div>

            <div className="flex items-start gap-4 sm:gap-6">
              <span className="font-mono text-xs sm:text-sm text-[#5C564B] shrink-0 pt-0.5 w-7 text-left">
                1.4
              </span>
              <p className="text-sm sm:text-[15px] text-[#CFCBC2] font-sans leading-relaxed">
                Booking transfers to another person are <strong className="font-semibold text-[#F5F3ED]">not permitted</strong>. Your seat is personal and non-transferable. Only the name confirmed at booking may travel.
              </p>
            </div>

            <div className="flex items-start gap-4 sm:gap-6">
              <span className="font-mono text-xs sm:text-sm text-[#5C564B] shrink-0 pt-0.5 w-7 text-left">
                1.5
              </span>
              <p className="text-sm sm:text-[15px] text-[#CFCBC2] font-sans leading-relaxed">
                No refund will be issued for any included service not availed by the traveler — including meals, activities, accommodation, or transport — <strong className="font-semibold text-[#F5F3ED]">once the trip has commenced</strong>.
              </p>
            </div>
          </section>

          {/* SECTION 02: PROCESS & TIMELINE */}
          <section className="mb-20">
            {/* Section number marker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#5C564B] text-sm">—</span>
              <span className="font-mono text-xs text-[#8C7A5A] tracking-wider">02</span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl font-normal text-[#F7F5F0] mb-12 tracking-tight">
              <span className="italic">Process &amp; </span>
              <span className="italic text-[#C59B58]">Timeline</span>
            </h2>

            <div className="space-y-8 sm:space-y-10">
              <div className="flex items-start gap-4 sm:gap-6">
                <span className="font-mono text-xs sm:text-sm text-[#5C564B] shrink-0 pt-0.5 w-7 text-left">
                  2.1
                </span>
                <p className="text-sm sm:text-[15px] text-[#CFCBC2] font-sans leading-relaxed">
                  In the event of a company-initiated cancellation, <strong className="font-semibold text-[#F5F3ED]">Stamp n Stories</strong> will <strong className="font-semibold text-[#F5F3ED]">notify all confirmed travelers via WhatsApp and email</strong> as soon as the decision is made.
                </p>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <span className="font-mono text-xs sm:text-sm text-[#5C564B] shrink-0 pt-0.5 w-7 text-left">
                  2.2
                </span>
                <p className="text-sm sm:text-[15px] text-[#CFCBC2] font-sans leading-relaxed">
                  Approved refunds are processed within <strong className="font-semibold text-[#F5F3ED]">5–7 working days</strong> to the original payment method. Bank transfer refunds may take an additional 2–3 business days depending on your bank.
                </p>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <span className="font-mono text-xs sm:text-sm text-[#5C564B] shrink-0 pt-0.5 w-7 text-left">
                  2.3
                </span>
                <p className="text-sm sm:text-[15px] text-[#CFCBC2] font-sans leading-relaxed">
                  To request a refund (applicable only in company-cancellation scenarios), contact us at{" "}
                  <a
                    href="mailto:yashtiwariworking@gmail.com"
                    className="text-[#C59B58] hover:underline transition-colors font-medium"
                  >
                    yashtiwariworking@gmail.com
                  </a>{" "}
                  or WhatsApp us at{" "}
                  <a
                    href="https://wa.me/918789582497"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C59B58] hover:underline transition-colors font-medium"
                  >
                    878-9582497
                  </a>{" "}
                  with your name, booking details, and payment receipt.
                </p>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <span className="font-mono text-xs sm:text-sm text-[#5C564B] shrink-0 pt-0.5 w-7 text-left">
                  2.4
                </span>
                <p className="text-sm sm:text-[15px] text-[#CFCBC2] font-sans leading-relaxed">
                  Refunds are always issued to the <strong className="font-semibold text-[#F5F3ED]">original payment method</strong>. We do not issue refunds to a different UPI, account, or person than who made the payment.
                </p>
              </div>
            </div>

            {/* Payment Proof Callout */}
            <div className="border border-[#262420] bg-[#12110F] rounded-xl p-6 md:p-8 mt-14">
              <p className="text-sm sm:text-[15px] text-[#8E8A82] font-sans leading-relaxed">
                <strong className="font-bold text-[#F7F5F0]">Payment proof matters.</strong>{" "}
                Always retain your Razorpay receipt, UPI screenshot, or bank transfer confirmation. Refunds cannot be processed without verified payment records.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
