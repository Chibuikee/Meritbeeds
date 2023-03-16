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

export default EditableCell;
