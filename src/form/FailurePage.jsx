import React from "react";
import { useNavigate } from "react-router-dom";
import "./FailurePage.css";

const FailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="failure-container">
      <div className="failure-card">

        <div className="failure-icon">
          <span>✖</span>
        </div>

        <h2 className="failure-title">Submission Failed</h2>

        <p className="failure-message">
          Unfortunately, we couldn't process your booking request.
        </p>

        <p className="failure-subtext">
          This may have occurred due to network issues or temporary server downtime. <br />
          Please try again shortly.
        </p>

        <div className="info-box">
          <p>📞 Need help? We’re here!</p>
          <p>💬 WhatsApp: +91 98765 43210</p>
          <p>📍 Tamil Nadu, India</p>
        </div>

        <button className="retry-btn" onClick={() => navigate("/")}>
          Try Again
        </button>

      </div>
    </div>
  );
};

export default FailurePage;
