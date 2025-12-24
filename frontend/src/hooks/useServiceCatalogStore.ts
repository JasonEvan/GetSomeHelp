import { create } from "zustand";
import api from "../lib/axios";

interface Service {
  display_name: string;
  city: string;
  starting_price: number;
  rating: number;
  experience_years: number;
  service_type: {
    name: string;
    image: string;
  };
}

interface ServiceCatalogStore {
  services: Service[];
  getData: () => Promise<void>;
}

export const useServiceCatalogStore = create<ServiceCatalogStore>((set) => ({
  services: [],
  getData: async () => {
    try {
      const response = await api.get("/catalog");
      set({ services: response.data.data });
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  },
}));
