import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import OdiTeamRanking from "./OdiTeamRanking";
import TestTeamRanking from "./TestTeamRanking";
import T20TeamRanking from "./T20TeamRanking";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function TeamRanking({ flag }) {
  const [currentTab, setCurrentTab] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px is your mobile breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (e, newTabValue) => {
    setCurrentTab(newTabValue);
  };

  return (
    <Box
      sx={{ height: "100%", width: "100%", marginTop: isMobile ? "15%" : "4%" }}
    >
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
          position: "sticky",
        }}
      >
        {!flag && <Typography variant="h5">Team Ranking</Typography>}
      </Box>
      {/* tabs */}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <Box sx={{ width: "100%", borderRadius: "20px", position: "sticky" }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              backgroundColor: { xs: "black", lg: "red" },
              width: "100%",

              justifyContent: "space-evenly",
              "& .MuiTabs-indicator": {
                display: { xs: "none", lg: "block" }, // Hide indicator on mobile
              },
            }}
          >
            <Tab
              label="ODI"
              sx={{
                flexGrow: 1,
                color: "white",
                borderRadius: { xs: "20px", lg: 0 }, // Round corners for mobile, remove for larger screens

                backgroundColor: currentTab === 0 ? "red" : "transparent",
                textAlign: "center",
              }}
            />
            <Tab
              label="Test"
              sx={{
                flexGrow: 1,
                color: "white",
                borderRadius: { xs: "20px", lg: 0 }, // Round corners for mobile, remove for larger screens

                backgroundColor: currentTab === 1 ? "red" : "transparent",
                textAlign: "center",
              }}
            />
            <Tab
              label="T20"
              sx={{
                flexGrow: 1,
                color: "white",
                borderRadius: { xs: "20px", lg: 0 },
                backgroundColor: currentTab === 2 ? "red" : "transparent",
                textAlign: "center",
              }}
            />
          </Tabs>

          <TabPanel value={currentTab} index={0}>
            <OdiTeamRanking />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <TestTeamRanking />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <T20TeamRanking />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}

export default TeamRanking;
