"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { contactLinks } from "../data/contact";
import { CheckIcon, CopyIcon, LinkedInIcon, MailIcon, GitHubIcon } from "./ui/icons";
import Magnetic from "./ui/Magnetic";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:${contactLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactLinks.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contactLinks.email}`;
    }
  };

  const field = (name: keyof FormState, label: string, type = "text") => (
    <label className="group relative block">
      {type === "textarea" ? (
        <textarea
          name={name}
          value={form[name]}
          onChange={handleChange}
          required
          rows={5}
          placeholder=" "
          className="peer w-full resize-none rounded-2xl border border-line bg-white/[0.02] px-5 pb-3 pt-7 text-fg transition-colors focus:border-violet/60 focus:bg-violet/[0.04] focus:outline-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={form[name]}
          onChange={handleChange}
          required
          placeholder=" "
          className="peer w-full rounded-2xl border border-line bg-white/[0.02] px-5 pb-3 pt-7 text-fg transition-colors focus:border-violet/60 focus:bg-violet/[0.04] focus:outline-none"
        />
      )}
      {/* floating label: sits inside the field until it's focused or filled */}
      <span className="pointer-events-none absolute left-5 top-5 text-sm text-dim transition-all peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-violet peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]">
        {label}
      </span>
    </label>
  );

  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32">
      <SectionHeading index="06" eyebrow="Contact" title="Let's build" accent="something." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-lg leading-relaxed text-muted mb-10 max-w-md">
            I&apos;m open to full-time software engineering roles. Whether you have a role, a project, or just
            want to say hi, my inbox is open.
          </p>

          <button
            onClick={copyEmail}
            className="group mb-8 flex w-full max-w-md items-center justify-between gap-4 rounded-2xl border border-line bg-surface/80 px-5 py-4 text-left transition-colors hover:border-line-strong"
          >
            <span className="flex items-center gap-3 min-w-0">
              <MailIcon className="w-5 h-5 shrink-0 text-cyan" />
              <span className="truncate font-mono text-sm text-fg">{contactLinks.email}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-xs text-dim group-hover:text-fg">
              {copied ? <CheckIcon className="w-4 h-4 text-mint" /> : <CopyIcon className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </span>
          </button>

          <div className="flex gap-3">
            <Magnetic>
              <a
                href={contactLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-12 w-12 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={contactLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-12 w-12 place-items-center rounded-full border border-line text-muted transition-colors hover:border-violet/50 hover:text-violet"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
            </Magnetic>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-mint/30 bg-mint/[0.06] p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-mint text-ink"
              >
                <CheckIcon className="w-7 h-7" />
              </motion.div>
              <p className="font-display text-xl font-semibold text-fg mb-1">Message prepared!</p>
              <p className="text-sm text-muted">Your mail client should have opened. Thanks for reaching out.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-xs text-dim underline underline-offset-4 hover:text-fg">
                Write another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 rounded-3xl border border-line bg-surface/80 p-6 md:p-8"
            >
              {field("name", "Your name")}
              {field("email", "Your email", "email")}
              {field("message", "What's on your mind?", "textarea")}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet via-cyan to-amber py-4 font-semibold text-ink"
              >
                Send message
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
