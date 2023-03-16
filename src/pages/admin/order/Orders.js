import React, { useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  useRowState,
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
    rows,
    prepareRow,
    state,
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
    useRowState
  );
  const { globalFilter } = state;
  console.log(tableOrderData);
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
    </>
  );
};

export default Orders;
