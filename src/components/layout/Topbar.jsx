import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogoutOutlined } from "@ant-design/icons";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully!");
    navigate("/admin/login");
  };

  return (
    <div
      style={{
        height: 60,
        background: "#1a1a1a",
        borderBottom: "1px solid #333",
        padding: "0 20px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <button
        style={{
          padding: "8px 14px",
          borderRadius: 6,
          border: "1px solid #f44336",
          background: "#f44336",
          cursor: "pointer",
          color: "#fff",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        onClick={handleLogout}
      >
        <LogoutOutlined /> Logout
      </button>
    </div>
  );
};

export default Topbar;
