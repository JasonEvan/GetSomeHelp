export type PaginationResult<T> = {
  currentData: T[];
  totalPages: number;
};

export function paginate<T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): PaginationResult<T> {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return {
    currentData,
    totalPages,
  };
}
