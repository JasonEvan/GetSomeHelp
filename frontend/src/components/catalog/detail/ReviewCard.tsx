import { CircleUserRound } from "lucide-react";
import StarRating from "./StarRating";

export default function ReviewCard({
  review,
}: {
  review: { user: { name: string }; comment: string; rating: number };
}) {
  return (
    <div className="bg-[#FAFAFA] shadow-xl rounded-xl p-3 space-y-2">
      <div className="flex items-center gap-x-2">
        <CircleUserRound size={30} />
        <h3 className="text-lg">{review.user.name}</h3>
      </div>
      <StarRating rating={review.rating} />
      <p>{review.comment}</p>
    </div>
  );
}
