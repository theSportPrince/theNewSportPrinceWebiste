import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  footer: {
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};

function Footer() {
  return (
    <Box sx={styles.footer}>
      <Typography>
        <Link
          component={RouterLink}
          to="/live"
          sx={{ ...styles.link, marginRight: "10px" }}
        >
          Live
        </Link>
        |
        <Link
          component={RouterLink}
          to="/about-us"
          sx={{ ...styles.link, marginLeft: "10px", marginRight: "10px" }}
        >
          About
        </Link>
        |
        <Link
          component={RouterLink}
          to="/term-and-condition"
          sx={{ ...styles.link, marginLeft: "10px", marginRight: "10px" }}
        >
          Terms and Conditions
        </Link>
        |
        <Link
          component={RouterLink}
          to="/privacy-policy"
          sx={{ ...styles.link, marginLeft: "10px" }}
        >
          Privacy Policy
        </Link>
        |
        <Link
          component={RouterLink}
          to="/contactus"
          sx={{ ...styles.link, marginLeft: "10px" }}
        >
          Contact Us
        </Link>
      </Typography>
      <Typography>
        &copy;Copyrignt @2023 - 2024 The Sports Prince All Rights Reserved
      </Typography>
    </Box>
  );
}

export default Footer;
