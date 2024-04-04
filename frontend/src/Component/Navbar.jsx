import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Import dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Import light mode icon
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import ErrorNotifier from "./ToastNotifications/ErrorNotifier";
import SuccessNotifier from "./ToastNotifications/SuccessNotifier";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../assets/logo.png";

const drawerWidth = 240;
const navItems = ["Home", "Live", "News", "Match", "More"];

const Navbar = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchuserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/login/sucess`,
        { withCredentails: true }
      );
      setUserData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchuserData();

    // Set a timeout to clear user data after 24 hours
    const clearUserDataTimeout = setTimeout(() => {
      localStorage.removeItem("userData");
    }, 24 * 60 * 60 * 1000);

    return () => {
      // Clear the timeout to avoid memory leaks
      clearTimeout(clearUserDataTimeout);
    };
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleThemeChange = () => {
    if (userDataAvailable) {
      navigate(`/profile`);
    } else {
      navigate(`/login`);
    }

    // setDarkMode(!darkMode); // Toggle dark mode
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("userData");
    navigate("/login");
    setUserData(null);
    setIsSuccess(true);
    setSuccessMessage("Logged Out sucessfully");
    setTimeout(() => {
      setIsSuccess(false);
      setSuccessMessage("");
    }, 3000);
  };

  const userDataAvailable = localStorage.getItem("userData");
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}

      {isSuccess && (
        <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
      )}

      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ backgroundColor: "#fbfbfb" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "block", sm: "block" },
              fontFamily: "Roboto, sans-serif", // Use Roboto font family with fallback to sans-serif
              fontWeight: 1000, // Make the text bolder
              color: "blue",
              fontSize: "1.5rem", // Change the font size here
            }}
          >
            <img
              src={logo}
              style={{
                width: "170px", // Adjust the width as needed
                height: "auto", // Maintain aspect ratio
                marginRight: "10px",
                marginTop: "10px", // Add margin to separate from text
              }}
            />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                component={Link}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                sx={{
                  color: "white",
                  fontWeight: "500",
                  backgroundColor: "red",
                  margin: "5px",
                  fontWeight: "700",
                  "&:hover": {
                    backgroundColor: "black", // Change background color to blue on hover
                    color: "white", // Change text color to white on hover
                  },
                }}
              >
                {item}
              </Button>
            ))}

            {!userDataAvailable && (
              <Button
                // key={item}
                component={Link}
                to={`/login`}
                sx={{
                  color: "red",
                  fontWeight: "700",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "red", // Change background color to blue on hover
                    color: "white", // Change text color to white on hover
                  },
                }}
              >
                Login
              </Button>
            )}

            {userDataAvailable && (
              <Button
                onClick={handleLogout}
                sx={{
                  color: "red",
                  fontWeight: "700",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "red", // Change background color to blue on hover
                    color: "white", // Change text color to white on hover
                  },
                }}
              >
                LogOut
              </Button>
            )}
          </Box>
          <IconButton
            onClick={handleThemeChange}
            sx={{ color: "inherit", ml: "auto" }}
          >
            <PersonIcon sx={{ color: "black" }} />
            {userDataAvailable && (
              <Button
                onClick={handleLogout}
                sx={{
                  color: "red",
                  fontWeight: "500",
                  display: { xs: "block", sm: "none" },
                }}
              >
                Logout
              </Button>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
