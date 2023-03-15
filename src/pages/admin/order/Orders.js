import React, { useState, useMemo } from "react";
// import  { GlobalFilter } from "./globalFilter";

import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import { ColumnFilter } from "./columnFilter";
import { GlobalFilter } from "./globalFilter";
// import { NavLink } from "react-router-dom";
// import { BsHouse } from "react-icons/bs";
import { tableData, tableColumns } from "./orderData";
const Orders = () => {
  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => tableData, []);
  const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), []);
  // pagination setup
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useGlobalFilter,
    useSortBy
  );
  console.log(rows, "");
  const { globalFilter } = state;
  // GlobalFilter
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
          {rows.map((row) => {
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
                      {cell.column.Header == "Avatar" ? (
                        <img
                          src={`${cell.value}`}
                          alt="user"
                          className="h-10 w-10"
                        />
                      ) : (
                        // : cell.column.Header == "Date" ? (
                        //   new Date(cell.value).toLocaleDateString()
                        // )
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
