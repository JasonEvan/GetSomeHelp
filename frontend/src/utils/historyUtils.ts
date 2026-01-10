import type { BookingHistory, ProviderHistory } from "./types";

export function calculateTotalOrders(
  data: BookingHistory[] | ProviderHistory[]
): number {
  return data.length;
}

export function calculateTotalSpent(
  data: BookingHistory[] | ProviderHistory[]
): number {
  return data.reduce((sum, item) => sum + item.total_price, 0);
}

export function formatCurrency(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}
