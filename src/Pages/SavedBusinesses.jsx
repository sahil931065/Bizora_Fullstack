import { Link, Navigate } from "react-router-dom";
import { useBizora } from "../context/BizoraContext";
import BrowseBusinessCard from "../components/BrowseBusinessCard";

export default function SavedBusinesses() {
  const { user, listings, saved, toggleSaved } = useBizora();
  if (!user) return <Navigate to="/login" replace />;
  const businesses = listings.filter((item) => saved.includes(item.id));
  return <main className="min-h-screen bg-[#080d0b] px-5 pb-24 pt-36"><div className="mx-auto max-w-7xl"><Link to="/dashboard" className="text-sm text-white/55 hover:text-lime-200">← Dashboard</Link><p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">BUYER WORKSPACE</p><h1 className="mt-3 font-['DM_Serif_Display'] text-5xl">Saved businesses</h1>{businesses.length ? <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{businesses.map((business) => <BrowseBusinessCard key={business.id} business={business} isFavorite onFavorite={toggleSaved} />)}</div> : <div className="mt-9 border border-white/10 bg-[#111816] px-6 py-16 text-center"><h2 className="font-['DM_Serif_Display'] text-3xl">Your shortlist starts here.</h2><p className="mt-3 text-sm text-white/55">Save an opportunity from its profile to keep it here.</p><Link to="/businesses" className="mt-6 inline-flex bg-[#111816] px-5 py-3 text-sm font-semibold text-white">Browse Businesses →</Link></div>}</div></main>;
}
