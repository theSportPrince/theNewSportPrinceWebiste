import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Typography } from "@mui/material";
import SingleChat from "./SingleChat";

function Chatbox({ fetchAgain }) {
  const isMobileScreen = () => {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  };

  const { selectedChat } = ChatState();
  return (
    <Box
      sx={{
        backgroundColor: "grey",
        width: isMobileScreen() ? "100%" : "70%",
        margin: "10px",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} />
    </Box>
  );
}

export default Chatbox;
