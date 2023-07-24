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
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
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
  // console.log(pageOptions);
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
              <tr
                {...row.getRowProps()}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
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
              {` Show ${pageSize} Rows`}
            </option>
          ))}
        </select>
        <div onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {/* < size={20} /> */}
        </div>
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
        </button>
        <div onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {/* <MdKeyboardDoubleArrowRight size={20} /> */}
        </div>
      </div>
    </>
  );
};

export default Users;

{
  /* <div id="dropdownRadio" class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);">
                <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                    <li>
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="filter-radio-example-1" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                        </div>
                    </li>
                   
                   
                </ul>
            </div> */
}
