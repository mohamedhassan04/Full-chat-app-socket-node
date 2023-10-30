import React, { useState } from "react";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toaster from "./Toaster";

const Login = () => {
  const [data, setData] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false); // eslint-disable-next-line
  const [loginInStatus, setLoginInStatus] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    setLoading(true);
    try {
      const configuration = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/login",
        data,
        configuration
      );
      setLoginInStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLoginInStatus({
        msg: "Invalied User name or Password",
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
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
            onChange={(e) => setData({ ...data, name: e.target.value })}
            onKeyDown={(event) => {
              if (event.code == "Enter") {
                loginHandler();
              }
            }}
            id="standard-basic"
            label="Enter Your User Name"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setData({ ...data, password: e.target.value })}
            onKeyDown={(event) => {
              if (event.code == "Enter") {
                loginHandler();
              }
            }}
            id="standard-basic"
            label="Enter Your Password"
            type="password"
            autoComplete="current-password"
          />
          <Button variant="outlined" onClick={loginHandler} isLoading>
            Login
          </Button>
          <h4>
            If you don't have an account please register here
            <Link to={"register"}>Sign up</Link>
          </h4>
          {loginInStatus ? (
            <Toaster key={loginInStatus.key} message={loginInStatus.msg} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Login;
