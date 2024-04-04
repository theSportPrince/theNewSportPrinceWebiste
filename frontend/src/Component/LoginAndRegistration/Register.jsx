import React, { useState } from "react";
import "./Register.css"; // Import CSS file
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorNotifier from "../ToastNotifications/ErrorNotifier";
import SuccessNotifier from "../ToastNotifications/SuccessNotifier";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/register`, formData);
      console.log("Registration successful:", response.data);
      setIsSuccess(true);
      setSuccessMessage("You have sucessfully Registered");
      localStorage.setItem("userData", JSON.stringify(response.data));
      navigate("/home");
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.response?.data?.message);
      console.error("Registration failed:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
      }}
    >
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}

      {isSuccess && (
        <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
      )}

      <div className="container">
        <div className="heading">Sign Up</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            id="firstName"
            name="firstName"
            type="text"
            className="input"
            onChange={handleChange}
            required=""
          />
          <input
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            className="input"
            onChange={handleChange}
            required=""
          />
          <input
            placeholder="E-mail"
            id="email"
            name="email"
            type="email"
            className="input"
            onChange={handleChange}
            required=""
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            className="input"
            onChange={handleChange}
            required=""
          />
          <input
            placeholder="Mobile Number"
            id="mobileNumber"
            name="mobileNumber"
            type="text"
            inputMode="numeric" // This prevents the up and down arrows
            className="input"
            onChange={handleChange}
            required=""
          />
          <span className="forgot-password">
            <a href="#">Forgot Password ?</a>
          </span>
          <input value="Sign Up" type="submit" className="login-button" />
        </form>
        <span className="agreement">
          <a href="#">Learn user licence agreement</a>
        </span>
        <Typography variant="body1">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "blue" }}>
            Sign In
          </Link>
        </Typography>
      </div>
    </Box>
  );
};

export default Register;
