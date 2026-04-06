import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import type {
  EditUser,
  UserErrorResponse,
  UserResponse,
} from "../types/user.types";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { editUser, getUser } from "../features/user/userSlice";

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<EditUser | null>(null);
  const { error, setError } = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(editUser(formData!));
    console.log(result);
    if (editUser.fulfilled.match(result)) {
      navigate("/admin");
    }
    if (editUser.rejected.match(result)) {
      setError(result.payload?.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const fetchUser = async () => {
    const data = await dispatch(getUser(id!));
    if (getUser.fulfilled.match(data)) {
      console.log("Data: ", data.payload);
      const { gender, role, ...rest } = data.payload;
      setFormData(rest);
    }
    if (getUser.rejected.match(data)) {
      if (data.payload?.statusCode == 401) {
        navigate("/admin");
      }
      setError(data.payload?.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!formData) {
    return null;
  }

  return (
    <div>
      <div>
        <h1>Edit User</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="strret">Street:</label>
            <input
              type="text"
              placeholder="Street"
              name="street"
              id="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="state">State:</label>
            <input
              type="text"
              placeholder="State"
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              placeholder="country"
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              type="text"
              placeholder="Zip Code"
              name="zipCode"
              id="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div>
            <input type="submit" />
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
