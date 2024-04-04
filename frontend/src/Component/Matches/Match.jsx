import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography } from "@mui/material";
import Upcoming from "../Live/Upcoming";
import Finished from "../Live/Finished";

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

function Match() {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentSubTab, setCurrentSubTab] = useState(0);
 ;

  const handleTabChange = (e, newTabValue) => {
    setCurrentTab(newTabValue);
  };

  const handleSubTabChange = (e, newSubTabValue) => {
    setCurrentSubTab(newSubTabValue);
  };

  return (
    <Box sx={{ marginTop: 10, width: "100%" }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{
          backgroundColor: { xs: "black", lg: "red" },
          width: "100%",
          justifyContent: "center",
          "& .MuiTabs-indicator": {
            display: { xs: "none", lg: "block" }, // Hide indicator on mobile
          },
        }}
      >
        <Tab
          label="Upcoming"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 },
            backgroundColor: currentTab === 0 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
        <Tab
          label="Finished"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 },
            backgroundColor: currentTab === 1 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
      </Tabs>

      <Tabs
        value={currentSubTab}
        onChange={handleSubTabChange}
        sx={{
          backgroundColor: { xs: "black", lg: "red" },
          width: "100%",
          justifyContent: "center",
          marginTop: 0, // Add negative margin to remove the gap
          "& .MuiTabs-indicator": {
            display: { xs: "none", lg: "block" }, // Hide indicator on mobile
          },
        }}
      >
        <Tab
          label="All"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 },
            backgroundColor: currentSubTab === 0 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
        <Tab
          label="Test"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 },
            backgroundColor: currentSubTab === 1 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
        <Tab
          label="T20"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 },
            backgroundColor: currentSubTab === 2 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
        <Tab
          label="ODI"
          sx={{
            flexGrow: 1,
            color: "white",
            borderRadius: { xs: "20px", lg: 0 },
            backgroundColor: currentSubTab === 3 ? "red" : "transparent",
            textAlign: "center",
          }}
        />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <Upcoming  currentTab={currentSubTab}/>
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Finished currentTab={currentSubTab} />
      </TabPanel>

      <TabPanel value={currentSubTab} index={0}>
        {/* <Typography>All Match</Typography> */}
        {/* All matches content */}
      </TabPanel>
      <TabPanel value={currentSubTab} index={1}>
        {/* <Typography>Test Matches</Typography> */}
        {/* Test matches content */}
      </TabPanel>
      <TabPanel value={currentSubTab} index={2}>
        {/* <Typography>T20 Matches</Typography> */}
        {/* T20 matches content */}
      </TabPanel>
      <TabPanel value={currentSubTab} index={3}>
        {/* <Typography>ODI Matches</Typography> */}
        {/* ODI matches content */}
      </TabPanel>
    </Box>
  );
}

export default Match;
