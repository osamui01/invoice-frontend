import ContentWrapper from "../global/contentWrapper";
import { Link } from "@tanstack/react-router";
import axios from "axios";
import DebouncedInput from "../global/debouncedInput";
import { useState, useEffect } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

const InvoicePage = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/api-5/invoices/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoices: ", error);
      });
  };

  const handleDelete = (id) => {
    // Display confirmation dialog
    const isConfirmed = window.confirm(
      "This action is final and can not be reversed. Are you sure you want to delete?"
    );

    // If the user clicks OK in the confirmation dialog, proceed with deletion
    if (isConfirmed) {
      axios
        .delete(`http://localhost:8000/api-5/invoices/${id}/`)
        .then((response) => {
          console.log("Deleted successfully: ", response);
          fetchData(); // Is this required, if on redirection, data is fetched anyway?
        })
        .catch((error) => {
          console.error("Error deleting: ", error);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("number", {
      cell: (info) => <span className="px-2">{info.getValue()}</span>,
      header: "Reference",
    }),
    columnHelper.accessor("status", {
      cell: (info) => <span className="px-2">{info.getValue()}</span>,
      header: "Status",
    }),
    columnHelper.accessor("notes", {
      cell: (info) => <span className="px-2">{info.getValue()}</span>,
      header: "Notes",
    }),
    {
      id: "modify",
      header: "",
      accessor: (row) => row.id,
      cell: (info) => (
        <Link to={`/invoices/${info.row.original.id}`}>
          <button className="text-[#33A4EB] hover:underline px-2">
            Modify
          </button>
        </Link>
      ),
    },
    {
      id: "delete",
      header: "",
      accessor: (row) => row.id,
      cell: (info) => (
        <button
          onClick={() => handleDelete(info.row.original.id)}
          className=" text-[#D23742] px-2 py-1 hover:text-[#F7F7F7] hover:bg-[#D23742]"
        >
          Remove
        </button>
      ),
    },
  ];

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  return (
    <ContentWrapper>
      <section className="h-[100%] mx-auto">
        <Link
          to="/invoices/create/step-1"
          className="flex flex-col items-center justify-center pt-5"
        >
          <button className="bg-[#e9e9e9] hover:bg-[#60D394] uppercase font-medium text-[#1E1E2C] w-40 h-8">
            Create Invoice
          </button>
        </Link>

        <section className="pt-5 w-[90%] mx-auto">
          <div className="flex justify-between mb-2">
            <div className="w-full flex items-center gap-1">
              <Search className="w-5 text-[#1E1E2C]" />
              <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                className="p-2 bg-transparent outline-none border-b-2 w-1/5 border-[#60D394]"
                placeholder="Search all columns..."
              />
            </div>
          </div>
          <table className="w-[95%] mx-auto text-white text-left">
            <thead className="bg-secondary/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-2 py-1.5">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-[#1E1E2C]">
              {table.getRowModel().rows.length
                ? table.getRowModel().rows.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`
                ${i % 2 === 0 ? "bg-[#d8d6d6]" : "bg-[#bab9b9]"}
                `}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="max-w-80 py-1.5">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                : null}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-end mt-2 gap-2">
            <button
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
              {"<"}
            </button>
            <button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
              {">"}
            </button>

            <span className="flex items-center gap-1 text-white">
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1 text-white">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16 bg-transparent text-white"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="p-2 bg-transparent"
            >
              {[10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </section>
      </section>
    </ContentWrapper>
  );
};

export default InvoicePage;
