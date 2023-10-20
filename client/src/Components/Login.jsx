import React from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
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
        <p className="login-text">Login to you Account</p>
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
        <Button variant="outlined">Login</Button>
        <h4>
          If you don't have an account please register here
          <Link to={"register"}>Sign up</Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
