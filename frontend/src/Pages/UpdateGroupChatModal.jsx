import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { Close } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ChatState } from "../Context/ChatProvider";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { selectedChat, setSelectedChat, user } = ChatState();
  console.log(selectedChat);

  let _id = null;

  if (user) {
    _id = user._id;
  }

  console.log("loggedinuser", _id);

  // const handleSearch = async (query) => {
  //   setSearch(query);
  //   if (!query) {
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     // Perform search API call
  //     setLoading(false);
  //     setSearchResult([]); // Update with actual search results from API
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //     setLoading(false);
  //   }
  // };

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

  const handleDeletefromselectedUser = (delUser) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== delUser._id));
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.error("Error renaming group chat:", error);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      console.log("user is already in the group");
      return;
    }

    if (selectedChat.groupAdmin._id !== _id) {
      console.log("Only admins can add someone");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        }
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.error("Error adding user to group:", error);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemoveUser = async (userIdToRemove) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userIdToRemove,
        },
        config
      );

      setSelectedChat(data);
      fetchMessages();
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.error("Error removing user from group:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Visible icon */}
      <IconButton onClick={handleOpenModal}>
        <VisibilityIcon />
        <Close />
      </IconButton>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Group Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Group Name: {selectedChat.chatName}
          </Typography>
          {/* Text field for updating group name */}
          <FormControl fullWidth mb={2}>
            <InputLabel htmlFor="group-name">Update Group Name</InputLabel>
            <Input
              id="group-name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleRename}>
            Rename Group
          </Button>

          {/* Text field for searching users to add */}
          {/* <FormControl fullWidth mb={2}>
            <InputLabel htmlFor="search-user">Search User to Add</InputLabel>
            <Input
              id="search-user"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl> */}
          <Box display="flex" flexWrap="wrap" mb={2}>
            {selectedUsers.map((user) => (
              <Button
                key={user._id}
                variant="outlined"
                onClick={() => handleDeletefromselectedUser(user)}
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
                  onClick={() => handleAddUser(user)}
                >
                  {user.firstName}
                </Button>
              ))
            )}
            {/* <ButtonGroup>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Create Chat
            </Button>
          </ButtonGroup> */}
          </Box>

          {/* Display group members */}

          {/* <Typography variant="body1">Group Members:</Typography>
          {selectedChat.users.map((user) => (
            <Button
              key={user._id}
              variant="outlined"
              onClick={() => handleRemoveUser(user._id)}
            >
              {user.firstName} <Close />
            </Button>
          ))} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateGroupChatModal;
