import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, message } from "antd";
import {
  ScheduleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import api from "../../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    upcoming: 0,
  });

  const [chartData, setChartData] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get("/api/entries");
      const data = res.data.entries;

      const today = dayjs();

      let monthlyCounts = Array(12).fill(0);

      data.forEach((e) => {
        const month = dayjs(e.date).month();
        monthlyCounts[month]++;

        if (e.status === "Pending") stats.pending++;
        if (e.status === "Completed") stats.completed++;

        if (dayjs(e.date).isAfter(today)) stats.upcoming++;
      });

      setStats({
        total: data.length,
        pending: stats.pending,
        completed: stats.completed,
        upcoming: stats.upcoming,
      });

      setChartData(
        monthlyCounts.map((count, i) => ({
          month: dayjs().month(i).format("MMM"),
          events: count,
        }))
      );

    } catch (err) {
      message.error("Failed to load dashboard data ❌");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <h2>📊 Dashboard</h2>

      {/* Metric Cards */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card bordered>
            <Statistic
              title="Total Bookings"
              value={stats.total}
              prefix={<ScheduleOutlined style={{ color: "#1677ff" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Statistic
              title="Upcoming Events"
              value={stats.upcoming}
              prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Statistic
              title="Completed"
              value={stats.completed}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Statistic
              title="Pending"
              value={stats.pending}
              prefix={<BarChartOutlined style={{ color: "#ff4d4f" }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Card title="📅 Monthly Events Summary">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="events" fill="#1677ff" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AdminDashboard;
