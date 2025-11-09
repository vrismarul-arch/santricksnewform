import React from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">

        <div className="success-icon">
          <span>✔</span>
        </div>

        <h2 className="success-title">Booking Confirmed!</h2>

        <p className="success-message">
          Thank you for booking with <strong>Sand Tricks</strong>.
        </p>
        <p className="success-subtext">
          Your request has been successfully received. <br />
          Our team will contact you shortly to finalize details.
        </p>

        <div className="info-box">
          <p>📞 Customer Support Available 24/7</p>
          <p>💬 WhatsApp: +91 98765 43210</p>
          <p>📍 Tamil Nadu, India</p>
        </div>

        <button className="home-btn" onClick={() => navigate("/")}>
          Go to Home
        </button>

      </div>
    </div>
  );
};

export default SuccessPage;
