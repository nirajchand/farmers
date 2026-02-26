"use client";

import { handleDeleteUser } from "@/lib/actions/admin/user_action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UserTable({
  data,
  pagination,
}: {
  data: any[];
  pagination: any;
}) {
  const router = useRouter();

  const [users, setUsers] = useState(data);
  const [filteredUsers, setFilteredUsers] = useState(data);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "farmer" | "consumer"
  >("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Stats state
  const [stats, setStats] = useState({
    total: 0,
    farmers: 0,
    consumers: 0,
  });

  useEffect(() => {
    setUsers(data);
    // Calculate stats
    const total = pagination.total;
    const farmers = data.filter((u) => u.role === "farmer").length;
    const consumers = data.filter((u) => u.role === "consumer").length;

    setStats({
      total,
      farmers,
      consumers,
    });

    // Apply filter
    applyFilter(data, activeFilter);
  }, [data, activeFilter]);

  const applyFilter = (
    userList: any[],
    filter: "all" | "farmer" | "consumer",
  ) => {
    if (filter === "all") {
      setFilteredUsers(userList);
    } else if (filter === "farmer") {
      setFilteredUsers(userList.filter((u) => u.role === "farmer"));
    } else if (filter === "consumer") {
      setFilteredUsers(userList.filter((u) => u.role === "consumer"));
    }
  };

  const handleFilterChange = (filter: "all" | "farmer" | "consumer") => {
    setActiveFilter(filter);
    applyFilter(users, filter);
  };

  const handleDeleteClick = (user: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      await handleDeleteUser(selectedUser._id);
      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
      setFilteredUsers((prev) =>
        prev.filter((u) => u._id !== selectedUser._id),
      );
      toast.success("User deleted successfully");
      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>

        <Link href="/admin/users/create">
          <button className="bg-[#15A305] text-white px-4 py-2 rounded hover:bg-[#008000] transition">
            Create User
          </button>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md border border-green-100 p-4">
          <p className="text-gray-600 text-sm font-medium mb-1">Total Users</p>
          <p className="text-3xl font-bold text-green-600">{stats.total}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeFilter === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All Users
        </button>

        <button
          onClick={() => handleFilterChange("farmer")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeFilter === "farmer"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Farmers ({stats.farmers})
        </button>

        <button
          onClick={() => handleFilterChange("consumer")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeFilter === "consumer"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Consumers ({stats.consumers})
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-green-100">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-green-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-green-50">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-green-50 transition duration-150 cursor-pointer"
                  onClick={() =>
                    router.push(`/admin/users/${user._id}?role=${user.role}`)
                  }
                >
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {user._id}
                  </td>

                  <td className="py-4 px-6">{user.fullName}</td>

                  <td className="py-4 px-6 text-gray-600">{user.email}</td>

                  <td className="py-4 px-6">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      {user.role}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 flex justify-center gap-2">
                    <button
                      className="px-3 py-1.5 text-sm font-medium text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/admin/users/${user._id}/edit?role=${user.role}`,
                        );
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                      onClick={(e) => handleDeleteClick(user, e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 px-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        {pagination && (
          <>
            {/* Previous Button */}
            <Link
              href={`/admin/users?page=${pagination.page - 1}&size=${pagination.size}`}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
          ${
            pagination.page === 1
              ? "pointer-events-none opacity-50 border-gray-200 text-gray-400"
              : "border-green-200 text-green-700 hover:bg-green-50"
          }`}
            >
              ← Previous
            </Link>

            {/* Page Info */}
            <div className="px-4 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-lg shadow-sm">
              Page {pagination.page} of {pagination.totalPages}
            </div>

            {/* Next Button */}
            <Link
              href={`/admin/users?page=${pagination.page + 1}&size=${pagination.size}`}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
          ${
            pagination.page === pagination.totalPages
              ? "pointer-events-none opacity-50 border-gray-200 text-gray-400"
              : "border-green-200 text-green-700 hover:bg-green-50"
          }`}
            >
              Next →
            </Link>
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedUser?.fullName}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                onClick={confirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
