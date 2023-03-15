import React from "react";
import { useFetchOrdersQuery } from "../../redux/features/slices/ordersSlice";
import Table from "./testTable";

function CntTable() {
  const { data: ordersData, isLoading } = useFetchOrdersQuery();
  if (isLoading) return <h1>Loading, please wait a moment</h1>;
  return (
    <div>
      <Table ordersData={ordersData} />
    </div>
  );
}

export default CntTable;
