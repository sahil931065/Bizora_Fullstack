import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useBizora } from "../context/BizoraContext";

export default function Register() {
  const { user, continuePreview, isPreview, authenticate } = useBizora();
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/dashboard" replace />;
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    try { await authenticate("/auth/register", { name: form.get("name"), email: form.get("email"), password: form.get("password"), role }); navigate("/dashboard"); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-[#080d0b] px-5 pb-20 pt-36"><section className="mx-auto max-w-xl border border-white/10 bg-[#111816] p-8 sm:p-12"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">JOIN BIZORA</p><h1 className="mt-4 font-['DM_Serif_Display'] text-5xl">Create your account</h1><p className="mt-4 text-sm leading-7 text-white/55">{isPreview ? "Preview mode is active. Choose a workspace to explore; it won’t create a real account." : "Create a buyer or seller account to get started."}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[["buyer", "I’m looking to buy", "Discover, save and evaluate opportunities."], ["seller", "I’m selling a business", "Prepare a listing and manage buyer interest."]].map(([value,title,body]) => <button key={value} type="button" onClick={() => setRole(value)} aria-pressed={role === value} className={`border p-5 text-left ${role === value ? "border-lime-200 bg-[#080d0b]" : "border-white/10"}`}><span className="block font-semibold">{title}</span><span className="mt-2 block text-sm text-white/55">{body}</span></button>)}</div>{!isPreview && <form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm">Full name<input name="name" required maxLength="100" className="mt-2 w-full border border-white/10 p-3" /></label><label className="block text-sm">Email<input name="email" type="email" autoComplete="email" required className="mt-2 w-full border border-white/10 p-3" /></label><label className="block text-sm">Password<input name="password" type="password" autoComplete="new-password" minLength="10" required className="mt-2 w-full border border-white/10 p-3" /><span className="mt-1 block text-xs text-white/55">Use at least 10 characters.</span></label>{error && <p role="alert" className="text-sm text-rose-300">{error}</p>}<button disabled={busy} className="w-full bg-[#111816] px-6 py-4 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Creating account…" : "Create account →"}</button></form>}{isPreview && <button type="button" onClick={() => { continuePreview(role, role === "buyer" ? "Preview Buyer" : "Preview Seller"); navigate("/dashboard"); }} className="mt-7 w-full bg-[#111816] px-6 py-4 text-sm font-semibold text-white hover:bg-lime-200">Continue in preview mode →</button>}<p className="mt-6 text-sm text-white/55">Already registered? <Link to="/login" className="font-semibold text-white underline">Sign in</Link></p></section></main>;
}
