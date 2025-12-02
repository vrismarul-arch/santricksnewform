import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await api.post("/api/admin/login", values);
      localStorage.setItem("adminToken", res.data.token);
      message.success("Login Successful!");
      navigate("/admin/dashboard");
    } catch {
      message.error("Invalid Credentials");
    }
    setLoading(false);
  };

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }}>
      <Card title="Admin Login" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
