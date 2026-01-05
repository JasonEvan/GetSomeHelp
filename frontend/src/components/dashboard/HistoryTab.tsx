import { useState } from "react";
import {
  type HistoryItem,
  calculateTotalOrders,
  calculateTotalSpent,
  formatCurrency,
} from "../../utils/historyUtils";
import { paginate } from "../../utils/paginationUtils";

export default function HistoryTab() {
  // dummy data
  const historyData: HistoryItem[] = [
    {
      service: "House Cleaning",
      provider: "Tonny Cleaning Expert",
      date: "05 Des 2025",
      total: 300000,
    },
    {
      service: "House Cleaning",
      provider: "Tonny Cleaning Expert",
      date: "05 Des 2025",
      total: 300000,
    },
    {
      service: "House Cleaning",
      provider: "Tonny Cleaning Expert",
      date: "05 Des 2025",
      total: 300000,
    },
    {
      service: "House Cleaning",
      provider: "Tonny Cleaning Expert",
      date: "05 Des 2025",
      total: 300000,
    },
    {
      service: "House Cleaning",
      provider: "Tonny Cleaning Expert",
      date: "05 Des 2025",
      total: 300000,
    },
    {
      service: "AC Service",
      provider: "Cool Air Pro",
      date: "12 Jan 2026",
      total: 450000,
    },
    {
      service: "Plumbing",
      provider: "FixIt Fast",
      date: "20 Jan 2026",
      total: 250000,
    },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

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
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Service History</h2>
          <p className="text-gray-500">
            View your transaction for hiring services.
          </p>
        </div>

        <div className="text-right text-sm">
          <p className="text-gray-500">
            Total Orders:{" "}
            <span className="font-semibold text-black">
              {totalOrders}
            </span>
          </p>
          <p className="text-gray-500">
            Total Spent:{" "}
            <span className="font-semibold text-black">
              {formatCurrency(totalSpent)}
            </span>
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">
                Service
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Provider
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{item.service}</td>
                <td className="px-4 py-3">{item.provider}</td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">
                  {formatCurrency(item.total)}
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
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400"
        >
          Previous
        </button>

        <span className="font-semibold">{currentPage}</span>

        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
