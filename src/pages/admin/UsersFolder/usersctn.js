import React from "react";
import { useFetchUsersQuery } from "../../../redux/features/slices/userSlice";
import Users from "./users";
import { usersTableColumns } from "./usersDataTable";

function AllUsers() {
  const { data: usersData, isLoading } = useFetchUsersQuery();
  if (isLoading)
    return <h1 className="text-center">Loading, please wait a moment</h1>;
  console.log(usersData);
  return (
    <div className="overflow-x-auto s:ml-[200px] relative">
      <Users usersData={usersData} usersTableColumns={usersTableColumns} />
    </div>
  );
}

export default AllUsers;
