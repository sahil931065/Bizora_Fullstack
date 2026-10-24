import { getBusinessImage } from "../../Data/businessImages";

export default function BusinessGallery({ business }) {
  return (
    <section className="mt-10">
      <div className="group relative aspect-[16/7] min-h-64 overflow-hidden bg-[#111816]">
        <img src={getBusinessImage(business)} alt={`${business.name} business preview`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-[#171717]/15" />
        <div className="absolute left-7 top-7 rounded-full border border-white/30 bg-black/20 px-4 py-2 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">Business preview</p>
        </div>
        <div className="absolute bottom-7 left-7 text-white">
          <p className="text-xs uppercase tracking-[0.18em] text-white/75">{business.category} · {business.country}</p>
          <h2 className="mt-2 font-['DM_Serif_Display'] text-3xl sm:text-4xl">{business.name}</h2>
        </div>
      </div>

      <p className="mt-3 text-xs text-white/55">
        Illustrative listing image. Sellers can add their own photography when publishing a listing.
      </p>
    </section>
  );
}
