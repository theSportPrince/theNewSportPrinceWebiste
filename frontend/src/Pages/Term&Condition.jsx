import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {
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
};

function TermAndCondition() {
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
          Terms & Conditions
        </Typography>
        <Box sx={styles.content}>
          <Typography paragraph>
            We want to wish you a good day at sportsprince.com and thank you for
            visiting our website. The terms of use define the rules for using
            our website. We expect that, visiting our website, you agree to
            comply with the following terms and conditions. If you have any
            thoughts about the changes in our website or want to share something
            with us you can always contact us.
          </Typography>
          <Typography paragraph>
            <b>Intellectual Property Rights:</b> Unless otherwise stated,
            sportsprince.com and/or its licensors are the owners of the
            materials published on the website. The rights to intellectual
            property are protected. You can view and/or print the information
            from sportsprince.com for personal use subject to the restrictions
            defined in these terms and conditions.
          </Typography>
          <Typography paragraph>
            <b>User Interactions:</b> Some of our website sections allow users
            to publish their viewpoints and exchange information, material, and
            data with each other. Please note that we do not screen, edit,
            publish, or review comments before they appear on the website.
            Therefore, the comments displayed are not always the views and
            opinions of sportsprince.com, operators, or affiliates.
          </Typography>
          <Typography paragraph>
            <b>Usage Restrictions: </b> As a user of our website, we expect you
            to respect our creativity and intellectual property rights. Users
            are requested to refrain from republishing material from
            sportsprince.com; selling, renting, or sub-licensing its content; or
            reproducing, duplicating, or copying material from our website for
            malicious purposes, fabricated, wrong, hyped or exaggerated
            information. The redistribution of the content is at the sole
            discretion of the company and is only permissible when the content
            is specifically made for redistribution. The publisher’s decision to
            allow the content for redistribution is not final and its decision
            depends on the written information that can pave the way for
            redistribution.
          </Typography>
          {/* Add more terms and conditions content here */}
        </Box>
      </Box>
    </Box>
  );
}

export default TermAndCondition;
