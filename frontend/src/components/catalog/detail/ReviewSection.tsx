import { useState } from "react";
import type { ServiceCatalogDetail } from "../../../utils/types";
import ReviewCard from "./ReviewCard";
import { useTranslation } from "react-i18next";

export default function ReviewSection({
  reviews,
}: {
  reviews: ServiceCatalogDetail["reviews"];
}) {
  const [visibleCount, setVisibleCount] = useState(3);
  const { t } = useTranslation();

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <div className="w-1/4">
      {reviews.length === 0 ? (
        <p>{t("catalog.detail.no_reviews")}</p>
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
              {t("catalog.detail.see_more")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
