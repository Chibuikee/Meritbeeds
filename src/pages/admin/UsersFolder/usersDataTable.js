import { format } from "date-fns";
import EditableCell from "../order/editableCell";
// import { ColumnFilter } from "./columnFilter";

export const tableData = [
  {
    avatar: "https://i.pravatar.cc/300",
    name: "Chandler Jacobi",
    amount: 989.4,
    status: "Completed",
    date: "2020-02-03T07:13:15.000Z",
  },
  {
    avatar: "https://i.pravatar.cc/300",
    name: "Monserrat Marquardt",
    amount: 471.44,
    status: "Un-paid",
    date: "2019-11-29T13:43:17.000Z",
  },
  {
    avatar: "https://i.pravatar.cc/300",
    name: "Lonie Wyman",
    amount: 934.24,
    status: "Paid",
    date: "2020-04-03T06:07:53.000Z",
  },
  {
    avatar: "https://i.pravatar.cc/300",
    name: "Corine Abernathy",
    amount: 351.28,
    status: "Paid",
    date: "2019-06-21T23:21:55.000Z",
  },
  {
    avatar: "https://i.pravatar.cc/300",
    name: "Lorenz Botsford",
    amount: 355.3,
    status: "Completed",
    date: "2019-08-28T18:31:43.000Z",
  },
  {
    avatar: "https://i.pravatar.cc/300",
    name: "Everette Botsford",
    amount: 525.42,
    status: "Paid",
    date: "2020-01-16T12:53:33.000Z",
  },
  {
    avatar: "https://i.pravatar.cc/300",
    name: "Marilou Beahan",
    amount: 414.99,
    status: "Paid",
    date: "2019-10-28T17:44:31.000Z",
  },
];

export const tableColumns = [
  {
    Header: "Bio",
    columns: [
      {
        Header: "Avatar",
        accessor: "avatar",
        disableFilters: true, // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name",
        // accessor is the "key" in the data
      },
    ], // accessor is the "key" in the data
  },

  {
    Header: "Order Details",
    columns: [
      {
        Header: "Amount",
        accessor: "amount",
        // accessor is the "key" in the data
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Date",
        accessor: "date",

        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },
      {
        Header: "Action",
        Cell: (
          <>
            {true ? (
              <button
              // onClick={() => handleSaveClick()}
              >
                Save
              </button>
            ) : (
              <button
              // onClick={() => handleEditClick(i)
              // }
              >
                Edit
              </button>
            )}
          </>
        ),
      },
    ],
  },
];

export const usersTableColumns = [
  {
    Header: "Picture",
    disableFilters: true,
    accessor: "userInfo.photoURL",
    Cell: ({ value }) => (
      <div className="flex gap-2 items-center">
        <img
          src={value ? value : "https://i.pravatar.cc/300"}
          className="h-10 w-10"
          alt="Customers"
        />
        {/* <h1>{value}</h1> */}
      </div>
    ),
  },
  {
    Header: "First Name",
    disableFilters: true,
    accessor: "userInfo.fname",
    Cell: EditableCell,
  },
  {
    Header: "Last Name",
    disableFilters: true,
    accessor: "userInfo.lname",
    Cell: EditableCell,
  },
  {
    Header: "Email",
    disableFilters: true,
    accessor: "userInfo.email",
    Cell: EditableCell,
  },
  // {
  //   Header: "User Id",
  //   disableFilters: true,
  //   accessor: "creationId",
  //   Cell: EditableCell,
  // },
  // {
  //   Header: "Status of Payment",
  //   accessor: "status",
  //   Cell: EditableCell,
  // },
  {
    Header: "Date",
    disableFilters: true,
    accessor: "userInfo.createdAt",
    Cell: ({ value }) => {
      return format(new Date(value.toDate()), "dd/MM/yyyy");
    },
  },
  {
    Header: "Actions",
    disableFilters: true,
    Cell: ({
      // value: initialValue,
      row: { index, original },
      //   column: { id },
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
        <div className="flex gap-1">
          {index !== editMode ? (
            // if index is not the same as editmode state allow to be set to editing mode on click
            <button
              className="basis-[50%] py-1 px-2 rounded-md text-sm bg-[#ea00ff] mr-3"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
          ) : (
            <button
              className="basis-[50%] py-1 px-2 rounded-md bg-[blue]"
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
              Save
            </button>
          )}

          <button
            className="basis-[50%] py-1 rounded-md px-1 text-sm bg-[red]"
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
