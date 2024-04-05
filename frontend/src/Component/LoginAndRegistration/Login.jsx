import React, { useState } from "react";
import "./Login.css"; // Import CSS file
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GoogleSignInButton from "../GoogleLogin/GoogleLogin";
import axios from "axios";
import ErrorNotifier from "../ToastNotifications/ErrorNotifier";
import SuccessNotifier from "../ToastNotifications/SuccessNotifier";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [login, setLogin] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = ChatState();

  const handleloginbutton = async (e) => {
    try {
      e.preventDefault(); // Prevent default form submission behavior

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const userObj = {
        username: username,
        password: password,
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/login`,
        userObj
      );
      localStorage.setItem("userData", JSON.stringify(data.user));

      navigate("/");

      console.log(data.user);
    } catch (error) {
      console.log(error);
    }

    // Add your Axios call here to send the userObj to the backend for authentication
  };

  const googleAuth = async () => {
    try {
      window.open(
        `${process.env.REACT_APP_BASE_URL}/auth/google/callback`,
        "_self"
      );
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.response?.data?.message);
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
        marginTop: "40px",
      }}
    >
      <div className="container">
        <div className="heading">Sign In</div>
        <form className="form" onSubmit={handleloginbutton}>
          <input
            placeholder="E-mail or Mobile Number"
            id="username"
            name="username"
            type="text"
            className="input"
            required="true"
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            className="input"
            required=""
          />
          <span className="forgot-password">
            <a href="#">Forgot Password ?</a>
          </span>
          <input value="Sign In" type="submit" className="login-button" />
        </form>
        <div className="social-account-container">
          <span className="title">Or Sign in with</span>
          <div className="social-accounts">
            <button className="social-button google" onClick={googleAuth}>
              <svg
                viewBox="0 0 488 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
                class="svg"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
            </button>
            {/* <button className="social-button apple">
              <svg
                viewBox="0 0 384 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
                class="svg"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
              </svg>
            </button> */}
          </div>
        </div>
        <span className="agreement">
          <a href="#">Learn user licence agreement</a>
        </span>
        <Typography variant="body1">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "blue" }}>
            Sign up
          </Link>
          {/* <GoogleSignInButton /> */}
        </Typography>
      </div>
    </Box>
  );
};

export default Login;
