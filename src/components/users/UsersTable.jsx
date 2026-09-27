"use client";

import UserRoleBadge from "./UserRoleBadge";
import { useSelector } from "react-redux";


export default function UsersTable({
  users,
  currentUserRole,
  handleRoleChange,
  handleDeleteUser,

}) {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-800 overflow-hidden">

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-neutral-800 sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                User
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/60 transition-colors"
                >
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    {currentUserRole === "SUPER_ADMIN" ? (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user.id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="SUPER_ADMIN">
                          Super Admin
                        </option>

                        <option value="ADMIN">
                          Admin
                        </option>

                        <option value="EDITOR">
                          Editor
                        </option>
                      </select>
                    ) : (
                      <UserRoleBadge role={user.role} />
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {(() => {
                      const isActive = currentUser?.id === user.id;

                      return (
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${isActive
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"
                              }`}
                          />
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      );
                    })()}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(
                      user.createdAt || user.joinedAt
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {currentUserRole === "SUPER_ADMIN" && currentUser?.id !== user.id && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="rounded-lg border border-red-600 px-3 py-2 text-sm text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                     
                     >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-16 text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                      👥
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      No Users Found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Users will appear here once they register.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}