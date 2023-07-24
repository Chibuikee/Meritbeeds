export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span className="absolute right-[100px] top-[52px]">
      Filter Orders:{" "}
      {/* <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      /> */}
      <select
        value={filterValue}
        //   value={{ label: initialValue, value: initialValue }}
        // placeholder={filterValue}
        onChange={(e) => setFilter(e.target.value)}
        //   onBlur={onBlur}
        className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 rounded"
      >
        <option value="" label="All">
          All
        </option>
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
    </span>
  );
};
