import React, { useMemo, useState } from "react";
import { useTable, useRowState } from "react-table";
import { useUpdateOrdersMutation } from "../../redux/features/slices/ordersSlice";
// import { useFetchOrdersQuery } from "../../redux/features/slices/ordersSlice";

// const data = [
//   {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     status: "Completed",
//     date: "2022-12-25",
//   },
//   {
//     name: "Jane Doe",
//     email: "jane.doe@example.com",
//     status: "UnPaid",
//     date: "2022-11-11",
//   },
//   {
//     name: "Bob Smith",
//     email: "bob.smith@example.com",
//     status: "Paid",
//     date: "2022-10-10",
//   },
// ];

const Table = ({ ordersData, ordersTableColumns }) => {
  // const [tableData, setTableData] = useState(data);
  const tableOrderData = useMemo(() => ordersData, [ordersData]);
  const columns = useMemo(() => ordersTableColumns, []);
  const [editMode, setEditMode] = useState(null);
  const [updatedData, setReadyUpdate] = useState(null);
  const [updateOrders] = useUpdateOrdersMutation();
  console.log(tableOrderData);
  function handleEdit(id) {
    setEditMode(id);
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data: tableOrderData,
      //  tableOrderData ? tableOrderData : [],
      autoResetRowState: true,

      // updateMyData: (rowIndex, columnId, value) => {
      //   setTableData((old) =>
      //     old.map((row, index) => {
      //       if (index === rowIndex) {
      //         return {
      //           ...row,
      //           [columnId]: value,
      //         };
      //       }
      //       return row;
      //     })
      //   );
      // },
      editMode,
      handleEdit,
      updatedData,
      setReadyUpdate,
      updateOrders,
    },
    useRowState
  );
  //   console.log(rows);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
