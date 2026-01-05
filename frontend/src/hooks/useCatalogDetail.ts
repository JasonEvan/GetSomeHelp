import { useEffect, useState } from "react";
import type { ServiceCatalogDetail } from "../utils/types";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export function useCatalogDetail(detail: string | undefined) {
  const [service, setService] = useState<ServiceCatalogDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchServiceDetail() {
      try {
        setLoading(true);
        const res = await api.get<{ data: ServiceCatalogDetail }>(
          `/catalog/${detail}`
        );
        setService(res.data.data);
      } catch (err) {
        setService(null);
        console.error("Failed to fetch service detail:", err);
        navigate("/catalog");
      } finally {
        setLoading(false);
      }
    }

    fetchServiceDetail();
  }, [detail, navigate]);

  return { service, loading, navigate };
}
