import { useEffect, useMemo } from "react";
import { useServiceCatalogStore } from "../../hooks/useServiceCatalogStore";
import StarIcon from "@mui/icons-material/Star";
import { sortServices } from "../../utils/sortServices";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ServiceList() {
  const { services, sortBy, types, priceRange, getData } =
    useServiceCatalogStore();

  useEffect(() => {
    getData();
  }, [getData, types, priceRange]);

  const sortedServices = useMemo(
    () => sortServices(services, sortBy),
    [services, sortBy]
  );

  return (
    <div className="w-full md:w-3/4 space-y-3">
      {sortedServices.map((service, index) => (
        <ServiceCard
          key={index}
          id={service.id}
          name={service.display_name}
          category={service.service_type.name}
          city={service.city}
          experience={service.experience_years}
          rating={service.rating}
          price={service.starting_price}
          image={service.img_path}
        />
      ))}
    </div>
  );
}

function ServiceCard({
  id,
  name,
  category,
  city,
  experience,
  rating,
  price,
  image,
}: {
  id: number;
  name: string;
  category: string;
  city: string;
  experience: number;
  rating: number;
  price: number;
  image: string | null;
}) {
  const { t } = useTranslation();

  let img_source;
  if (!image) {
    img_source = "https://picsum.photos/720/360";
  } else if (image.startsWith("http://") || image.startsWith("https://")) {
    img_source = image;
  } else {
    img_source = `${import.meta.env.VITE_BACKEND_URL}${image}`;
  }

  return (
    <Link
      className="w-full border border-gray-300 rounded-lg overflow-hidden flex flex-col sm:flex-row"
      to={`/catalog/${id}`}
    >
      <div className="w-full sm:w-[140px] h-40 sm:h-auto shrink-0">
        <img src={img_source} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-between p-3 flex-1">
        <div>
          <h5 className="text-lg sm:text-xl font-semibold">{name}</h5>
          <p className="text-sm text-gray-600">{category}</p>
          <p className="text-sm text-gray-600">
            {city} – {experience}+ {t("catalog.card.years_service")}
          </p>
        </div>

        <div className="mt-2 flex justify-between items-end">
          <div className="flex items-center gap-1">
            <StarIcon className="text-[#E6A61C]" fontSize="small" />
            <span>{rating}</span>
          </div>

          <p className="text-sm">
            {t("catalog.card.starting_from")}
            <b>{price}</b> {t("catalog.card.per_visit")}
          </p>
        </div>
      </div>
    </Link>
  );
}
