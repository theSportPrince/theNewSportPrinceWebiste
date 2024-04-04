import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import FeedIcon from "@mui/icons-material/Feed";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import News from "../News/News";
import Video from "../Video/Video";
import HomeComponent from "./HomeComponent";
import HomeTeamRankingtab from "./HomeTeamRankingtab";
import Blog from "../More/Blog";
import ArticleIcon from "@mui/icons-material/Article";

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

function HomeTabs() {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (e, newTabValue) => {
    setCurrentTab(newTabValue);
  };

  return (
    <Box
      sx={{
        marginTop: 10,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%", // Take full width
          display: "flex", // Set display to flex
          justifyContent: "center", // Center content horizontally
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            width: "85%", // Adjust width as needed
            textAlign: "center",
            borderRadius: "20px",
            marginBottom: 2, // Adding margin bottom for better spacing
          }}
        >
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTab-root": {
                display: "flex", // Use flex layout for tab contents
                alignItems: "center", // Center items vertically
                justifyContent: "center", // Center items horizontally
                minWidth: "auto", // Allow tabs to adjust dynamically
                padding: "10px 20px", // Adjust padding for better spacing
                fontSize: "1rem", // Set default font size
              },
              "@media (max-width: 600px)": {
                // Adjust styles for smaller screens
                "& .MuiTab-root": {
                  fontSize: "0.8rem", // Decrease font size for smaller screens
                },
              },
            }}
          >
            <Tab
              label="Channels"
              icon={<GroupIcon />}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                color: "white",
                borderRadius: { xs: "10px", lg: 0 },
                backgroundColor: currentTab === 0 ? "red" : "transparent",
                textAlign: "center",
              }}
            />
            <Tab
              label="News"
              icon={<FeedIcon />}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                color: "white",
                borderRadius: { xs: "10px", lg: 0 },
                backgroundColor: currentTab === 1 ? "red" : "transparent",
                textAlign: "center",
              }}
            />
            <Tab
              label="Videos"
              icon={<OndemandVideoIcon />}
              sx={{
                flexGrow: 1,
                color: "white",
                display: "flex",
                flexDirection: "row",
                borderRadius: { xs: "10px", lg: 0 },
                backgroundColor: currentTab === 2 ? "red" : "transparent",
                textAlign: "center",
              }}
            />
            <Tab
              label="BLog"
              icon={<ArticleIcon />}
              sx={{
                flexGrow: 1,
                color: "white",
                display: "flex",
                flexDirection: "row",
                borderRadius: { xs: "10px", lg: 0 },
                backgroundColor: currentTab === 3 ? "red" : "transparent",
                textAlign: "center",
              }}
            />
          </Tabs>
        </Box>
      </Box>

      <TabPanel value={currentTab} index={0}>
        <HomeComponent />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <News />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <Video />
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        <Blog />
      </TabPanel>
    </Box>
  );
}

export default HomeTabs;
