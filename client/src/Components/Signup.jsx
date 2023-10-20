import React from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="login-container">
      <div className="img-container">
        <img
          src="https://img.freepik.com/premium-vector/chat-app-logo-design-vector_18099-2967.jpg"
          alt="logo"
          className="welcome-logo"
        />
      </div>

      <div className="login-box">
        <p className="login-text">Create your account</p>
        <TextField
          id="standard-basic"
          label="Enter Your Name"
          variant="outlined"
        />
        <TextField
          id="standard-basic"
          label="Enter Your Email"
          variant="outlined"
        />
        <TextField
          id="standard-basic"
          label="Enter Your Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="outlined">Register</Button>
        <h4>
          Already have acoount please <Link to={"/"}>Login</Link>
        </h4>
      </div>
    </div>
  );
};

export default SignUp;
