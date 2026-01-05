import { useState } from "react";
import type { ServiceCatalogDetail } from "../../../utils/types";
import ReviewCard from "./ReviewCard";

export default function ReviewSection({
  reviews,
}: {
  reviews: ServiceCatalogDetail["reviews"];
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <div className="w-1/4">
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {visibleCount < reviews.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="text-center w-full cursor-pointer hover:text-[#7C3AED]"
            >
              See More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
