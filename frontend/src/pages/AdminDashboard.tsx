import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button className="mt-2 bg-[#ffdf00] hover:bg-[#e6c800] text-[#0b3d2c] font-bold py-2 rounded-lg transition disabled:opacity-50">
        Get Users
      </button>
    </div>
  );
}
