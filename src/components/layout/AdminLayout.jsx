import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div style={{ marginLeft: 220, width: "100%" }}>
        <Topbar />
        <div style={{ padding: "20px" }}>
          {/* Nested Routes Render Here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
