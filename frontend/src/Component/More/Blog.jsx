import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AddBlogModal from "./AddBlogModal";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  Modal,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { ChatState } from "../../Context/ChatProvider";
import SuccessNotifier from "../ToastNotifications/SuccessNotifier";
import ErrorNotifier from "../ToastNotifications/ErrorNotifier";
import circularProgressClasses from "@mui/material";

function Blog() {
  const [openModal, setOpenModal] = useState(false);
  const [allBlogData, setAllBlogData] = useState([]);
  const [displayedLatestNews, setDisplayedLatestNews] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [edit, setEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [editblog, setEditBlog] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px is your mobile breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = async (editblog) => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/delete/${editblog}`
    );
    console.log(data);
  };

  const { user } = ChatState();

  const { _id } = user ?? "";

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal"); // Debugging statement
    setShowModal(false);
    setOpenModal(false);
  };

  const handleCardClick = (news) => {
    setSelectedNews(news);
    setShowModal(true);
  };

  const fetchAllBLog = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/fetch`
      );
      if (data) {
        console.log("BLOG", data);
        setAllBlogData(data);
        setLoading(false);
        setIsSuccess(true);
        setSuccessMessage("Blog fetch successfully");
      }
    } catch (error) {
      console.log(error);
      setHasError(true);
      setErrorMessage(error);
    }
  };

  const handleUpdate = (blogId) => {
    setOpenModal(true);
    setEditBlog(blogId);
    setEdit(true);
  };

  useEffect(() => {
    fetchAllBLog();
  }, []);

  return (
    <div
      style={{
        margin: "20px",
        overflowY: "auto",
        marginTop: isMobile ? "10%" : "4%",
      }}
    >
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}
      {isSuccess && (
        <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
      )}
      <h1>Blog</h1>
      {loading ? (
        <circularProgressClasses />
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px",
          }}
        >
          <Button
            sx={{ backgroundColor: "red" }}
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
          >
            Create Blog
          </Button>
        </Box>
      )}
      <AddBlogModal
        open={openModal}
        onClose={handleCloseModal}
        edit={edit}
        editblog={editblog}
      />{" "}
      <Grid container spacing={4}>
        {allBlogData.map((result, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                maxWidth: 345,
                height: "50vh",
                position: "relative",
                transition: "transform 0.3s ease-in-out",
                overflowY: "hidden",
                "&:hover": {
                  transform: "scale(1.05)",
                  overflowY: "auto",
                },
              }}
            >
              <CardActionArea onClick={() => handleCardClick(result)}>
                <CardMedia
                  component="img"
                  height="fit-content"
                  image={result?.imageUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {result.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {user && _id === result.user._id ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    padding: "10px",
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdate(result._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(result._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ) : (
                <></>
              )}{" "}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <Card sx={{ m: 2 }}>
          <CardMedia
            component="img"
            sx={{
              height: `${Math.min(window.innerHeight * 0.8, 500)}px`,
              objectFit: "contain",
              width: "100%",
            }}
            image={selectedNews?.imageUrl}
            alt="News Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedNews?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedNews?.description}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}

export default Blog;
