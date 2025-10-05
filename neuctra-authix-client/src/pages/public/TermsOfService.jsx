import React from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <section className="min-h-screen bg-black text-gray-300 px-6 py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00c420]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00c420]/10 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00c420]/10 border border-[#00c420]/20 rounded-full text-[#00c420]"
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Please read these terms carefully before using Neuctra Authix.
          </p>
        </div>

        <div className="space-y-10 text-gray-400">
          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing our services, you agree to comply with these terms. If you disagree, do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">2. Use of Service</h2>
            <p>
              You agree not to misuse the service or attempt unauthorized access. Any violations may result in suspension.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">3. Intellectual Property</h2>
            <p>
              All trademarks, logos, and content belong to Neuctra. You may not copy or redistribute them without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">4. Limitation of Liability</h2>
            <p>
              We are not responsible for any damages or data loss arising from the use of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">5. Changes to Terms</h2>
            <p>
              We may update these terms periodically. Continued use indicates acceptance of any changes.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
