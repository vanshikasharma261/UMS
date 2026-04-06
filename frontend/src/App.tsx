import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateUser />} />
        <Route path="/admin/edit/:id" element={<EditUser />} />
        <Route path="/user" element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}
