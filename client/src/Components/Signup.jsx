import React, { useState } from "react";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); // eslint-disable-next-line
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    setLoading(true);
    try {
      const configuration = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/register",
        data,
        configuration
      );
      setRegisterStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      if (error.response.status === 405) {
        setRegisterStatus({
          msg: "User with this email already exists",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setRegisterStatus({
          msg: "User name already taken, Please take another one",
          key: Math.random(),
        });
      }
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
          <p className="login-text">Create your account</p>
          <TextField
            onChange={(e) => setData({ ...data, name: e.target.value })}
            id="standard-basic"
            label="Enter Your Name"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setData({ ...data, email: e.target.value })}
            id="standard-basic"
            label="Enter Your Email"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setData({ ...data, password: e.target.value })}
            id="standard-basic"
            label="Enter Your Password"
            type="password"
            autoComplete="current-password"
          />
          <Button variant="outlined" onClick={registerHandler} isLoading>
            Register
          </Button>
          <h4>
            Already have acoount please <Link to={"/"}>Login</Link>
          </h4>
        </div>
      </div>
    </>
  );
};

export default SignUp;
