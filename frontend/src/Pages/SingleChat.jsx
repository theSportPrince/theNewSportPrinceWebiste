import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import ProfileModal from "./ProfileModal";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, Input, Spinner } from "@chakra-ui/react";
import ScrollableChat from "./ScrollableChat";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import SuccessNotifier from "../Component/ToastNotifications/SuccessNotifier";
import ErrorNotifier from "../Component/ToastNotifications/ErrorNotifier";

const ENDPOINT = process.env.REACT_APP_BASE_URL;
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const navigate = useNavigate();
  const getSenderfull = () => {};

  const handleLogin = () => {
    navigate("/login");
  };

  const getSender = () => {};

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  console.log("i am the user", user);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/message/${selectedChat._id}`
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);

      setIsSuccess(true);
      setSuccessMessage("Chat fetched Successfully");
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
            user: user,
          }
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        setHasError(true);
        setErrorMessage(error);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setMessages([...messages, newMessageRecieved]);
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const handleback = () => {
    console.log("handle back");
    setSelectedChat(null);
  };

  return (
    <>
      {selectedChat ? (
        <>
          {hasError && (
            <ErrorNotifier {...{ message: errorMessage, setHasError }} />
          )}

          {isSuccess && (
            <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
          )}
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              border: "1px solid",
              alignItems: "center",
            }}
          >
            <ArrowBackIcon onClick={handleback} />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderfull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "5px",
              backgroundColor: "#E8E8E8",
              width: "100%",
              height: "88%",

              overflowY: "hidden",
            }}
          >
            {/* your message here */}
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box>
                <ScrollableChat messages={messages} />
              </Box>
            )}

            <Box>
              <FormControl onKeyDown={sendMessage} isRequired>
                {typing ? <div>typing...</div> : <></>}

                {user?.length === 0 ? (
                  <Box
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Button
                      sx={{ backgroundColor: "red", color: "white" }}
                      onClick={handleLogin}
                    >
                      Login to Chat{" "}
                    </Button>
                  </Box>
                ) : (
                  <>
                    <Input
                      variant="filled"
                      bg="#E0E0E0"
                      w="90%"
                      placeholder="Enter a message"
                      onChange={typingHandler}
                      value={newMessage}
                    />
                  </>
                )}
              </FormControl>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography>Click on a user to Start Chatting</Typography>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
