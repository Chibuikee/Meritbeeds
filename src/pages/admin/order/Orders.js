import React, { useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  useRowState,
  usePagination,
} from "react-table";
import { useUpdateOrdersMutation } from "../../../redux/features/slices/ordersSlice";
import { ColumnFilter } from "./columnFilter";
import { GlobalFilter } from "./globalFilter";
// import { NavLink } from "react-router-dom";
// import { BsHouse } from "react-icons/bs";

const Orders = ({ ordersData, ordersTableColumns }) => {
  const tableOrderData = useMemo(() => ordersData, [ordersData]);
  const columns = useMemo(() => ordersTableColumns, []);
  const [editMode, setEditMode] = useState(null);
  const [updatedData, setReadyUpdate] = useState(null);
  const [updateOrders] = useUpdateOrdersMutation();
  const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), []);
  function handleEdit(id) {
    setEditMode(id);
  }
  // pagination setup
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: tableOrderData,
      defaultColumn,
      autoResetRowState: true,
      editMode,
      handleEdit,
      updatedData,
      setReadyUpdate,
      updateOrders,
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowState
  );
  const { globalFilter, pageIndex, pageSize } = state;
  console.log(pageOptions);
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-6 py-3">
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {
                        // : cell.column.Header == "Date" ? (
                        //   new Date(cell.value).toLocaleDateString()
                        // )
                        cell.render("Cell")
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pl-5 flex w-full items-center gap-5 pb-4 pt-4 shadow-md sm:rounded-lg">
        <span class="flex gap-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {pageIndex + 1}
          </span>{" "}
          of{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {pageOptions.length}
          </span>
        </span>
        <div className="flex gap-2 items-center text-sm font-normal text-gray-500 dark:text-gray-400">
          <span className=" whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400">
            | Go to page:{" "}
          </span>
          <input
            className="block p-1 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg w-20 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </div>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className=" ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 rounded"
        >
          {[5, 7, 10, 15, 20, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show <strong> {pageSize} </strong> Rows
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button
          className={`${
            !canPreviousPage ? "text-[red]" : "text-gray-500"
          } flex items-center justify-center text-sm font-normal px-3 h-8 leading-tight bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className={`${
            !canNextPage ? "text-[red]" : "text-gray-500"
          } flex items-center justify-center text-sm font-normal px-3 h-8 leading-tight  bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};

export default Orders;
