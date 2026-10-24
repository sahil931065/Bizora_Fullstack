import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useBizora } from "../context/BizoraContext";

export default function Login() {
  const { user, continuePreview, isPreview, authenticate } = useBizora();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/dashboard" replace />;
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    try { await authenticate("/auth/login", { email: form.get("email"), password: form.get("password") }); navigate("/dashboard"); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-[#080d0b] px-5 pb-20 pt-36"><section className="mx-auto max-w-xl border border-white/10 bg-[#111816] p-8 sm:p-12"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">ACCOUNT ACCESS</p><h1 className="mt-4 font-['DM_Serif_Display'] text-5xl">Sign in</h1>{isPreview && <p className="mt-4 text-sm leading-6 text-white/55">Preview mode is active. Continue below to explore with sample data; no real account is created.</p>}{!isPreview && <form className="mt-8 space-y-5" onSubmit={submit}><label className="block text-sm">Email<input name="email" required type="email" autoComplete="email" className="mt-2 w-full border border-white/10 p-3" /></label><label className="block text-sm">Password<input name="password" required type="password" autoComplete="current-password" className="mt-2 w-full border border-white/10 p-3" /></label>{error && <p role="alert" className="text-sm text-rose-300">{error}</p>}{!isPreview && <button disabled={busy} className="w-full bg-[#111816] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Signing in…" : "Sign in"}</button>}</form>}{isPreview && <div className="mt-5 grid gap-3 sm:grid-cols-2"><button className="bg-[#111816] px-4 py-3 text-sm font-semibold text-white" onClick={() => { continuePreview("buyer", "Preview Buyer"); navigate("/dashboard"); }}>Continue as buyer</button><button className="border border-white/10 px-4 py-3 text-sm font-semibold" onClick={() => { continuePreview("seller", "Preview Seller"); navigate("/dashboard"); }}>Continue as seller</button></div>}<p className="mt-8 text-sm text-white/55">New to Bizora? <Link to="/register" className="font-semibold text-white underline">Create an account</Link></p></section></main>;
}
