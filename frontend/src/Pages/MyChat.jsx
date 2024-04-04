import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SuccessNotifier from "../Component/ToastNotifications/SuccessNotifier";
import ErrorNotifier from "../Component/ToastNotifications/ErrorNotifier";
import GroupChatModal from "./GroupChatModal";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";

function MyChat({ users, fetchAgain, flag }) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const { _id } = users ?? { _id: null };

  const fetchChat = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/chat?userId=${_id}`
      );
      console.log("Chat Data:", response.data); // Debugging
      setChats(response.data);
      // setSelectedChat(response.data); // Assuming setSelectedChat expects a single chat object
    } catch (error) {
      setHasError(true);
      setErrorMessage("Error in fetching Chat");
    }
  };
  const getSender = (loggedInUser, senderName) => {
    if (senderName.length >= 2) {
      const sender = senderName.find((user) => user?._id !== loggedInUser?._id);
      if (sender) {
        return `${sender.firstName} ${sender.lastName}`;
      } else {
        return null; // Handle the case when sender is not found
      }
    } else {
      return null; // Return null or handle the case when there are not enough users in senderName
    }
  };

  // useEffect(() => {
  //   if (_id) {
  //     fetchChat();
  //   }
  // }, [_id, fetchAgain]);
  useEffect(() => {
    fetchChat();
  }, [fetchAgain]);
  const openModal = () => {
    console.log("Opening modal...");
    setIsModalOpen(true);
  };

  const isMobileScreen = () => {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  };

  return (
    <Box
      sx={{
        width: isMobileScreen() ? "100%" : "30%",
        margin: "10px",
      }}
    >
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "red",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "10px",
          paddingRight: "10px",
          color: "white",
          height: "2.6rem",
        }}
      >
        <Typography>My chats</Typography>
        <Button onClick={openModal} sx={{ color: "white" }}>
          + Group
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          overflowY: "hidden",
          backgroundColor: "#F8F8F8",
          flexDirection: "column",
          height: "40vh",
        }}
      >
        <List>
          {chats && chats?.length > 0 ? (
            chats.map((chat) => (
              <ListItem
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                sx={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  margin: "7px",
                  width: "95%",

                  backgroundColor:
                    selectedChat === chat ? "#38B2Ac" : "#E8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                {/* <ListItemText primary={chat.chatName} /> */}
                <Typography>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Typography>
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ paddingTop: "0", paddingBottom: "0" }}>
              <ListItemText primary="No chats available" />
            </ListItem>
          )}
        </List>
      </Box>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}

export default MyChat;
