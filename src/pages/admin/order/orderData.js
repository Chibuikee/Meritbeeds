import { format } from "date-fns";
import EditableCell from "../editableCell";

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
