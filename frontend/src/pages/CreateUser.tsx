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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(createUser(formData));
    console.log(result);
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
  return (
    <div>
      <div>
        <h1>Create User</h1>
      </div>
      <div>
        {formError && <p>{formError}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              placeholder="Enter First Name"
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
              placeholder="Enter Last Name"
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
              placeholder="Enter Email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="gender">Gender:</label>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label htmlFor="femmale">Female:</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="firstName">Street:</label>
            <input
              type="text"
              placeholder="Enter Street"
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
              placeholder="Enter City"
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
              placeholder="Country"
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
            <button onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}
