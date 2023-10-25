import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const userProps = user?.data?.name;

  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }
  return (
    <div className="welcome-container">
      <img
        src="https://img.freepik.com/premium-vector/chat-app-logo-design-vector_18099-2967.jpg"
        alt="logo"
        className="welcome-logo"
      />
      <span>Hi,{userProps} 💪</span>
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  );
};

export default Welcome;
