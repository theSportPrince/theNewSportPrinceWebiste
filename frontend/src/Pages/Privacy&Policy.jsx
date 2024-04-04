import React, { useState, useEffect } from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  container: {
    backgroundColor: "#fff", // White background
    color: "#000", // Black text color
    padding: "20px",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  content: {
    fontSize: "18px",
    lineHeight: "1.6",
  },
  link: {
    color: "#000",
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      color: "#2196f3", // Blue color on hover
    },
  },
};

function PrivacyAndPolicy() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px is your mobile breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ marginTop: isMobile ? "10%" : "4%" }}>
      <Box sx={styles.container}>
        <Typography variant="h4" sx={styles.title}>
          Privacy Policy
        </Typography>
        <Box sx={styles.content}>
          <Typography paragraph>
            <b>Data Collection: </b> At Sportsprince.Com, we collect user data
            for providing personalized services that can improve browsing
            experience. The information we request and collect when users visit
            our web service includes the name, email addresses and the surfing
            behaviour to improve our resource for enhanced customer experience.
            We would also like to mention that at sportsprince.com. we highly
            value user privacy. It is therefore, our policy to maintain highest
            standards for that and hence, no effort is unturned to preserve user
            privacy and data security precautions.
          </Typography>
          <Typography paragraph>
            <b>Use of Cookies:</b> At Sportsprince.Com, we use cookies to ensure
            flexible functionality and customization of accessing our website.
            It helps us get an understanding of the user action over our website
            as a way to enhance our insight to improve surfing on our side. By
            agreeing with our Cookie Policy, you assist us in routing and
            passing the browsing process in the best possible and secured manner
          </Typography>
          <Typography paragraph>
            <b>Data Security:</b> We take all applicable means to protect your
            personal information from unauthorized access or disclosure. We make
            any effort to guarantee that all means of data protection meet
            requirements meet industry standard helping your data stay stored
            securely. It is essential for the Company to gain your confidence,
            and we show maximum efforts to cope with the challenge of the part
            of data and privacy protection.
          </Typography>
          <Typography paragraph>
            <b> Data Sharing:</b> We act as a responsible service provider;
            therefore, we do not sell or share your data with third parties
            unless it is not a wish expressed by our clients. Your confidence in
            our service is our core priority, and we do value it a lot. We
            expect to become trusted stakeholders by means of the relationship
            between our user and us while you can always be sure about the
            privacy protection in communication with Sportsprince.
          </Typography>
          <Typography paragraph>
            By accessing or using our services, you agree to our{" "}
            <Link
              component={RouterLink}
              to="/term-and-condition"
              sx={styles.link}
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link component={RouterLink} to="/privacy-policy" sx={styles.link}>
              Privacy Policy
            </Link>
            .
          </Typography>
          {/* Add more privacy policy content here */}
        </Box>
      </Box>
    </Box>
  );
}

export default PrivacyAndPolicy;
