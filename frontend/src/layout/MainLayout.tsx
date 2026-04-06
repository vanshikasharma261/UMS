import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import type { token } from "../types/auth.types";

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const { email } = jwtDecode<token>(token!);
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#0b3d2c] shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-[#ffdf00]">UMS</div>
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">{email}</span>
          <button
            className="bg-[#ffdf00] hover:bg-[#e6c800] text-[#0b3d2c] font-bold text-sm px-4 py-2 rounded-lg transition"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
