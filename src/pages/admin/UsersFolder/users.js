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
import { ColumnFilter } from "../order/columnFilter";
import { GlobalFilter } from "../order/globalFilter";
// import { NavLink } from "react-router-dom";
// import { BsHouse } from "react-icons/bs";

const Users = ({ usersData, usersTableColumns }) => {
  const tableOrderData = useMemo(() => usersData, [usersData]);
  const columns = useMemo(() => usersTableColumns, []);
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
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
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
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
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
      <div>
        <span>
          page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 7, 10, 15, 20, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {` Show ${pageSize} Rows`}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button
          className={`${
            !canPreviousPage ? "text-[red]" : "text-[green]"
          } px-2 py-2`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          previous
        </button>
        <button
          className={`${
            !canNextPage ? "text-[red]" : "text-[green]"
          } px-2 py-2`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          next
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};

export default Users;
