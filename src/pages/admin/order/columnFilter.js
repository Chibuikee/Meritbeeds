export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span className="absolute left-[200px] top-0 bg-red-600">
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
