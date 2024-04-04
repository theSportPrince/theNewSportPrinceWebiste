import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography } from "@mui/material";
import Home from "./Home/Home";
import Upcoming from "./Live/Upcoming";
import Finished from "./Live/Finished";
import Live from "./Live/Live";

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

function Body() {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (e, newTabValue) => {
    setCurrentTab(newTabValue);
  };

  return (
    <Box sx={{ marginTop: 10, width: "100%" }}>
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
          label="Home"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 }, // Round corners for mobile, remove for larger screens
            backgroundColor: currentTab === 0 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
        <Tab
          label="Live"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 }, // Round corners for mobile, remove for larger screens

            backgroundColor: currentTab === 1 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
        <Tab
          label="Upcoming"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 },
            backgroundColor: currentTab === 2 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
        <Tab
          label="Finished"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 },
            backgroundColor: currentTab === 3 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Live />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <Upcoming />
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        <Finished />
      </TabPanel>
    </Box>
  );
}

export default Body;
