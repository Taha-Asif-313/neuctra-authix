import React from "react";
import { Shield, Lock } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen bg-black text-gray-300 px-6 py-24 relative overflow-hidden">
      {/* Glow background */}
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
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Your Privacy Matters
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            We are committed to protecting your personal data and ensuring transparency in how we handle it.
          </p>
        </div>

        <div className="space-y-10 text-gray-400">
          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">1. Information We Collect</h2>
            <p>
              We collect information such as your name, email address, and authentication data to provide our services.
              All data is encrypted and stored securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">2. How We Use Your Information</h2>
            <p>
              We use your data to deliver authentication services, improve security, and provide a seamless experience.
              Your data is never sold or shared with third parties without consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">3. Data Security</h2>
            <p>
              Our infrastructure uses end-to-end encryption, secure tokens, and regular audits to protect your privacy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">4. Your Rights</h2>
            <p>
              You can request access, updates, or deletion of your personal data at any time by contacting our support team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00c420] mb-3">5. Contact Us</h2>
            <p>
              For any privacy-related concerns, please reach out at{" "}
              <a href="mailto:privacy@neuctra.com" className="text-[#00c420] hover:underline">
                privacy@neuctra.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
