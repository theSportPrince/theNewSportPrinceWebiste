import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

function AddBlogModal({ open, onClose, edit, editblog }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { user } = ChatState();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setImageUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const updateBlog = async () => {
    try {
      const updateData = {
        title: title,
        description: description,
        userId: user._id,
        imageUrl: imageUrl,
      };

      const { data } = axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/update/${editblog}`,
        updateData
      );
      console.log("updated data", data);
      onClose();
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", imageUrl);
      formData.append("user", user._id);

      const updateData = {
        title: title,
        description: description,
        userId: user._id,
        imageUrl: imageUrl,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/create`,
        updateData
      );
      console.log("Post response:", response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  const handleImageInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "80%", backgroundColor: "#fff", padding: 20 }}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <TextField
          label="Image URL"
          fullWidth
          value={imageUrl}
          onChange={handleImageInputChange}
          style={{ marginBottom: 10 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={edit ? updateBlog : handleSubmit}
        >
          {edit ? "Update" : "Submit"}
        </Button>
      </div>
    </Modal>
  );
}

export default AddBlogModal;
