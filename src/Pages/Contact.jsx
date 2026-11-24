import { useState } from "react";
import { API_URL, api } from "../context/api";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name")).trim(),
      email: String(form.get("email")).trim(),
      subject: String(form.get("subject")).trim(),
      message: String(form.get("message")).trim(),
    };
    try {
      if (API_URL) {
        await api("/contact", { method: "POST", body: JSON.stringify(payload) });
      } else {
        const existing = JSON.parse(localStorage.getItem("bizora.contact.v1") || "[]");
        localStorage.setItem("bizora.contact.v1", JSON.stringify([{ ...payload, createdAt: new Date().toISOString(), id: `contact-${Date.now()}` }, ...existing].slice(0, 20)));
      }
      formElement.reset();
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <main className="min-h-screen bg-[#080d0b] px-5 pb-24 pt-36">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">CONTACT BIZORA</p>
          <h1 className="mt-4 font-['DM_Serif_Display'] text-5xl leading-tight sm:text-6xl">How can we help?</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/55">Send a question about the marketplace, account access or a business opportunity.</p>
          <div className="mt-8 space-y-4 border-t border-white/10 pt-7 text-sm">
            <p><span className="block text-xs uppercase tracking-wider text-white/40">Support</span><a className="mt-1 inline-block underline decoration-lime-200 underline-offset-4" href="mailto:support@bizora.com">support@bizora.com</a></p>
            <p><span className="block text-xs uppercase tracking-wider text-white/40">Response time</span><span className="mt-1 block text-white/55">Usually within 1–2 business days</span></p>
          </div>
        </section>
        <section className="border border-white/10 bg-[#111816] p-6 sm:p-9">
          {status === "sent" ? (
            <div className="flex min-h-[420px] flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">MESSAGE RECEIVED</p>
              <h2 className="mt-4 font-['DM_Serif_Display'] text-4xl">Thanks for contacting us.</h2>
              <p className="mt-4 text-sm leading-7 text-white/55">Your message has been recorded. We’ll respond to the email address you provided.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-7 self-start border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:border-lime-200">Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm">Full name<input name="name" required maxLength="100" autoComplete="name" className="mt-2 w-full border border-white/10 px-4 py-3" /></label>
                <label className="text-sm">Email address<input name="email" type="email" required maxLength="254" autoComplete="email" className="mt-2 w-full border border-white/10 px-4 py-3" /></label>
              </div>
              <label className="block text-sm">Subject<select name="subject" required defaultValue="" className="mt-2 w-full border border-white/10 px-4 py-3"><option value="" disabled>Select a topic</option><option>General question</option><option>Account support</option><option>Listing support</option><option>Partnership enquiry</option><option>Report a problem</option></select></label>
              <label className="block text-sm">Message<textarea name="message" required minLength="20" maxLength="3000" rows="7" className="mt-2 w-full resize-none border border-white/10 px-4 py-3" placeholder="Tell us how we can help…" /></label>
              {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
              <button disabled={status === "sending"} className="w-full bg-[#111816] px-6 py-4 text-sm font-semibold text-white disabled:opacity-50">{status === "sending" ? "Sending…" : "Send message →"}</button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
