import React, { useState, useEffect } from "react";
import { Calendar, Badge, Drawer, Card, Row, Col, Tag, message } from "antd";
import api from "../../api/api";
import dayjs from "dayjs";

const AdminCalendar = () => {
  const [entries, setEntries] = useState([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await api.get("/api/entries");
      setEntries(res.data.entries);
      message.success("Calendar events loaded ✔");
    } catch (err) {
      message.error("Failed to load calendar events ❌");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // 🔔 Auto-reminder for events in the next 3 days
  useEffect(() => {
    const today = dayjs();
    entries.forEach((event) => {
      const eventDate = dayjs(event.date);
      const diff = eventDate.diff(today, "day");
      if (diff >= 0 && diff <= 3) {
        message.warning(`🚨 Reminder: ${event.eventType} in ${diff} days`);
      }
    });
  }, [entries]);

  const getEvents = (date) =>
    entries.filter((e) => e.date === date.format("YYYY-MM-DD"));

  const openDrawer = (date) => {
    const events = getEvents(date);
    setSelectedDateEvents(events);
    setDrawerOpen(true);
  };

  const dateCellRender = (date) => {
    const data = getEvents(date);

    return data.map((event, i) => (
      <div
        key={i}
        style={{ padding: "2px 0", cursor: "pointer" }}
        onClick={() => openDrawer(dayjs(event.date))}
      >
        <Badge
          status={event.status === "Approved" ? "success" : "warning"}
          text={event.eventType}
        />
      </div>
    ));
  };

  const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Rejected":
        return "red";
      case "Completed":
        return "blue";
      default:
        return "orange";
    }
  };

  return (
    <>
      <h2>📅 Event Calendar</h2>

      <Calendar dateCellRender={dateCellRender} />

      <Drawer
        title="Event Details"
        width={450}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selectedDateEvents.length === 0 && (
          <p>No events found for this date.</p>
        )}

        {selectedDateEvents.map((item) => (
          <Card
            key={item._id}
            style={{
              marginBottom: 16,
              borderRadius: 10,
              boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: 6 }}>{item.eventType}</h3>

            <Tag color={statusColor(item.status)}>{item.status}</Tag>
            <br /><br />

            <Row>
              <Col span={10}><strong>Client:</strong></Col>
              <Col span={14}>{item.contactName}</Col>
            </Row>

            <Row>
              <Col span={10}><strong>Date:</strong></Col>
              <Col span={14}>{item.date}</Col>
            </Row>

            <Row>
              <Col span={10}><strong>Phone:</strong></Col>
              <Col span={14}>{item.contactPhone}</Col>
            </Row>

            <Row>
              <Col span={10}><strong>Venue:</strong></Col>
              <Col span={14}>{item.venue}</Col>
            </Row>

            <Row>
              <Col span={10}><strong>Audience:</strong></Col>
              <Col span={14}>{item.audizeSize}</Col>
            </Row>

            <Row>
              <Col span={10}><strong>Duration:</strong></Col>
              <Col span={14}>{item.duration}</Col>
            </Row>

            <Row style={{ marginTop: 10 }}>
              <Col span={10}><strong>Add-ons:</strong></Col>
              <Col span={14}>
                {item.addOns && Object.keys(item.addOns).some((k) => item.addOns[k]) ? (
                  Object.keys(item.addOns)
                    .filter((key) => item.addOns[key])
                    .map((key) => (
                      <Tag
                        key={key}
                        color="geekblue"
                        style={{ marginBottom: 5, textTransform: "capitalize" }}
                      >
                        {key.replace(/([A-Z])/g, " $1")}
                      </Tag>
                    ))
                ) : (
                  <Tag color="default">None</Tag>
                )}
              </Col>
            </Row>
          </Card>
        ))}
      </Drawer>
    </>
  );
};

export default AdminCalendar;
