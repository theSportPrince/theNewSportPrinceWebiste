import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import TrendingSeries from "../More/TrendingSeries";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeTeamRankingtab from "./HomeTeamRankingtab";
import ChatPage from "../../Pages/ChatPage";
import Blog from "../More/Blog";



function HomeComponent() {
  const [cricketSeries, setCricketSeries] = useState(false);
  const flag=true;
  const handleCricketSeries = () => {
    setCricketSeries(!cricketSeries);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <ChatPage />
      </Box>

      <Box
        onClick={handleCricketSeries}
        sx={{
          width: "100%",
          cursor: "pointer",
          height: "6vh",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <Typography>Trending Series</Typography>
        {cricketSeries === false ? (
          <KeyboardArrowUpIcon
            onClick={handleCricketSeries}
            sx={{ cursor: "pointer" }}
          />
        ) : (
          <KeyboardArrowDownIcon
            onClick={handleCricketSeries}
            sx={{ cursor: "pointer" }}
          />
        )}
      </Box>
      {cricketSeries && (
        <Box>
          <TrendingSeries />
        </Box>
      )}
      {/* <HomeTeamRankingtab /> */}
      <Blog />
    </Box>
  );
}

export default HomeComponent;
