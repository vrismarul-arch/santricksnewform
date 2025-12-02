import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  CalendarOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./logo.png";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
    },{
      key: "/admin/calendar",
      icon: <CalendarOutlined />,
      label: <NavLink to="/admin/calendar">Event Calendar</NavLink>,
    },
    {
      key: "/admin/entries",
      icon: <TableOutlined />,
      label: <NavLink to="/admin/entries">Entries</NavLink>,
    },
    
   
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={230}
      style={{
        minHeight: "100vh",
        background: "#fff",
        borderRight: "1px solid #eee",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ padding: 16, textAlign: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: collapsed ? "40px" : "110px",
            transition: "0.3s",
          }}
        />
      </div>

      <Menu
        mode="inline"
        theme="light"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ marginTop: 10, fontWeight: 500 }}
      />
    </Sider>
  );
};

export default Sidebar;
