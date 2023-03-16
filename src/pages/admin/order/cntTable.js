import React from "react";
import { useFetchOrdersQuery } from "../../../redux/features/slices/ordersSlice";
import { ordersTableColumns } from "./orderData";
import Orders from "./Orders";

function CntTable() {
  const { data: ordersData, isLoading } = useFetchOrdersQuery();
  if (isLoading) return <h1>Loading, please wait a moment</h1>;
  return (
    <div className="overflow-x-auto">
      <Orders ordersData={ordersData} ordersTableColumns={ordersTableColumns} />
    </div>
  );
}

export default CntTable;
