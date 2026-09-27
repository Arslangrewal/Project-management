"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUsers } from "@/redux/slices/usersSlice";

import UserStats from "@/components/users/UserStats";
import UsersTable from "@/components/users/UsersTable";
import { toast } from "sonner";

export default function UsersPage() {
  const dispatch = useDispatch();

  const users = useSelector(
    (state) => state.users.users
  );

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch("/api/users");

      const data = await response.json();

      dispatch(setUsers(data));
    }

    loadUsers();
  }, [dispatch]);



  const handleRoleChange = async (
    userId,
    role
  ) => {
    try {
      const response = await fetch(
        `/api/users/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            role,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error("Failed to update the role");


        return;
      }

      const updatedUsers = users.map((user) =>
        user.id === userId
          ? { ...user, role }
          : user
      );

      dispatch(setUsers(updatedUsers));

      toast.success("Role updated successfully.");



    } catch (error) {
      console.error(
        "Role update error:",
        error
      );

      alert(
        "Something went wrong while updating the role."
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: "DELETE",
        headers: {
          "x-user-role": currentUser?.role,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to delete user.");
        return;
      }

      // Remove deleted user from Redux state
      const updatedUsers = users.filter(
        (user) => user.id !== userId
      );

      dispatch(setUsers(updatedUsers));

      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting the user.");
    }
  };

  return (
    <div className="space-y-6">
      <UserStats users={users} />

      <UsersTable
        users={users}
        currentUserRole={currentUser?.role}
        handleRoleChange={handleRoleChange}
        handleDeleteUser={handleDeleteUser}
      />
    </div>



  );



}