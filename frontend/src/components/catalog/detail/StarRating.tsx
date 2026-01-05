import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const starNumber = index + 1;

        return (
          <span key={index}>
            {rating >= starNumber ? (
              <StarIcon className="text-[#E6A61C]" />
            ) : (
              <StarBorderIcon />
            )}
          </span>
        );
      })}
    </div>
  );
}
