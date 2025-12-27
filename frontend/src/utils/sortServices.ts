import type { ServiceCatalog } from "./types";

export const sortServices = (
  services: ServiceCatalog[],
  sortBy: string | null
) => {
  if (!sortBy) return services;

  const sorted = [...services];

  switch (sortBy) {
    case "name":
      return sorted.sort((a, b) =>
        a.display_name.localeCompare(b.display_name)
      );

    case "lowest_price":
      return sorted.sort((a, b) => a.starting_price - b.starting_price);

    case "highest_price":
      return sorted.sort((a, b) => b.starting_price - a.starting_price);

    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);

    default:
      return services;
  }
};
