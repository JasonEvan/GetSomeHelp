export type HistoryItem = {
  service: string;
  provider: string;
  date: string;
  total: number;
};

export function calculateTotalOrders(data: HistoryItem[]): number {
  return data.length;
}

export function calculateTotalSpent(data: HistoryItem[]): number {
  return data.reduce((sum, item) => sum + item.total, 0);
}

export function formatCurrency(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}
