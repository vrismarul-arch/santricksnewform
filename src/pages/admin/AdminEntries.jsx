import React, { useEffect, useState } from "react";
import { Table, Tag, Select, DatePicker, Button, Space } from "antd";
import dayjs from "dayjs";
import api from "../../api/api";
import toast from "react-hot-toast";

const { Option } = Select;

const AdminEntries = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await api.get("/api/entries");
      setEntries(res.data.entries);
      setFilteredEntries(res.data.entries);
      toast.success("Entries Loaded ✔");
    } catch {
      toast.error("Failed to fetch entries ❌");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/entries/${id}/status`, { status: newStatus });
      toast.success("Status Updated ✔");
      fetchEntries();
    } catch {
      toast.error("Status Update Failed ❌");
    }
  };

  const filterByDate = (date) => {
    setSelectedDate(date);
    if (!date) {
      setFilteredEntries(entries);
      toast("Showing all entries");
      return;
    }

    const formattedDate = date.format("YYYY-MM-DD");
    const filtered = entries.filter((e) => e.date === formattedDate);

    setFilteredEntries(filtered);

    if (filtered.length === 0) {
      toast.error("No events found on selected date ❌");
    } else {
      toast.success("Filtered by date ✔");
    }
  };

  const clearFilter = () => {
    setSelectedDate(null);
    setFilteredEntries(entries);
    toast("Filter cleared ✔");
  };

  const columns = [
    { title: "Client", dataIndex: "contactName" },
    { title: "Event", dataIndex: "eventType" },
    { title: "Date", dataIndex: "date" },
    { title: "Phone", dataIndex: "contactPhone" },
    { title: "Email", dataIndex: "contactEmail" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, row) => (
        <Select
          value={status}
          style={{ width: 130 }}
          onChange={(val) => updateStatus(row._id, val)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      )
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin — Booking Entries</h2>

      <Space style={{ marginBottom: 15 }}>
        <DatePicker
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={filterByDate}
          placeholder="Filter by Date"
        />
        <Button onClick={clearFilter}>Clear</Button>
      </Space>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredEntries}
        loading={loading}
        bordered
      />
    </div>
  );
};

export default AdminEntries;
