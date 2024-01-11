export function getPagination(page: any, total: any, limit: any) {
  return pagination(4)(
    parseInt(page),
    Math.floor(parseInt(total) / parseInt(limit)),
  );
}

const { floor, min, max } = Math;
const range = (lo, hi) => Array.from({ length: hi - lo }, (_, i) => i + lo);

const pagination =
  (count, ellipsis = '…') =>
  (page, total) => {
    const start = max(1, min(page - floor((count - 3) / 2), total - count + 2));
    const end = min(total, max(page + floor((count - 2) / 2), count - 1));
    return [
      ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
      ...range(start, end + 1),
      ...(end < total - 1 ? [ellipsis, total] : end < total ? [total] : []),
    ];
  };
