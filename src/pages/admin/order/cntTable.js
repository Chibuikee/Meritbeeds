import React from "react";
import { useFetchOrdersQuery } from "../../../redux/features/slices/ordersSlice";
import { ordersTableColumns } from "./orderData";
import Orders from "./Orders";

function CntTable() {
  const { data: ordersData, isLoading } = useFetchOrdersQuery();
  if (isLoading)
    return <h1 className="text-center">Loading, please wait a moment</h1>;
  return (
    <div className="overflow-x-auto s:ml-[200px] relative">
      <Orders ordersData={ordersData} ordersTableColumns={ordersTableColumns} />
    </div>
  );
}

export default CntTable;
