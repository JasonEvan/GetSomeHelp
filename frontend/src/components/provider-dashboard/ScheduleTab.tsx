import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/historyUtils";
import { paginate } from "../../utils/paginationUtils";
import api from "../../lib/axios";
import type { ProviderHistory } from "../../utils/types";
import { useAuthStore } from "../../hooks/useAuthStore";
import dayjs from "dayjs";
import { Button } from "@mui/material";

export default function ScheduleTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [scheduleData, setScheduleData] = useState<ProviderHistory[]>([]);
  const user = useAuthStore((state) => state.user);

  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setScheduleData([]);
        return;
      }

      try {
        const res = await api.get<{ data: ProviderHistory[] }>(
          `/provider/${user.id}/schedule`
        );
        setScheduleData(res.data.data);
      } catch (err) {
        alert("Failed to fetch history data.");
        console.error(err);
      }
    }

    fetchData();
  }, [user]);

  const handleAccept = async (id: number) => {
    try {
      await api.patch(`/booking/${id}/status`, { status: "confirmed" });
      setScheduleData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Failed to accept the booking.");
      console.error(err);
    }
  };

  const handleDecline = async (id: number) => {
    try {
      await api.patch(`/booking/${id}/status`, { status: "canceled" });
      setScheduleData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Failed to decline the booking.");
      console.error(err);
    }
  };

  const { currentData, totalPages } = paginate(
    scheduleData,
    currentPage,
    itemsPerPage
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Schedule</h2>
          <p className="text-gray-500">
            Manage incoming service requests and your availability
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Customer</th>
              <th className="px-4 py-3 text-left font-semibold">Service</th>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Total</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3">{item.user.name}</td>
                <td className="px-4 py-3">{item.service_type.name}</td>
                <td className="px-4 py-3">
                  {dayjs(item.date).format("DD MMM YYYY")}
                </td>
                <td className="px-4 py-3">
                  {formatCurrency(item.total_price)}
                </td>
                <td className="px-4 py-3 flex gap-x-1">
                  <Button
                    size="small"
                    color="success"
                    variant="contained"
                    onClick={() => handleAccept(item.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => handleDecline(item.id)}
                  >
                    Decline
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="font-semibold">{currentPage}</span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
