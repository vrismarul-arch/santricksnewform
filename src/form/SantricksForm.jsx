import { useState } from "react";
import { Form, Input, Select, DatePicker, Checkbox, Button, Steps, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./SantricksForm.css";

const { Option } = Select;
const { Step } = Steps;

const SantricksForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    eventType: "",
    name: "",
    date: null,
    venue: "",
    audizeSize: "",
    duration: "",
    addOns: {
      portrait: false,
      makingVideo: false,
      musicSync: false,
      customTheme: false,
      liveMode: false
    },
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  });

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (name, value) => {
    if (name in formData.addOns) {
      setFormData({ ...formData, addOns: { ...formData.addOns, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        date: formData.date ? formData.date.format("YYYY-MM-DD") : null
      };

      await api.post("/api/entries/add", payload);

      message.success("Form submitted successfully!");
      navigate("/success");
    } catch (err) {
      console.error(err);
      message.error("Something went wrong!");
      navigate("/failure");
    }
  };

  const steps = [
    {
      title: "Event Details",
      content: (
        <Form layout="vertical">
          <Form.Item label="Event Type*" required>
            <Select value={formData.eventType} onChange={(v) => handleChange("eventType", v)}>
              <Option value="Corporate Live Show">Corporate Live Show</Option>
              <Option value="Wedding Event">Wedding Event</Option>
              <Option value="Birthday Celebration">Birthday Celebration</Option>
              <Option value="Portrait Gifting">Portrait Gifting</Option>
              <Option value="Corporate Pre-Shoot">Corporate Pre-Shoot</Option>
              <Option value="Sand Lightboard">Sand Lightboard</Option>
              <Option value="Name Revealing Ceremony">Name Revealing Ceremony</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Event Name">
            <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
          </Form.Item>

          <Form.Item label="Event Date*" required>
            <DatePicker
              style={{ width: "100%" }}
              value={formData.date}
              onChange={(d) => handleChange("date", d)}
            />
          </Form.Item>

          <Form.Item label="Venue / Location">
            <Input value={formData.venue} onChange={(e) => handleChange("venue", e.target.value)} />
          </Form.Item>

          <Form.Item label="Audience Size*" required>
            <Select value={formData.audizeSize} onChange={(v) => handleChange("audizeSize", v)}>
              <Option value="0-50">0-50</Option>
              <Option value="51-100">51-100</Option>
              <Option value="101-200">101-200</Option>
              <Option value="201-500">201-500</Option>
              <Option value="500+">500+</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Event Duration*" required>
            <Select value={formData.duration} onChange={(v) => handleChange("duration", v)}>
              <Option value="1 Hour">1 Hour</Option>
              <Option value="2 Hours">2 Hours</Option>
              <Option value="3 Hours">3 Hours</Option>
              <Option value="Half Day">Half Day</Option>
              <Option value="Full Day">Full Day</Option>
            </Select>
          </Form.Item>
        </Form>
      )
    },
    {
      title: "Add-ons",
      content: (
        <Form layout="vertical">
          <Checkbox.Group
            value={Object.keys(formData.addOns).filter((k) => formData.addOns[k])}
            onChange={(checked) => {
              const updated = { ...formData.addOns };
              Object.keys(updated).forEach((k) => (updated[k] = checked.includes(k)));
              setFormData({ ...formData, addOns: updated });
            }}
          >
            <Checkbox value="portrait">Portrait</Checkbox>
            <Checkbox value="makingVideo">Making Video</Checkbox>
            <Checkbox value="musicSync">Music Sync</Checkbox>
            <Checkbox value="customTheme">Custom Theme</Checkbox>
            <Checkbox value="liveMode">Live Mode</Checkbox>
          </Checkbox.Group>
        </Form>
      )
    },
    {
      title: "Contact Info",
      content: (
        <Form layout="vertical">
          <Form.Item label="Your Name*" required>
            <Input value={formData.contactName} onChange={(e) => handleChange("contactName", e.target.value)} />
          </Form.Item>

          <Form.Item label="Your Email*" required>
            <Input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Your Phone*" required>
            <Input
              value={formData.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
            />
          </Form.Item>
        </Form>
      )
    },
    {
      title: "Summary",
      content: (
        <Card bordered>
          <p><strong>Event Type:</strong> {formData.eventType}</p>
          <p><strong>Event Name:</strong> {formData.name}</p>
          <p><strong>Date:</strong> {formData.date?.format("YYYY-MM-DD")}</p>
          <p><strong>Venue:</strong> {formData.venue}</p>
          <p><strong>Audience Size:</strong> {formData.audizeSize}</p>
          <p><strong>Duration:</strong> {formData.duration}</p>
          <p><strong>Add-ons:</strong> {Object.keys(formData.addOns).filter(k => formData.addOns[k]).join(", ") || "None"}</p>
          <p><strong>Contact Name:</strong> {formData.contactName}</p>
          <p><strong>Contact Email:</strong> {formData.contactEmail}</p>
          <p><strong>Contact Phone:</strong> {formData.contactPhone}</p>
        </Card>
      )
    }
  ];

  return (
    <div className="hero-container">
      
      {/* ⭐ Hero Banner Added */}
      <div className="hero-banner">
        <h1 className="hero-title">Book Your Sand Art Event</h1>
        <p className="hero-sub">One step at a time — We guide you through the process</p>
      </div>

      <div className="form-container">
        <Steps current={step} responsive>
          {steps.map((s, index) => <Step key={index} title={s.title} />)}
        </Steps>

        <div className="step-content" style={{ marginTop: 20 }}>
          {steps[step].content}
        </div>

        <div className="form-navigation">
          {step > 0 && <Button onClick={prevStep}>Back</Button>}
          {step < steps.length - 1 && <Button type="primary" onClick={nextStep}>Next</Button>}
          {step === steps.length - 1 && <Button type="primary" onClick={handleSubmit}>Submit</Button>}
        </div>
      </div>
    </div>
  );
};

export default SantricksForm;
