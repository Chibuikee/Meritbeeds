import React from "react";
import { useFetchOrdersQuery } from "../../../redux/features/slices/ordersSlice";
import { ordersTableColumns } from "./orderData";
import Orders from "./Orders";
import LoadingSpinner from "../../../components/LoadingSpinner";

function CntTable() {
  const { data: ordersData, isLoading } = useFetchOrdersQuery();
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="overflow-x-auto s:ml-[200px] relative">
      <Orders ordersData={ordersData} ordersTableColumns={ordersTableColumns} />
    </div>
  );
}

export default CntTable;
