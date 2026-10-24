import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/HomeExperience";
import BrowseBusinesses from "./Pages/BrowseBusinesses";
import BusinessDetails from "./Pages/BusinessDetails";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SellBusiness from "./Pages/SellBusiness";
import SavedBusinesses from "./Pages/SavedBusinesses";
import Messages from "./Pages/Messages";
import AdminModeration from "./Pages/AdminModeration";
import About from "./Pages/About";
import HowItWorks from "./Pages/HowItWorks";
import SiteMotion from "./components/SiteMotion";

function NotFound() {
  return <main className="min-h-screen bg-[#080d0b] px-6 py-36 text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">PAGE NOT FOUND</p><h1 className="mt-4 font-['DM_Serif_Display'] text-5xl">Let’s find another way.</h1><p className="mt-4 text-white/55">This page may have moved or the address may be incorrect.</p><a href="/" className="mt-7 inline-flex bg-[#111816] px-6 py-3 text-sm font-semibold text-white">Back to Home</a></main>;
}

function App() {
  return <><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/businesses" element={<BrowseBusinesses />} /><Route path="/businesses/:id" element={<BusinessDetails />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/dashboard" element={<Dashboard />} /><Route path="/sell" element={<SellBusiness />} /><Route path="/sell/:id" element={<SellBusiness />} /><Route path="/saved" element={<SavedBusinesses />} /><Route path="/messages" element={<Messages />} /><Route path="/admin/moderation" element={<AdminModeration />} /><Route path="/about" element={<About />} /><Route path="/how-it-works" element={<HowItWorks />} /><Route path="*" element={<NotFound />} /></Routes><SiteMotion /></>;
}
export default App;
