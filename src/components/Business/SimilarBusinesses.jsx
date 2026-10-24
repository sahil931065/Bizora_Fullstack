import BusinessCard from "../BusinessCard";

export default function SimilarBusinesses({
  business,
  businesses,
}) {
  const similar = businesses
    .filter(
      (item) =>
        item.id !== business.id &&
        item.category === business.category
    )
    .slice(0, 3);

  const fallback = businesses
    .filter((item) => item.id !== business.id)
    .slice(0, 3);

  const recommendations =
    similar.length >= 3 ? similar : fallback;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {recommendations.map((item) => (
        <BusinessCard key={item.id} business={item} />
      ))}
    </div>
  );
}