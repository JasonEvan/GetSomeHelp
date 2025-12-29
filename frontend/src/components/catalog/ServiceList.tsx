import { useEffect, useMemo } from "react";
import { useServiceCatalogStore } from "../../hooks/useServiceCatalogStore";
import StarIcon from "@mui/icons-material/Star";
import { sortServices } from "../../utils/sortServices";

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
    <div className="space-y-2 px-5 w-3/4">
      {sortedServices.map((service, index) => (
        <ServiceCard
          key={index}
          name={service.display_name}
          category={service.service_type.name}
          city={service.city}
          experience={service.experience_years}
          rating={service.rating}
          price={service.starting_price}
          image={service.service_type.image}
        />
      ))}
    </div>
  );
}

function ServiceCard({
  name,
  category,
  city,
  experience,
  rating,
  price,
  image,
}: {
  name: string;
  category: string;
  city: string;
  experience: number;
  rating: number;
  price: number;
  image: string;
}) {
  return (
    <div className="w-full h-24 flex justify-between items-center border border-gray-300">
      <div className="flex h-full items-center">
        <div className="w-[120px] h-full flex justify-center items-center overflow-hidden">
          <img src={image} alt="" className="object-cover" />
        </div>
        <div className="ms-2">
          <h5 className="text-xl">{name}</h5>
          <p className="text-sm">{category}</p>
          <p className="text-sm">
            {city} - {experience}+ years of service
          </p>
        </div>
      </div>
      <div className="text-right pe-2 flex flex-col justify-between h-3/4">
        <div className="flex gap-x-2 justify-end">
          <StarIcon className="text-[#E6A61C]" />
          <p>{rating}</p>
        </div>
        <p>
          Starting from Rp<b>{price}</b> per visit
        </p>
      </div>
    </div>
  );
}
