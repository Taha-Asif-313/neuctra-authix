import React from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const RefundPolicy = () => {
  return (
    <section className="min-h-screen bg-black text-gray-300 px-6 py-24 relative overflow-hidden">
      {/* Neon background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00c420]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00c420]/10 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00c420]/10 border border-[#00c420]/20 rounded-full text-[#00c420]"
          >
            <FileText className="w-4 h-4" />
            <span>Refund Policy</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Refund Policy
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Understand how refunds are handled on Neuctra services.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10 text-gray-400">
          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">1. Eligibility for Refunds</h2>
            <p>
              Refunds are only considered within 14 days of purchase and only if the service was not used as described or failed to meet the promised features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">2. Non-Refundable Cases</h2>
            <p>
              Refunds will not be issued for voluntary cancellations, partial usage of services, or failure to read the plan details before purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">3. Requesting a Refund</h2>
            <p>
              To request a refund, please contact our support team at support@neuctra.com with your purchase details and reason. Refund requests may take up to 7 business days to process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">4. Payment Method</h2>
            <p>
              Approved refunds will be issued to the original payment method used during purchase. We cannot transfer refunds to alternative payment accounts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">5. Changes to Refund Policy</h2>
            <p>
              Neuctra reserves the right to update this Refund Policy at any time. Continued use of our services after updates indicates acceptance of the revised policy.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default RefundPolicy;