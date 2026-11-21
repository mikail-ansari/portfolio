import { useState } from "react";
import { Mail, Send, Check, CircleAlert } from "lucide-react";
import { site } from "../config/site.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";

const { email, formspreeId } = site.contact;
const inputCls =
  "mt-2 w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder:text-muted/60 transition-colors focus:border-cyan/60 focus:bg-white/[0.05] focus:outline-none";

/**
 * Contact form modes (chosen automatically from the config):
 *  1. formspreeId set  -> submits to Formspree (free tier), no backend needed.
 *  2. only email set   -> opens the visitor's email app with the message pre-filled (mailto).
 *  3. neither set      -> the form is disabled and points visitors to LinkedIn.
 */
const mode = formspreeId ? "formspree" : email ? "mailto" : "none";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot: bots fill this hidden field

    if (mode === "mailto") {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n- ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const disabled = mode === "none";

  return (
    <Section id="contact" eyebrow="06 / Contact" title="Let's work together" intro="Open to IT and systems administration, production and operations technology, frontend and web development roles, and freelance projects.">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-3">
          {email && (
            <a href={`mailto:${email}`} className="card flex items-center gap-4 rounded-xl p-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan/10 text-cyan"><Mail size={18} aria-hidden="true" /></span>
              <span><span className="block font-mono text-[11px] uppercase tracking-widest text-muted">Email</span><span className="text-[15px] text-white break-all">{email}</span></span>
            </a>
          )}
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-4 rounded-xl p-4">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan/10 text-cyan"><LinkedinIcon className="h-[18px] w-[18px]" /></span>
            <span><span className="block font-mono text-[11px] uppercase tracking-widest text-muted">LinkedIn</span><span className="text-[15px] text-white">Connect on LinkedIn<span className="sr-only"> (opens in a new tab)</span></span></span>
          </a>
          {site.social.github && (
            <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-4 rounded-xl p-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan/10 text-cyan"><GithubIcon className="h-[18px] w-[18px]" /></span>
              <span><span className="block font-mono text-[11px] uppercase tracking-widest text-muted">GitHub</span><span className="text-[15px] text-white">View my repositories<span className="sr-only"> (opens in a new tab)</span></span></span>
            </a>
          )}
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} className="glass rounded-2xl p-6 sm:p-8" aria-describedby="form-note">
            <fieldset disabled={disabled || status === "sending"} className="space-y-5 border-0 p-0 disabled:opacity-60">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm text-muted">
                  Name
                  <input name="name" type="text" required autoComplete="name" className={inputCls} placeholder="Your name" />
                </label>
                <label className="block text-sm text-muted">
                  Email
                  <input name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@company.com" />
                </label>
              </div>
              {/* honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>Company<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <label className="block text-sm text-muted">
                Message
                <textarea name="message" required rows={5} className={`${inputCls} resize-y`} placeholder="How can I help?" />
              </label>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-neon px-6 py-3 text-sm font-semibold text-[#04141a] transition hover:brightness-110 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : "Send message"} <Send size={15} aria-hidden="true" />
              </button>
            </fieldset>

            <div id="form-note" aria-live="polite" className="mt-5 text-sm">
              {status === "sent" && (
                <p className="flex items-center gap-2 text-emerald-300"><Check size={16} aria-hidden="true" /> Thanks! Your message was sent. I'll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="flex items-start gap-2 text-amber-300"><CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> Something went wrong sending your message. Please try again or reach out on LinkedIn.</p>
              )}
              {status === "idle" && mode === "none" && (
                <p className="flex items-start gap-2 text-muted"><CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> The contact form is being set up. In the meantime, please message me on LinkedIn.</p>
              )}
              {status === "idle" && mode === "mailto" && (
                <p className="text-muted">Submitting opens your email app with this message ready to send.</p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
