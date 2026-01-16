import { useEffect, useState } from "react";
import {
  calculateTotalOrders,
  calculateTotalSpent,
  formatCurrency,
} from "../../utils/historyUtils";
import { paginate } from "../../utils/paginationUtils";
import api from "../../lib/axios";
import type { ProviderHistory } from "../../utils/types";
import { useAuthStore } from "../../hooks/useAuthStore";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function HistoryTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState<ProviderHistory[]>([]);
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();

  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setHistoryData([]);
        return;
      }

      try {
        const res = await api.get<{ data: ProviderHistory[] }>(
          `/provider/${user.id}/history`
        );
        setHistoryData(res.data.data);
      } catch (err) {
        alert("Failed to fetch history data.");
        console.error(err);
      }
    }

    fetchData();
  }, [user]);

  const { currentData, totalPages } = paginate(
    historyData,
    currentPage,
    itemsPerPage
  );

  const totalOrders = calculateTotalOrders(historyData);
  const totalSpent = calculateTotalSpent(historyData);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            {t("dashboard.user.history.title")}
          </h2>
          <p className="text-gray-500">
            {t("dashboard.provider.history.subtitle")}
          </p>
        </div>

        <div className="text-right text-sm">
          <p className="text-gray-500">
            {t("dashboard.provider.history.total_jobs")}
            <span className="font-semibold text-black">{totalOrders}</span>
          </p>
          <p className="text-gray-500">
            {t("dashboard.provider.history.earnings")}
            <span className="font-semibold text-black">
              {formatCurrency(totalSpent)}
            </span>
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-x-auto">
        <table className="min-w-[600px] w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">
                {t("dashboard.provider.history.table.customer")}
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                {t("dashboard.provider.schedule.table.service")}
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                {t("dashboard.provider.schedule.table.date")}
              </th>
              <th className="px-4 py-3 text-left font-semibold">Total</th>
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
          {t("dashboard.user.history.table.previous")}
        </button>

        <span className="font-semibold">{currentPage}</span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
        >
          {t("dashboard.user.history.table.next")}
        </button>
      </div>
    </div>
  );
}
