import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../features/auth/authSlice";

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#0b3d2c] shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-[#ffdf00]">UMS</div>
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">Current User</span>
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
