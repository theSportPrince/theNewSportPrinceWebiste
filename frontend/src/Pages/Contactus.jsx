import React, { useState, useEffect } from "react";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import SuccessNotifier from "../Component/ToastNotifications/SuccessNotifier";
import ErrorNotifier from "../Component/ToastNotifications/ErrorNotifier";
function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px is your mobile breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/contactus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      setIsSuccess(true);
      setSuccessMessage("Contact Details submitted successfully");
      console.log("Form submitted successfully:", data);
      // Reset form fields after successful submission
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      setHasError(true);
      setErrorMessage("Error submitting form:", error.message);
      console.error("Error submitting form:", error.message);
      // Handle error from backend if submission fails
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: isMobile ? "10%" : "4%" }}>
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}

      {isSuccess && (
        <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
      )}
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="subtitle1">
          For any inquiries, please Fill the Form or Email us :
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: support@thesportsprince.com
          <br />
          Phone: +91 7903938359
          <br />
          Address: Shahpur, Patna, Patna, Bihar, India, 800027
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile Number"
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Message"
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default ContactUs;
