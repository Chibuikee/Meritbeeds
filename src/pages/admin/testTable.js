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

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  //   updateMyData,
  setReadyUpdate,
  editMode,
  updatedData,
}) => {
  //   const [value, setValue] = useState(initialValue);
  //   console.log(value);
  const onChange = (e) => {
    // updateMyData(index, id, e.target.value);
    setReadyUpdate({ index, id, value: e.target.value });
  };

  //   const onBlur = () => {
  //     setReadyUpdate(null);
  //   };

  return id === "status" && index == editMode ? (
    <select
      value={updatedData?.value || initialValue}
      //   value={{ label: initialValue, value: initialValue }}
      placeholder={updatedData?.value || initialValue}
      onChange={onChange}
      //   onBlur={onBlur}
    >
      <option value="UnPaid" label="UnPaid">
        UnPaid
      </option>
      <option value="Completed" label="Completed">
        Completed
      </option>
      <option value="Paid" label="Paid">
        Paid
      </option>
    </select>
  ) : (
    <h1>{initialValue}</h1>
    //   return id === 'name' && row.isEditable ? (<input value={value} onChange={onChange} onBlur={onBlur} />  ) : (
    //     <h1>{initialValue}</h1>
  );
};

{
  /* <td {...cell.getCellProps()}>
  {cell.column.id === 'name' && row.isEditable ? (
    <input
      type="text"
      value={cell.value}
      onChange={e => {
        row.original.name = e.target.value;
        tableInstance.setData([...tableInstance.rows]);
      }}
    />
  ) : (
    cell.render('Cell')
  )}
</td> */
}

const columns = [
  {
    Header: "Name",
    accessor: "customerId.name",
    Cell: EditableCell,
  },
  {
    Header: "Email",
    accessor: "customerId.email",
    Cell: EditableCell,
  },
  {
    Header: "Status of Payment",
    accessor: "status",
    Cell: EditableCell,
  },
  // {
  //   Header: "Date of Payment",
  //   accessor: "date",
  //   Cell: EditableCell,
  // },
  {
    Header: "Actions",
    Cell: ({
      // value: initialValue,
      row: { index, original },
      column: { id },
      editMode,
      handleEdit,
      updatedData,
      setReadyUpdate,
      // updateMyData,
      updateOrders,
    }) => {
      const cancelReadyUpdate = () => {
        setReadyUpdate(null);
      };
      return (
        <div className="flex gap-2">
          {index !== editMode ? (
            // if index is not the same as editmode state allow to be set to editing mode on click
            <button
              className="basis-[50%] py-2 bg-[#ea00ff] mr-5"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
          ) : (
            <button
              className="basis-[50%] py-2 bg-[blue]"
              onClick={() => {
                // old.map((row, index) => {
                //     if (index === rowIndex) {
                //       return {
                //         ...row,
                //         [columnId]: value,
                //       };
                //     }

                // this logs to the console
                // readyUpdate &&
                //   console.log({
                //     ...original,
                //     [readyUpdate?.id]: readyUpdate?.value,
                //   });
                // readyUpdate &&
                //   updateMyData(
                //     readyUpdate?.index,
                //     readyUpdate?.id,
                //     readyUpdate?.value
                //   );

                // updates the firestore datatbase
                if (updatedData)
                  updateOrders({
                    productEditId: original.orderId,
                    formData: {
                      ...original,
                      [updatedData?.id]: updatedData?.value,
                    },
                  });
                //   reset editMode state after saving an item
                handleEdit(null);
                // reset the readyUpdate state after saving an item
                cancelReadyUpdate();
              }}
            >
              {/* {readyUpdate ? "Save" : <span onClick={onBlur}>Cancel</span>} */}
              Save
            </button>
          )}

          <button
            className="basis-[50%] py-2 bg-[red]"
            onClick={() => {
              // reset editMode state before resetting readyUpdate state
              handleEdit(null);
              //   reset readyUpdate state
              cancelReadyUpdate();
            }}
          >
            Cancel
          </button>
        </div>
      );
    },
  },
];

const Table = ({ ordersData }) => {
  console.log(ordersData);
  // const [tableData, setTableData] = useState(data);
  const tableOrderData = useMemo(() => ordersData, [ordersData]);
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
      setReadyUpdate,
      updatedData,
      handleEdit,
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
