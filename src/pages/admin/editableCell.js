import React, { useState } from "react";

function EditableCell({ cell }) {
  // Define a custom cell renderer for editable cells
  const [editedCells, setEditedCells] = useState(new Set());

  if (editedCells.has(cell)) {
    return (
      <input
        value={cell.value}
        onChange={(e) => cell.setValue(e.target.value)}
      />
    );
  } else {
    return cell.render("Cell");
  }
}

export default EditableCell;
