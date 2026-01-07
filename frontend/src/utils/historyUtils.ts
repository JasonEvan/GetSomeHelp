import type { BookingHistory } from "./types";

export function calculateTotalOrders(data: BookingHistory[]): number {
  return data.length;
}

export function calculateTotalSpent(data: BookingHistory[]): number {
  return data.reduce((sum, item) => sum + item.total_price, 0);
}

export function formatCurrency(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}
