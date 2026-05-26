// TransitHub — Table.jsx
// Data table with yellow header, zebra rows, highlighted row support,
// row hover, and built-in pagination. BRS Spec: Section 7.4.3 Tables.
//
// Usage:
//   <Table
//     columns={[
//       { key: "id",     header: "Booking ID", mono: true },
//       { key: "name",   header: "Passenger" },
//       { key: "status", header: "Status", render: (v) => <Badge variant={v}>{v}</Badge> },
//     ]}
//     data={rows}
//     highlightRow={(row) => row.status === "warning"}
//     pagination={{ page: 1, total: 284, perPage: 10, onPageChange: (p) => {} }}
//   />

import React from "react";

export default function Table({
  columns = [],
  data = [],
  highlightRow,
  pagination,
  className = "",
}) {
  return (
    <div
      className={[
        "border border-border rounded-lg overflow-hidden shadow-card",
        className,
      ].join(" ")}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          {/* Header */}
          <thead>
            <tr className="bg-yellow">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3.5 py-2.5 text-left text-xs font-semibold text-ink whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3.5 py-8 text-center text-sm text-ink-muted"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => {
                const isHighlighted = highlightRow?.(row);
                const isEven = rowIdx % 2 !== 0;

                return (
                  <tr
                    key={row.id ?? rowIdx}
                    className={[
                      "border-b border-border transition-colors duration-100",
                      isHighlighted
                        ? "bg-sky-light"
                        : isEven
                        ? "bg-yellow-light hover:bg-yellow-pale"
                        : "bg-white hover:bg-yellow-pale",
                    ].join(" ")}
                  >
                    {columns.map((col) => (
                      <td
                        key={`${row.id ?? rowIdx}-${col.key}`}
                        className={[
                          "px-3.5 py-2.5 text-ink",
                          col.mono ? "font-mono text-xs" : "text-sm",
                        ].join(" ")}
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : row[col.key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <TablePagination {...pagination} />
      )}
    </div>
  );
}

function TablePagination({ page, total, perPage = 10, onPageChange }) {
  const totalPages = Math.ceil(total / perPage);
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (page <= 3) return i + 1;
    if (page >= totalPages - 2) return totalPages - 4 + i;
    return page - 2 + i;
  });

  return (
    <div className="bg-white px-3.5 py-2.5 border-t border-border flex items-center gap-1.5">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 text-xs font-semibold rounded-md border border-yellow text-ink
                   hover:bg-yellow-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ‹ Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={[
            "w-7 h-7 text-xs font-semibold rounded-md transition-colors",
            p === page
              ? "bg-yellow text-ink"
              : "border border-yellow text-ink hover:bg-yellow-light",
          ].join(" ")}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 text-xs font-semibold rounded-md border border-yellow text-ink
                   hover:bg-yellow-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next ›
      </button>

      <span className="ml-auto text-xs text-ink-muted">
        Showing {from}–{to} of {total}
      </span>
    </div>
  );
}
