import { deleteUser } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type Props = {
  id: string;
  onCancel: () => void;
  onSuccess: () => void;
};

export default function DeleteUser({ id, onCancel, onSuccess }: Props) {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.formError);
  const loading = useAppSelector((state) => state.user.loading);

  const handleDelete = async () => {
    const response = await dispatch(deleteUser(id));
    if (deleteUser.fulfilled.match(response)) {
      onSuccess();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      {/* Modal card */}
      <div
        className="rounded-2xl p-8 w-full max-w-md border"
        style={{
          backgroundColor: "var(--color-primary-light)",
          borderColor: "var(--color-primary-dark)",
        }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full mb-6 mx-auto"
          style={{
            backgroundColor: "rgba(248,113,113,0.15)",
            border: "1px solid #f87171",
          }}
        >
          <span style={{ color: "#f87171", fontSize: 28 }}>!</span>
        </div>

        <h2
          className="text-xl font-bold text-center mb-2"
          style={{ color: "var(--color-surface)" }}
        >
          Delete User
        </h2>
        <p
          className="text-sm text-center mb-6"
          style={{ color: "var(--color-text-muted)" }}
        >
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-900/30 border border-red-500/40">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors duration-150 disabled:opacity-50"
            style={{ backgroundColor: "#f87171", color: "white" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#ef4444")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f87171")
            }
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-150 border"
            style={{
              borderColor: "var(--color-primary-dark)",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-primary-dark)")
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
