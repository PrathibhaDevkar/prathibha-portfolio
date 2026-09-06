"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:prathibhadevkar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputClass =
    "w-full rounded-md bg-term-panel-2 border border-term-border text-term-text placeholder-term-dim px-4 py-3 text-sm focus:outline-none focus:border-term-accent/60 focus:ring-1 focus:ring-term-accent/30 transition-all font-mono";

  return (
    <section id="contact" className="my-24 scroll-mt-20">
      <SectionHeading command="mail -s 'hello'" title="Get In Touch" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 rounded-xl border border-term-border bg-term-panel p-6 md:p-8">
          <p className="text-term-muted leading-relaxed text-sm">
            I&apos;m currently open to full-time software engineering roles. Whether you have a project in
            mind, a question, or just want to say hi, my inbox is open.
          </p>
          <div className="space-y-3 pt-2">
            <a
              href="mailto:prathibhadevkar@gmail.com"
              className="flex items-center gap-3 text-sm text-term-muted hover:text-term-accent transition-colors group"
            >
              <span className="w-8 h-8 rounded-md bg-term-panel-2 border border-term-border group-hover:border-term-accent/40 flex items-center justify-center transition-colors">
                <MailIcon />
              </span>
              prathibhadevkar@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/prathibha-devkar-3096"
              target="_blank"
              className="flex items-center gap-3 text-sm text-term-muted hover:text-term-accent transition-colors group"
            >
              <span className="w-8 h-8 rounded-md bg-term-panel-2 border border-term-border group-hover:border-term-accent/40 flex items-center justify-center transition-colors">
                <LinkedInIcon />
              </span>
              LinkedIn
            </a>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-xl border border-term-green/30 bg-term-green-dim text-center"
            >
              <div className="text-term-green text-4xl mb-4">✓</div>
              <p className="text-term-text font-semibold mb-1">Message prepared!</p>
              <p className="text-sm text-term-muted">Your mail client should have opened. Thanks for reaching out.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="your_name"
                required
                className={inputClass}
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className={inputClass}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="message.txt"
                required
                rows={5}
                className={`${inputClass} resize-none`}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-term-accent hover:brightness-110 text-black font-bold rounded-md transition-colors"
              >
                ./send --message
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
