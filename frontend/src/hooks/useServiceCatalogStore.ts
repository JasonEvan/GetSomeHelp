import { create } from "zustand";
import api from "../lib/axios";
import type { ServiceCatalog } from "../utils/types";

interface ServiceCatalogStore {
  priceRange: [number, number];
  types: number[];
  services: ServiceCatalog[];
  sortBy: "name" | "lowest_price" | "highest_price" | "rating" | null;
  address: {
    name: string;
    detail: string;
  };

  setPriceRange: (num: 10 | 20 | 30 | 40 | 50 | 60) => void;
  setTypes: (types: number[]) => void;
  setSortBy: (
    sortBy: "name" | "lowest_price" | "highest_price" | "rating" | null
  ) => void;
  setAddress: (address: { name: string; detail: string }) => void;
  getData: () => Promise<void>;
}

export const useServiceCatalogStore = create<ServiceCatalogStore>(
  (set, get) => ({
    priceRange: [-1, -1],
    services: [],
    types: [],
    sortBy: null,
    address: { name: "", detail: "" },

    setPriceRange: (num) => {
      if (num === 10) {
        set({ priceRange: [0, 50000] });
      } else if (num === 20) {
        set({ priceRange: [50000, 150000] });
      } else if (num === 30) {
        set({ priceRange: [150000, 300000] });
      } else if (num === 40) {
        set({ priceRange: [300000, 600000] });
      } else if (num === 50) {
        set({ priceRange: [600000, -1] });
      } else if (num === 60) {
        set({ priceRange: [-1, -1] });
      }
    },
    setTypes: (types) => {
      set({ types });
    },
    setSortBy: (sortBy) => {
      set({ sortBy });
    },
    setAddress: (address) => set({ address }),
    getData: async () => {
      const params = {
        price: get().priceRange.join(","),
        types: get().types.join(","),
      };

      const searchParams = new URLSearchParams(params);

      try {
        const response = await api.get(`/catalog?${searchParams.toString()}`);
        set({ services: response.data.data });
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    },
  })
);
