import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { message, Card, Input, Button } from "antd";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return message.error("Email & Password required!");
    }

    try {
      const res = await api.post("/api/admin/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        message.success("Login Success!");
        navigate("/admin/dashboard");
      }
    } catch {
      message.error("Invalid Email or Password ❌");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card title="Admin Login" style={{ width: 350 }}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        <Button type="primary" block onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default AdminLogin;
