import React, { useState } from "react";
import { Modal, Box, Typography, Tabs, Tab } from "@mui/material";
import LiveCard from "../CardTabComponent/LiveCard";
import Info from "../CardTabComponent/Info";
import Commantry from "../CardTabComponent/Commantry";
import ScoreCard from "../CardTabComponent/ScoreCard";
import Odds from "../CardTabComponent/Odds";
import PointTable from "../CardTabComponent/PointTable";
import ChatPage from "../../Pages/ChatPage";
import Blog from "../More/Blog";

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

const InfoModal = ({ open, onClose, data }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (e, newTabValue) => {
    setCurrentTab(newTabValue);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          backgroundColor: "#B3C8CF",
          borderRadius: "10px",
          outline: "none",
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            backgroundColor: { xs: "black", lg: "red" },
            width: "100%",
            justifyContent: "space-evenly",
            "& .MuiTabs-indicator": {
              display: { xs: "none", lg: "block" },
            },
          }}
        >
          <Tab
            label="Live"
            sx={{
              // flexGrow: 1,
              // flexShrink: 0, // Prevent the tab from shrinking
              color: "white",
              borderRadius: { xs: "20px", lg: 0 }, // Round corners for mobile, remove for larger screens
              backgroundColor: currentTab === 0 ? "red" : "transparent",
              textAlign: "center",
            }}
          />
          <Tab
            label="Info"
            sx={{
              // flexGrow: 1,
              // flexShrink: 0, // Prevent the tab from shrinking
              color: "white",
              borderRadius: { xs: "20px", lg: 0 }, // Round corners for mobile, remove for larger screens

              backgroundColor: currentTab === 1 ? "red" : "transparent",
              textAlign: "center",
            }}
          />
          <Tab
            label="commentry"
            sx={{
              // flexGrow: 1,
              // flexShrink: 0, // Prevent the tab from shrinking
              color: "white",
              borderRadius: { xs: "20px", lg: 0 },
              backgroundColor: currentTab === 2 ? "red" : "transparent",
              textAlign: "center",
            }}
          />
          <Tab
            label="ScoreCard"
            sx={{
              // flexGrow: 1,
              // flexShrink: 0, // Prevent the tab from shrinking
              color: "white",
              borderRadius: { xs: "20px", lg: 0 },
              backgroundColor: currentTab === 3 ? "red" : "transparent",
              textAlign: "center",
            }}
          />
          <Tab
            label="Odds"
            sx={{
              // flexGrow: 1,
              // flexShrink: 0, // Prevent the tab from shrinking
              color: "white",
              borderRadius: { xs: "20px", lg: 0 },
              backgroundColor: currentTab === 4 ? "red" : "transparent",
              textAlign: "center",
            }}
          />
          <Tab
            label="Point Table"
            sx={{
              // flexGrow: 1,
              // flexShrink: 0, // Prevent the tab from shrinking
              color: "white",
              borderRadius: { xs: "20px", lg: 0 },
              backgroundColor: currentTab === 5 ? "red" : "transparent",
              textAlign: "center",
            }}
          />
          <Tab
            label="Pool"
            sx={{
              // flexGrow: 1,
              // flexShrink: 0, // Prevent the tab from shrinking
              color: "white",
              borderRadius: { xs: "20px", lg: 0 },
              backgroundColor: currentTab === 6 ? "red" : "transparent",
              textAlign: "center",
            }}
          />
          <Tab
            label="Blog"
            sx={{
              // flexGrow: 1,
              // flexShrink: 0, // Prevent the tab from shrinking
              color: "white",
              borderRadius: { xs: "20px", lg: 0 },
              backgroundColor: currentTab === 7 ? "red" : "transparent",
              textAlign: "center",
            }}
          />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <LiveCard data={data} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Info data={data} />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Commantry data={data} />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <ScoreCard data={data} />
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <Odds data={data} />
        </TabPanel>
        <TabPanel value={currentTab} index={5}>
          <PointTable data={data} />
        </TabPanel>
        <TabPanel value={currentTab} index={6}>
          <ChatPage />
        </TabPanel>
        <TabPanel value={currentTab} index={7}>
          <Blog />
        </TabPanel>

        {/* Tab panels */}
        {/* Replace the content of TabPanel components as needed */}
        {/* 
        <Typography>{data?.title}</Typography>

        <Typography>{data?.description}</Typography> */}
      </Box>
    </Modal>
  );
};

export default InfoModal;
