import { useState } from "react";
import { Link } from "react-router-dom";
import { useBizora } from "../../context/BizoraContext";

export default function ContactSellerModal({ business, isOpen, onClose }) {
  const { user, sendInquiry } = useBizora();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  if (!isOpen) return null;
  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try { await sendInquiry({ business, message }); setSent(true); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/60 px-5" role="dialog" aria-modal="true" aria-labelledby="contact-seller-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="w-full max-w-lg bg-[#080d0b] p-7 sm:p-9"><div className="flex items-start justify-between gap-6"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">CONTACT SELLER</p><h2 id="contact-seller-title" className="mt-3 font-['DM_Serif_Display'] text-4xl">{sent ? "Inquiry sent." : `Interested in ${business.name}?`}</h2></div><button type="button" onClick={onClose} aria-label="Close contact dialog" className="text-2xl text-white/55 hover:text-white">×</button></div>{sent ? <div><p className="mt-5 text-sm leading-7 text-white/55">Your message is in your Bizora inbox. You can continue the conversation from your messages workspace.</p><Link to="/messages" onClick={onClose} className="mt-6 inline-flex bg-[#111816] px-5 py-3 text-sm font-semibold text-white">Open messages →</Link></div> : !user ? <div><p className="mt-5 text-sm leading-7 text-white/55">Sign in to send an inquiry and keep the conversation in one place.</p><Link to="/login" onClick={onClose} className="mt-6 inline-flex bg-[#111816] px-5 py-3 text-sm font-semibold text-white">Sign in to continue →</Link></div> : <form onSubmit={submit} className="mt-6"><label htmlFor="buyer-message" className="text-xs font-semibold uppercase tracking-[0.15em] text-white">Your message</label><textarea id="buyer-message" rows="5" required minLength="10" maxLength="2000" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell the seller what you would like to learn about this business…" className="mt-3 w-full resize-none border border-white/10 bg-[#111816] p-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-lime-200" />{error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}<button disabled={busy} className="mt-5 w-full bg-[#111816] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-lime-200 disabled:opacity-50">{busy ? "Sending…" : "Send inquiry →"}</button></form>}</div></div>;
}
