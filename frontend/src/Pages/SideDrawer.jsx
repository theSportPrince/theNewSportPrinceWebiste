import React, { useState, useEffect } from "react";
import {
  Tooltip,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Search as SearchIcon } from "@mui/icons-material";
import logo from "../assets/logo.png";
import CloseIcon from "@mui/icons-material/Close";
import SuccessNotifier from "../Component/ToastNotifications/SuccessNotifier";
import ErrorNotifier from "../Component/ToastNotifications/ErrorNotifier";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

function SideDrawer() {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleNameSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchProfile = async () => {
    try {
      setIsLoading(true);
      if (!search) {
        setIsLoading(false);
        setSearchResult([]);
        return;
      
      }

      console.log(user);
      if (!user) {
        navigate("/login");
        setIsLoading(false);
        return;
      }

      const { _id } = user;
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user?search=${search}&userId=${_id}`
      );
      setSearchResult(response.data);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.message || "Error in fetching search results");
      setIsLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/chat`,
        { userId, user }
      );
      setSelectedChat(response.data);
      setIsLoading(false);
      if (!chats.find((c) => c._id === response.data._id)) {
        setChats([response.data, ...chats]);
      }
      setDrawerOpen(false);
    } catch (error) {
      setHasError(true);
      setErrorMessage("Error in loading Chat");
      setIsLoading(false);
    }
  };

  // UseEffect to fetch search results when search changes
  useEffect(() => {
    handleSearchProfile();
  }, []);

  return (
    <>
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}
      {isSuccess && (
        <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
      )}

      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "30%",
            justifyContent: "start",
          }}
        >
          <Tooltip title="Search user to chat" arrow placement="bottom-end">
            <IconButton sx={{ padding: "0" }} onClick={handleDrawerOpen}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="body1">Search</Typography>{" "}
        </Box>
        <Box sx={{ objectFit: "contain", width: "70%", alignItems: "center" }}>
          <img
            src={logo}
            style={{ height: "20px", width: "150px" }}
            alt="Logo"
          />
        </Box>
      </Box>

      {/* Drawer component */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        {/* Drawer header */}
        <Box
          sx={{
            backgroundColor: "white",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Tooltip title="Search user to chat" arrow placement="bottom-end">
            <TextField
              variant="outlined"
              size="small"
              value={search}
              placeholder="Search user"
              onChange={handleNameSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleDrawerOpen}>
                      <SearchIcon onClick={handleSearchProfile} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer body */}
        <List>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            searchResult.map((profile) => (
              <ListItem
                key={profile._id}
                button
                onClick={() => accessChat(profile._id)}
              >
                {profile.img_url ? (
                  <Avatar alt={profile.firstName} src={profile.img_url} />
                ) : (
                  <Avatar alt={profile.firstName}>
                    {`${profile.firstName.charAt(0)}${profile.lastName.charAt(
                      0
                    )}`}
                  </Avatar>
                )}
                <ListItemText
                  primary={`${profile.firstName} ${profile.lastName}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Drawer>
    </>
  );
}

export default SideDrawer;
