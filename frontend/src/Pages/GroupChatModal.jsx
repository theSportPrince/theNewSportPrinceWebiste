import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import ErrorNotifier from "../Component/ToastNotifications/ErrorNotifier";
import SuccessNotifier from "../Component/ToastNotifications/SuccessNotifier";

const GroupChatModal = ({ isOpen, onClose }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, chats, setChats } = ChatState();
  let _id = null;

  if (user) {
    _id = user._id;
  }

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((user) => user._id === userToAdd._id)) {
      console.warn("User already added");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user?search=${search}&userId=${_id}`
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== delUser._id));
  };

  const handleSubmit = async () => {
    // if (!groupChatName || !selectedUsers.length) {
    //   setHasError(true);
    //   setErrorMessage("All feild are required");
    //   return;
    // }
    if (!groupChatName) {
      setHasError(true);
      setErrorMessage("All feild are required");
      return;
    }

    try {
      console.log(user);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/chat/group`,
        {
          name: groupChatName,
          // groupMembers: JSON.stringify(selectedUsers.map((u) => u._id)),
          loggedInUser: user,
        }
      );
      console.log("groupModalChat", response?.data);
      console.log("Creating group chat...", selectedUsers);
      setChats([response?.data, ...chats]);
      setIsSuccess(true);
      setSuccessMessage("Group Created Successfully");
      onClose();
    } catch (error) {
      console.error("Error creating group chat:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {hasError && (
          <ErrorNotifier {...{ message: errorMessage, setHasError }} />
        )}

        {isSuccess && (
          <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
        )}
        <Typography variant="h6" gutterBottom>
          Create Group Chat
        </Typography>
        <FormControl fullWidth mb={2}>
          <InputLabel htmlFor="chat-name">Chat Name</InputLabel>
          <Input
            id="chat-name"
            placeholder="Enter chat name"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
        </FormControl>
        {/* <FormControl fullWidth mb={2}>
          <InputLabel htmlFor="search-users">Add Users</InputLabel>
          <Input
            id="search-users"
            placeholder="Search users"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </FormControl> */}
        <Box display="flex" flexWrap="wrap" mb={2}>
          {selectedUsers.map((user) => (
            <Button
              key={user._id}
              variant="outlined"
              onClick={() => handleDelete(user)}
            >
              {user.firstName}
            </Button>
          ))}
        </Box>
        <Box display="flex" justifyContent="space-between">
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            searchResult?.slice(0, 4).map((user) => (
              <Button
                key={user._id}
                variant="contained"
                onClick={() => handleGroup(user)}
              >
                {user.firstName}
              </Button>
            ))
          )}
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Create Chat
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Modal>
  );
};

export default GroupChatModal;
