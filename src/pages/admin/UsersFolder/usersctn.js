import React from "react";
import { useFetchUsersQuery } from "../../../redux/features/slices/userSlice";
import Users from "./users";
import { usersTableColumns } from "./usersDataTable";
import LoadingSpinner from "../../../components/LoadingSpinner";

function AllUsers() {
  const { data: usersData, isLoading } = useFetchUsersQuery();
  if (isLoading) return <LoadingSpinner />;
  // console.log(usersData);
  return (
    <div className="overflow-x-auto s:ml-[200px] relative">
      <Users usersData={usersData} usersTableColumns={usersTableColumns} />
    </div>
  );
}

export default AllUsers;
