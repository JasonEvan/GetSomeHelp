import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { CircleUserRound } from "lucide-react";
import { useCatalogDetail } from "../hooks/useCatalogDetail";
import ReviewSection from "../components/catalog/detail/ReviewSection";
import ScheduleSection from "../components/catalog/detail/ScheduleSection";

export default function CatalogDetail() {
  const { detail } = useParams();
  const { service, loading, navigate } = useCatalogDetail(detail);

  if (loading) {
    return (
      <main className="h-screen bg-gray-400 flex justify-center items-center">
        <CircularProgress />
      </main>
    );
  }

  if (!service) {
    navigate("/catalog");
    return null;
  }

  let img_source;
  if (!service.img_path) {
    img_source = "https://picsum.photos/720/360";
  } else if (
    service.img_path.startsWith("http://") ||
    service.img_path.startsWith("https://")
  ) {
    img_source = service.img_path;
  } else {
    img_source = `${import.meta.env.VITE_BACKEND_URL}${service.img_path}`;
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-repeat px-16 flex flex-col gap-y-5"
      style={{ backgroundImage: "url('/img/background/forth-bg.png')" }}
    >
      <section className="flex justify-center items-center pt-24 gap-x-5">
        <div className="w-full h-[300px]">
          <img
            src={img_source}
            alt=""
            className="object-cover border rounded-lg"
          />
        </div>
        <div className="w-full h-[300px] space-y-2">
          <h1 className="text-4xl">{service.service_type.name}</h1>
          <div className="flex items-center gap-x-1 text-lg">
            <StarIcon className="text-[#E6A61C]" />
            <span>{service.rating}</span>
          </div>
          <p className="text-lg">{service.service_type.description}</p>
          <p className="text-lg">
            Starting from <b>Rp{service.starting_price}</b> per visit
          </p>
          <div className="flex gap-x-3">
            <Link
              type="button"
              to="#"
              className="mt-5 bg-[#7C3AED] text-white rounded-md w-fit py-2 px-4"
            >
              Book Now
            </Link>
            <Link
              type="button"
              to="#"
              className="mt-5 bg-transparent text-black rounded-md w-fit py-2 px-4 border border-white"
            >
              Contact Provider
            </Link>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center gap-x-5">
        <div className="w-full space-y-1">
          <h2 className="text-2xl">About This Service</h2>
          <p className="text-lg">{service.bio}</p>
        </div>
        <div className="w-full space-y-1">
          <h2 className="text-2xl">Provided by</h2>
          <div className="flex items-center gap-x-2">
            <CircleUserRound size={40} />
            <div>
              <p className="text-xl">{service.display_name}</p>
              <p className="text-lg">
                {service.city} - {service.experience_years}+ years of service
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center gap-x-5 pb-5">
        <ReviewSection reviews={service.reviews} />
        <ScheduleSection bookings={service.grouped_bookings} />
      </section>
    </main>
  );
}
