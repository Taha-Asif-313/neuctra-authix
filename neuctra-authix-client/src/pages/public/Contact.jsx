import React, { useState } from "react";
import {
  Mail,
  Send,
  User,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (demo only)");
  };

  return (
    <section className="relative min-h-screen bg-black text-gray-300 px-4 sm:px-6 py-20 sm:py-28 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#00c420]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#00c420]/10 blur-3xl rounded-full" />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-2 rounded-full bg-[#00c420]/10 border border-[#00c420]/20 text-[#00c420] text-sm font-semibold">
            <Mail className="w-4 h-4" />
            Contact Us
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Let’s talk
          </h1>

          <p className="text-gray-400 mb-10 sm:mb-12 max-w-xl mx-auto">
            Questions, feedback, or partnerships?  
            Send us a message and we’ll get back to you.
          </p>
        </motion.div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className=" p-3 sm:p-8 space-y-6 text-left max-w-2xl mx-auto"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00c420] focus:ring-1 focus:ring-[#00c420]/40 outline-none transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00c420] focus:ring-1 focus:ring-[#00c420]/40 outline-none transition"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Message
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-4 w-4 h-4 text-gray-500" />
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell us how we can help…"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00c420] focus:ring-1 focus:ring-[#00c420]/40 outline-none transition resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition"
          >
            <Send className="w-4 h-4" />
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
