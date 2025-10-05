import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (demo only)");
  };

  return (
    <section className="min-h-screen bg-black text-gray-300 px-6 py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00c420]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00c420]/10 blur-3xl rounded-full" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#00c420]/10 border border-[#00c420]/20 text-[#00c420] text-sm font-semibold">
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            We’d love to hear from you
          </h1>
          <p className="text-gray-400 mb-12">
            Have questions, feedback, or partnership ideas? Drop us a message below.
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 space-y-6 text-left max-w-2xl mx-auto"
        >
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-[#00c420] outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-[#00c420] outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-[#00c420] outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center gap-2 bg-[#00c420] text-black font-semibold rounded-lg hover:opacity-90 transition"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
