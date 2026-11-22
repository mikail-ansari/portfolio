import { useState } from "react";
import { m } from "framer-motion";
import { ArrowUpRight, Check, CircleAlert, Download, Mail, Send } from "lucide-react";
import { site } from "../config/site.js";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";
import { resumeHref } from "./Hero.jsx";
import Magnetic from "./Magnetic.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Terminal from "./Terminal.jsx";

const { email, formspreeId } = site.contact;
const field = "mt-2 w-full rounded-2xl border border-line bg-fg/[0.04] px-5 py-3.5 text-[15px] text-fg placeholder:text-muted/60 transition-colors focus:border-lime focus:outline-none";

/**
 * Form modes (picked automatically from the config):
 *  1. formspreeId set -> posts to Formspree (free plan has a monthly submission cap)
 *  2. only email set  -> opens the visitor's email app, message pre-filled (mailto)
 *  3. neither         -> form disabled with a note pointing to LinkedIn
 */
const mode = formspreeId ? "formspree" : email ? "mailto" : "none";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot
    if (mode === "mailto") {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n- ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const disabled = mode === "none";
  const link = "group flex items-center justify-between gap-4 border-b border-line py-5 transition-colors hover:border-lime";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative px-5 pb-16 pt-24 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="contact-title" index="06" eyebrow="Contact" title="Let's" outlineWord="connect" />
        <p className="-mt-6 mb-14 max-w-2xl text-lg text-muted sm:-mt-8">Open to IT and systems roles, production and operations technology, frontend and web development, and freelance projects. Say hello through the form, the terminal or LinkedIn.</p>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* left: links + terminal */}
          <div className="space-y-8 lg:col-span-6">
            <ul>
              {email && (
                <li>
                  <a href={`mailto:${email}`} className={link}>
                    <span className="flex items-center gap-4">
                      <Mail size={20} className="text-limetext" aria-hidden="true" />
                      <span className="break-all text-lg font-semibold">{email}</span>
                    </span>
                    <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </li>
              )}
              <li>
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                  <span className="flex items-center gap-4">
                    <LinkedinIcon className="h-5 w-5 text-limetext" />
                    <span className="text-lg font-semibold">LinkedIn</span>
                  </span>
                  <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              {site.social.github && (
                <li>
                  <a href={site.social.github} target="_blank" rel="noopener noreferrer" className={link}>
                    <span className="flex items-center gap-4">
                      <GithubIcon className="h-5 w-5 text-limetext" />
                      <span className="text-lg font-semibold">GitHub</span>
                    </span>
                    <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              )}
              <li>
                <a href={resumeHref} download={site.resume.downloadName} className={link}>
                  <span className="flex items-center gap-4">
                    <Download size={20} className="text-limetext" aria-hidden="true" />
                    <span className="text-lg font-semibold">Download resume</span>
                  </span>
                  <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </li>
            </ul>

            <div>
              <p className="eyebrow mb-3">Prefer the command line?</p>
              <Terminal />
            </div>
          </div>

          {/* right: form */}
          <m.form initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} onSubmit={onSubmit} aria-describedby="form-note" className="rounded-[2rem] border border-line p-6 sm:p-10 lg:col-span-6" style={{ background: "linear-gradient(160deg, color-mix(in srgb, var(--violet) 16%, transparent), transparent 55%)" }}>
            <h3 className="display text-3xl text-fg">Send a message</h3>
            <fieldset disabled={disabled || status === "sending"} className="mt-8 space-y-5 border-0 p-0 disabled:opacity-60">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm text-muted">
                  Name
                  <input name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
                </label>
                <label className="block text-sm text-muted">
                  Email
                  <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
                </label>
              </div>
              <div className="hidden" aria-hidden="true">
                <label>
                  Company
                  <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <label className="block text-sm text-muted">
                Message
                <textarea name="message" required rows={6} className={`${field} resize-y`} placeholder="How can I help?" />
              </label>
              <Magnetic>
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 text-sm font-bold uppercase tracking-wide text-onlime transition-shadow hover:shadow-[0_0_40px_-6px_var(--lime)] disabled:cursor-not-allowed">
                  {status === "sending" ? "Sending…" : "Send message"} <Send size={15} aria-hidden="true" />
                </button>
              </Magnetic>
            </fieldset>

            <div id="form-note" aria-live="polite" className="mt-6 text-sm">
              {status === "sent" && (
                <p className="flex items-center gap-2 text-limetext">
                  <Check size={16} aria-hidden="true" /> Thanks! Your message was sent. I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-start gap-2 text-[#f59e0b]">
                  <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> Something went wrong sending your message. Please try again or reach out on LinkedIn.
                </p>
              )}
              {status === "idle" && mode === "none" && (
                <p className="flex items-start gap-2 text-muted">
                  <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> The contact form is being set up. In the meantime, please message me on LinkedIn.
                </p>
              )}
              {status === "idle" && mode === "mailto" && <p className="text-muted">Submitting opens your email app with this message ready to send.</p>}
            </div>
          </m.form>
        </div>
      </div>
    </section>
  );
}
