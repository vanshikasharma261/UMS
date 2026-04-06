import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { clearFormError, getUsers } from "../features/user/userSlice";
import { clearError } from "../features/user/userSlice";
import DeleteUser from "./DeleteUser";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const fetchUsers = async () => {
    const result = await dispatch(getUsers());
    if (getUsers.rejected.match(result)) {
      if (result.payload?.statusCode == 401) {
        navigate("/");
      }
    } else {
      console.log("users are coming");
    }
  };

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearFormError());
    fetchUsers();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/admin/create");
  };

  const handleDelete = (id: string) => {
    setDeleteFlag(true);
    setDeleteId(id);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* spinner */}
          <div
            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
            style={{
              borderColor: "var(--color-accent)",
              borderTopColor: "transparent",
            }}
          />
          <span
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--color-accent)" }}
          >
            Admin Dashboard
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            {users?.length ?? 0} users registered
          </p>
        </div>

        {/* Create User button */}
        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-150"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-primary-dark)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-accent-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-accent)")
          }
          onClick={handleCreate}
        >
          + Create User
        </button>
      </div>
      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          borderColor: "var(--color-primary-light)",
          backgroundColor: "var(--color-primary-light)",
        }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "var(--color-primary-dark)" }}>
              {["First Name", "Last Name", "Email", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-accent)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr
                key={user.id}
                className="transition-colors duration-150"
                style={{
                  backgroundColor:
                    i % 2 === 0
                      ? "var(--color-primary-light)"
                      : "var(--color-primary)",
                  borderTop: "1px solid var(--color-primary-dark)",
                }}
              >
                <td
                  className="px-6 py-4 font-medium"
                  style={{ color: "var(--color-surface)" }}
                >
                  {user.firstName}
                </td>
                <td
                  className="px-6 py-4"
                  style={{ color: "var(--color-surface)" }}
                >
                  {user.lastName}
                </td>
                <td
                  className="px-6 py-4"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 cursor-pointer"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-primary-dark)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--color-accent-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--color-accent)")
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 cursor-pointer"
                      style={{
                        backgroundColor: "transparent",
                        color: "#f87171",
                        border: "1px solid #f87171",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f87171";
                        e.currentTarget.style.color = "var(--color-surface)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#f87171";
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {users?.length === 0 && (
          <div
            className="text-center py-16"
            style={{ color: "var(--color-text-muted)" }}
          >
            No users found.
          </div>
        )}
      </div>
      {deleteFlag && (
        <DeleteUser
          id={deleteId}
          onCancel={() => setDeleteFlag(false)}
          onSuccess={() => {
            setDeleteFlag(false);
          }}
        />
      )}
    </div>
  );
}
