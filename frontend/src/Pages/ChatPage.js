import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Box, Typography } from "@mui/material";
import SideDrawer from "./SideDrawer";
import MyChat from "./MyChat";
import Chatbox from "./Chatbox";
const ChatPage = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [flag, setFlag] = useState(false);

  const isMobileScreen = () => {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  };

  return (
    <Box sx={{ width: "100%" }}>
      <SideDrawer />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          height: "50hv",
          padding: "10px",
        }}
      >
        {isMobileScreen() && !selectedChat ? (
          <MyChat users={user} fetchAgain={fetchAgain} flag={flag} />
        ) : isMobileScreen() && selectedChat ? (
          <Chatbox user={user} fetchAgain={fetchAgain} flag={flag} />
        ) : (
          <>
            <MyChat users={user} fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain}/>
            <Chatbox user={user} fetchAgain={fetchAgain}   setFetchAgain={setFetchAgain}/>
          </>
        )}

        {/* {user && <MyChat />}
        {user && <Chatbox />} */}
      </Box>
    </Box>
  );
};

export default ChatPage;
