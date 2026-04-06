import { useState } from "react";
import type { CreateUser } from "../types/user.types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createUser } from "../features/user/userSlice";

export default function CreateUser() {
  const initialData: CreateUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    city: "",
    street: "",
    state: "",
    country: "",
    zipCode: "",
  };
  const [formData, setFormData] = useState<CreateUser>(initialData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formError = useAppSelector((state) => state.user.formError);
  const loading = useAppSelector((state) => state.user.loading);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(createUser(formData));
    if (createUser.fulfilled.match(result)) {
      navigate("/admin");
    }
  };

  const handleClose = () => {
    setFormData(initialData);
    navigate("/admin");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors duration-150 bg-[#072818] text-white placeholder-[#4a7a63] border border-[#145a3f] focus:ring-[#ffdf00] focus:border-[#ffdf00]";

  const labelClass =
    "text-xs font-semibold uppercase tracking-widest text-[#ffdf00]";

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
            Create User
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Fill in the details to register a new user
          </p>
        </div>
        <button
          onClick={handleClose}
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
        {formError && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-900/30 border border-red-500/40">
            <p className="text-red-400 text-sm">{formError}</p>
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
                  placeholder="Enter first name"
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
                  placeholder="Enter last name"
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
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              Gender
            </p>
            <div className="flex items-center gap-6">
              {["male", "female"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={handleChange}
                    className="accent-[#ffdf00] w-4 h-4 cursor-pointer"
                  />
                  <span
                    className="text-sm capitalize transition-colors duration-150"
                    style={{
                      color:
                        formData.gender === g
                          ? "var(--color-accent)"
                          : "var(--color-text-muted)",
                    }}
                  >
                    {g}
                  </span>
                </label>
              ))}
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
                  placeholder="Enter street"
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
                  placeholder="Enter city"
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
                  placeholder="Enter state"
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
                  placeholder="Enter country"
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
                  placeholder="Enter zip code"
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
              disabled={loading}
              className="px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors duration-150 disabled:opacity-50"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-primary-dark)",
              }}
              onMouseEnter={(e) => {
                if (!loading)
                  e.currentTarget.style.backgroundColor =
                    "var(--color-accent-hover)";
              }}
              onMouseLeave={(e) => {
                if (!loading)
                  e.currentTarget.style.backgroundColor = "var(--color-accent)";
              }}
            >
              {loading ? "Creating..." : "Create User"}
            </button>
            <button
              type="button"
              onClick={handleClose}
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
