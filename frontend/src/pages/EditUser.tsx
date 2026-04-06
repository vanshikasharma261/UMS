import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import type { EditUser, UserResponse } from "../types/user.types";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUser } from "../features/user/userSlice";

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<EditUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCancel = () => navigate("/admin");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(editUser(formData!));
    if (editUser.fulfilled.match(result)) {
      navigate("/admin");
    }
    if (editUser.rejected.match(result)) {
      setError(result.payload?.message ?? "Something went wrong");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const fetchUser = async () => {
    const data = await dispatch(getUser(id!));
    if (getUser.fulfilled.match(data)) {
      const { gender, role, ...rest } = data.payload;
      setFormData(rest);
    }
    if (getUser.rejected.match(data)) {
      if (data.payload?.statusCode == 401) navigate("/");
      setError(data.payload?.message ?? "Failed to load user");
    }
  };

  useEffect(() => {
    fetchUser(); // eslint-disable-line
  }, []);

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors duration-150 bg-[#072818] text-white placeholder-[#4a7a63] border border-[#145a3f] focus:ring-[#ffdf00] focus:border-[#ffdf00]";

  const labelClass =
    "text-xs font-semibold uppercase tracking-widest text-[#ffdf00]";

  if (!formData) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-4 animate-spin"
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
            Edit User
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Update the details for {formData.firstName} {formData.lastName}
          </p>
        </div>
        <button
          onClick={handleCancel}
          className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-150 border"
          style={{
            borderColor: "var(--color-primary-light)",
            color: "var(--color-text-muted)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-primary-light)")
          }
        >
          ← Back
        </button>
      </div>

      {/* Form Card */}
      <div
        className="rounded-2xl p-8 border"
        style={{
          backgroundColor: "var(--color-primary-light)",
          borderColor: "var(--color-primary-dark)",
        }}
      >
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-900/30 border border-red-500/40">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="mb-6">
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              Personal Information
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className={labelClass}>
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lastName" className={labelClass}>
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-8">
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              Address
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label htmlFor="street" className={labelClass}>
                  Street
                </label>
                <input
                  type="text"
                  placeholder="Street"
                  name="street"
                  id="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="state" className={labelClass}>
                  State
                </label>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="country" className={labelClass}>
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="zipCode" className={labelClass}>
                  Zip Code
                </label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  name="zipCode"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className="flex items-center gap-3 pt-4 border-t"
            style={{ borderColor: "var(--color-primary-dark)" }}
          >
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors duration-150"
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
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-150 border"
              style={{
                borderColor: "var(--color-primary-dark)",
                color: "var(--color-text-muted)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor =
                  "var(--color-primary-dark)")
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
