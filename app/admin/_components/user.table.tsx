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
    <div className="p-6 bg-[var(--background)] min-h-screen">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Users</h1>

        <Link href="/admin/users/create">
          <button className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--primary-dark)] transition">
            Create User
          </button>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[var(--card-bg)] rounded-lg shadow-md border border-[var(--border)] p-4">
          <p className="text-[var(--secondary-foreground)] text-sm font-medium mb-1">Total Users</p>
          <p className="text-3xl font-bold text-[var(--primary)]">{stats.total}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeFilter === "all"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--secondary)]/80"
          }`}
        >
          All Users
        </button>

        <button
          onClick={() => handleFilterChange("farmer")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeFilter === "farmer"
              ? "bg-[var(--info)] text-white"
              : "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--secondary)]/80"
          }`}
        >
          Farmers ({stats.farmers})
        </button>

        <button
          onClick={() => handleFilterChange("consumer")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeFilter === "consumer"
              ? "bg-[var(--warning)] text-white"
              : "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--secondary)]/80"
          }`}
        >
          Consumers ({stats.consumers})
        </button>
      </div>

      <div className="overflow-x-auto bg-[var(--card-bg)] shadow-md rounded-xl border border-[var(--border)]">
        <table className="min-w-full text-sm text-left text-[var(--foreground)]">
          <thead className="bg-[var(--primary)] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-[var(--secondary)] transition duration-150 cursor-pointer"
                  onClick={() =>
                    router.push(`/admin/users/${user._id}?role=${user.role}`)
                  }
                >
                  <td className="py-4 px-6 font-medium text-[var(--foreground)]">
                    {user._id}
                  </td>

                  <td className="py-4 px-6 text-[var(--foreground)]">{user.fullName}</td>

                  <td className="py-4 px-6 text-[var(--secondary-foreground)]">{user.email}</td>

                  <td className="py-4 px-6">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                      {user.role}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 flex justify-center gap-2">
                    <button
                      className="px-3 py-1.5 text-sm font-medium text-[var(--primary)] border border-[var(--primary-light)] rounded-lg hover:bg-[var(--primary-light)] transition"
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
                      className="px-3 py-1.5 text-sm font-medium text-[var(--error)] border border-[var(--error-light)] rounded-lg hover:bg-[var(--error-light)] transition"
                      onClick={(e) => handleDeleteClick(user, e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 px-6 text-center text-[var(--secondary-foreground)]">
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
              ? "pointer-events-none opacity-50 border-[var(--border)] text-[var(--secondary-foreground)]"
              : "border-[var(--primary-light)] text-[var(--primary)] hover:bg-[var(--primary-light)]"
          }`}
            >
              ← Previous
            </Link>

            {/* Page Info */}
            <div className="px-4 py-2 bg-[var(--primary-light)] text-[var(--primary)] text-sm font-semibold rounded-lg shadow-sm">
              Page {pagination.page} of {pagination.totalPages}
            </div>

            {/* Next Button */}
            <Link
              href={`/admin/users?page=${pagination.page + 1}&size=${pagination.size}`}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
          ${
            pagination.page === pagination.totalPages
              ? "pointer-events-none opacity-50 border-[var(--border)] text-[var(--secondary-foreground)]"
              : "border-[var(--primary-light)] text-[var(--primary)] hover:bg-[var(--primary-light)]"
          }`}
            >
              Next →
            </Link>
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[var(--card-bg)] rounded-xl shadow-lg p-6 w-[350px] border border-[var(--border)]">
            <h2 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Confirm Delete</h2>

            <p className="text-[var(--secondary-foreground)] mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedUser?.fullName}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--secondary)] text-[var(--foreground)]"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-[var(--error)] text-white rounded-lg hover:bg-[var(--error)]/80 disabled:opacity-50"
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
