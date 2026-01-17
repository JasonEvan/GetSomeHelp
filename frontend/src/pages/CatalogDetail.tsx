import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { CircleUserRound } from "lucide-react";
import { useCatalogDetail } from "../hooks/useCatalogDetail";
import ReviewSection from "../components/catalog/detail/ReviewSection";
import ScheduleSection from "../components/catalog/detail/ScheduleSection";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import BookingDetailModal from "../components/catalog/detail/BookingDetailModal";

export default function CatalogDetail() {
  const { detail } = useParams();
  const { service, loading, navigate } = useCatalogDetail(detail);
  const { t } = useTranslation();
  const [openBooking, setOpenBooking] = useState(false);

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
      className="min-h-screen bg-cover bg-center bg-repeat px-4 sm:px-6 lg:px-16 flex flex-col gap-y-8"
      style={{ backgroundImage: "url('/img/background/forth-bg.png')" }}
    >
      <section className="flex flex-col lg:flex-row justify-center items-start pt-24 gap-6">
        <div className="w-full lg:w-1/2 h-64 lg:h-[300px]">
          <img
            src={img_source}
            alt=""
            className="w-full h-full object-cover border rounded-lg"
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-3">
          <h1 className="text-2xl lg:text-4xl">{service.service_type.name}</h1>

          <div className="flex items-center gap-x-1 text-lg">
            <StarIcon className="text-[#E6A61C]" />
            <span>{service.rating}</span>
          </div>

          <p className="text-lg">{service.service_type.description}</p>

          <p className="text-lg">
            {t("catalog.card.starting_from")} <b>{service.starting_price}</b>{" "}
            {t("catalog.card.per_visit")}
          </p>

          <div className="flex gap-x-3">
            <button
              onClick={() => setOpenBooking(true)}
              className="mt-5 bg-[#7C3AED] text-white rounded-md w-fit py-2 px-4 hover:bg-[#6D28D9]"
            >
              {t("catalog.detail.book_now")}
            </button>

            <Link
              hidden={!service.user.phone}
              to={`https://wa.me/${service.user.phone?.split("-").join("")}`}
              className="mt-5 bg-transparent text-black rounded-md w-fit py-2 px-4 border border-white"
            >
              {t("catalog.detail.contact_provider")}
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row justify-center gap-6">
        <div className="w-full lg:w-1/2 space-y-1">
          <h2 className="text-2xl">{t("catalog.detail.about_this_service")}</h2>
          <p className="text-lg">{service.bio}</p>
        </div>

        <div className="w-full lg:w-1/2 space-y-1">
          <h2 className="text-2xl">{t("catalog.detail.provided_by")}</h2>
          <div className="flex items-center gap-x-2">
            <CircleUserRound size={40} />
            <div>
              <p className="text-xl">{service.display_name}</p>
              <p className="text-lg">
                {service.city} - {service.experience_years}+{" "}
                {t("catalog.card.years_service")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row justify-center gap-6 pb-10">
        <ReviewSection reviews={service.reviews} />
        <ScheduleSection bookings={service.grouped_bookings} />
      </section>

      {/* Booking Modal */}
      <BookingDetailModal
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        startingPrice={service.starting_price}
        providerId={service.id}
      />
    </main>
  );
}
