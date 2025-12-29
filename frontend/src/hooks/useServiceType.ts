import { useEffect, useState } from "react";
import type { ServiceType } from "../utils/types";
import api from "../lib/axios";

export function useServiceType() {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    async function fetchServiceTypes() {
      try {
        const res = await api.get<{ data: ServiceType[] }>("/service-type");
        setServices(res.data.data);
      } catch (err) {
        console.error("Failed to fetch service types:", err);
      }
    }

    fetchServiceTypes();
  }, []);

  return services;
}
