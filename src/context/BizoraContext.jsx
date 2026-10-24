/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { browseBusinesses } from "../Data/demoBusinesses";
import { api, API_URL } from "./api";

const BizoraContext = createContext(null);
const KEYS = { listings: "bizora.listings.v1", saved: "bizora.saved.v1", inquiries: "bizora.inquiries.v1", user: "bizora.preview-user.v1" };
function read(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }

export function BizoraProvider({ children }) {
  const [listings, setListings] = useState(() => read(KEYS.listings, browseBusinesses));
  const [sellerListings, setSellerListings] = useState([]);
  const [saved, setSaved] = useState(() => read(KEYS.saved, []));
  const [inquiries, setInquiries] = useState(() => read(KEYS.inquiries, []));
  const [moderationItems, setModerationItems] = useState([]);
  const [user, setUser] = useState(() => { const stored = read(KEYS.user, null); return API_URL && stored?.preview ? null : stored; });
  const [token, setToken] = useState(() => sessionStorage.getItem("bizora.token"));

  useEffect(() => localStorage.setItem(KEYS.listings, JSON.stringify(listings)), [listings]);
  useEffect(() => localStorage.setItem(KEYS.saved, JSON.stringify(saved)), [saved]);
  useEffect(() => localStorage.setItem(KEYS.inquiries, JSON.stringify(inquiries)), [inquiries]);
  useEffect(() => user ? localStorage.setItem(KEYS.user, JSON.stringify(user)) : localStorage.removeItem(KEYS.user), [user]);

  useEffect(() => {
    if (API_URL) api("/businesses").then((data) => setListings(data.items || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (!API_URL || !token) return;
    api("/users/me/saved", { token }).then((data) => setSaved((data.items || []).map((item) => item.id))).catch(() => {});
    api("/inquiries", { token }).then((data) => setInquiries(data.items || [])).catch(() => {});
    if (user?.role === "seller" || user?.role === "admin") api("/businesses/mine", { token }).then((data) => setSellerListings(data.items || [])).catch(() => {});
    if (user?.role === "admin") api("/admin/businesses/pending", { token }).then((data) => setModerationItems(data.items || [])).catch(() => {});
  }, [token, user?.role]);

  const value = useMemo(() => ({
    listings, sellerListings, saved, inquiries, moderationItems, user, isPreview: !API_URL,
    async authenticate(path, payload) {
      const result = await api(path, { method: "POST", body: JSON.stringify(payload) });
      sessionStorage.setItem("bizora.token", result.token);
      setToken(result.token);
      setUser(result.user);
      return result.user;
    },
    continuePreview(role, name = "Bizora Member") {
      const next = { id: `preview-${role}`, name, email: "preview@bizora.local", role, preview: true };
      setUser(next);
      return next;
    },
    signOut() { setUser(null); setToken(null); setSaved([]); setInquiries([]); setSellerListings([]); setModerationItems([]); sessionStorage.removeItem("bizora.token"); },
    async toggleSaved(id) {
      if (!API_URL) { setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); return; }
      if (!token) throw new Error("Sign in to save a business.");
      const exists = saved.includes(id);
      const result = await api(`/users/me/saved/${id}`, { token, method: exists ? "DELETE" : "POST" });
      setSaved((result.items || []).map((item) => item.id));
    },
    async createListing(input) {
      if (API_URL) {
        if (!token) throw new Error("Sign in with a seller account to create a listing.");
        const result = await api("/businesses", { token, method: "POST", body: JSON.stringify(input) });
        setSellerListings((current) => [result.item, ...current]);
        return result.item;
      }
      const next = { ...input, id: `local-${Date.now()}`, verified: false, createdAt: new Date().toISOString(), status: "pending", sellerId: user?.id };
      setListings((current) => [next, ...current]);
      setSellerListings((current) => [next, ...current]);
      return next;
    },
    async updateListing(id, input) {
      if (API_URL) {
        if (!token) throw new Error("Sign in with a seller account to edit a listing.");
        const result = await api(`/businesses/${id}`, { token, method: "PATCH", body: JSON.stringify(input) });
        setSellerListings((current) => current.map((item) => item.id === id ? result.item : item));
        return result.item;
      }
      const update = (item) => item.id === id ? { ...item, ...input, status: "pending" } : item;
      setListings((current) => current.map(update));
      setSellerListings((current) => current.map(update));
    },    async sendInquiry({ business, message }) {
      if (!user) throw new Error("Choose a preview account or sign in before contacting a seller.");
      if (API_URL) {
        if (!token) throw new Error("Sign in before contacting a seller.");
        const result = await api("/inquiries", { token, method: "POST", body: JSON.stringify({ businessId: business.id, message }) });
        setInquiries((current) => [result.item, ...current.filter((item) => item.id !== result.item.id)]);
        return result.item;
      }
      const next = { id: `inquiry-${Date.now()}`, businessId: business.id, businessName: business.name, buyerId: user.id, buyerName: user.name, sellerId: business.sellerId || "preview-seller", sellerName: business.sellerName || "Private Seller", status: "open", createdAt: new Date().toISOString(), messages: [{ id: `message-${Date.now()}`, senderId: user.id, senderName: user.name, body: message, createdAt: new Date().toISOString() }] };
      setInquiries((current) => [next, ...current]);
      return next;
    },
    async replyToInquiry(inquiryId, body) {
      if (!user || !body.trim()) return;
      if (API_URL) {
        const result = await api(`/inquiries/${inquiryId}/messages`, { token, method: "POST", body: JSON.stringify({ body: body.trim() }) });
        setInquiries((current) => current.map((item) => item.id === inquiryId ? result.item : item));
        return;
      }
      setInquiries((current) => current.map((item) => item.id === inquiryId ? { ...item, updatedAt: new Date().toISOString(), messages: [...item.messages, { id: `message-${Date.now()}`, senderId: user.id, senderName: user.name, body: body.trim(), createdAt: new Date().toISOString() }] } : item));
    },
    async updateInquiry(inquiryId, status) {
      if (API_URL) {
        const result = await api(`/inquiries/${inquiryId}/status`, { token, method: "PATCH", body: JSON.stringify({ status }) });
        setInquiries((current) => current.map((item) => item.id === inquiryId ? result.item : item));
        return;
      }
      setInquiries((current) => current.map((item) => item.id === inquiryId ? { ...item, status } : item));
    },
    async moderateListing(id, action) {
      const result = await api(`/admin/businesses/${id}`, { token, method: "PATCH", body: JSON.stringify({ action }) });
      setModerationItems((current) => current.filter((item) => item.id !== id));
      setSellerListings((current) => current.map((item) => item.id === id ? result.item : item));
      if (action === "approve") setListings((current) => [result.item, ...current]);
    },
  }), [listings, sellerListings, saved, inquiries, moderationItems, user, token]);

  return <BizoraContext.Provider value={value}>{children}</BizoraContext.Provider>;
}
export function useBizora() { const value = useContext(BizoraContext); if (!value) throw new Error("useBizora must be used inside BizoraProvider"); return value; }
