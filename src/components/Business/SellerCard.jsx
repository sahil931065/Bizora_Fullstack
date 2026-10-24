export default function SellerCard({ business, onContact }) {
  return (
    <div className="border border-white/10 bg-[#111816] p-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-200">
        SELLER
      </p>

      <div className="mt-7 border-b border-white/10 pb-6">
        <h3 className="font-['DM_Serif_Display'] text-3xl text-white">
          Private Seller
        </h3>

        <p className="mt-2 text-sm text-white/55">
          Owner of {business.name}
        </p>
      </div>

      <div className="space-y-4 py-6">
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-white/55">Business age</span>
          <span className="font-medium text-white">
            {business.age}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-sm">
          <span className="text-white/55">Location</span>
          <span className="font-medium text-white">
            {business.country}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-sm">
          <span className="text-white/55">Verification</span>
          <span className="font-medium text-white">
            {business.verified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onContact}
        className="w-full bg-[#111816] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-lime-200"
      >
        Contact Seller →
      </button>
    </div>
  );
}