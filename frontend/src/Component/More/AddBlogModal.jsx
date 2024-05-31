import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, Typography,MenuItem } from "@mui/material";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Cloudinary } from "cloudinary-core"; // Import Cloudinary

const cloudinary = new Cloudinary({ cloud_name: "dcpcbt2hr", secure: true });

function AddBlogModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [matchtitle, setMatchtitle] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [live, setLive] = useState("");
  const [loggedInuser, setLoggedInUser] = useState(null);
  const [weatherreport, setWeatherReport] = useState("");
  const [pitchReport, setPitchReport] = useState("");
  const [squad, setSquad] = useState("");
  const [teamnews, setTeamnews] = useState("");
  const [predictionresult, setPredictionResult] = useState("");
  const [playerNames, setPlayerNames] = useState(Array(11).fill(""));
  const [teama, setTeamA] = useState("");
  const [teamb, setTeamB] = useState("");
  const [teamaname, setTeamAName] = useState("");
  const [teambname, setTeamBName] = useState("");
  const [category, setCategory] = useState(""); 

  const { user, setUser } = ChatState();
  useEffect(() => {
    if (!user) {
      try {
        const userInfo = localStorage.getItem("userData");
        if (userInfo) {
          const userData = JSON.parse(userInfo);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e3ztc2ke"); // replace with your actual upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dcpcbt2hr/image/upload`,
        formData
      );
      const url = response.data.secure_url;
      setImageUrls(url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async () => {
    console.log(imageUrls);

    try {
      if (
        !title ||
        !description ||
        !user ||
        !imageUrls.length ||
        !videoUrl ||
        !matchtitle||
        !category
      ) {
        console.error("All fields are required");
        if (
          !title ||
          !description ||
          imageUrls.length === 0 ||
          !videoUrl ||
          !matchtitle||
          !category
        ) {
          alert("Please fill the Reqired Feild");
        } else {
          alert("Please refresh the Page user is not found");
        }

        return;
      }

      const extractVideoId = (url) => {
        const videoIdMatch = url.match(
          /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|.*[?&]v=))([^&?/\s]+)/
        );
        return videoIdMatch && videoIdMatch[1];
      };

      const videoId = extractVideoId(videoUrl.trim());

      // Construct YouTube embed URL with autoplay and mute parameters
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

      const postData = {
        title: title,
        description: description,
        user: user._id,
        imageUrls: imageUrls,
        videoUrl: embedUrl,
        matchtitle: matchtitle,
        venue: venue,
        date: date,
        live: live,
        weatherReport: weatherreport,
        pitchReport: pitchReport,
        Squad: squad,
        TeamNews: teamnews,
        PredictionResult: predictionresult,
        TeamA: teama,
        TeamB: teamb,
        teamaname: teamaname,
        teambname: teambname,
        category: category,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/create`,
        postData
      );
      console.log("Post response:", response.data);
      alert("You have successfully posted the Blog");

      setTitle("");
      setDescription("");
      setImageUrls([]);
      setVideoUrl("");
      setMatchtitle("");
      setVenue("");
      setDate("");
      setLive("");
      setWeatherReport("");
      setPitchReport("");
      setSquad("");
      setTeamnews("");
      setPredictionResult("");
      setTeamA("");
      setTeamB("");
      setTeamBName("");
      setTeamAName("");
      setCategory("");

      onClose();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const parseHTML = (htmlString) => {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(htmlString, "text/html");
    return parsedDocument.body.firstChild;
  };

  const handleChange = (value) => {
    setDescription(value);
    const words = value.trim().split(/\s+/);
    const numWords = words.length;
    if (numWords < 300) {
      setError(true);
    }
  };

  useEffect(() => {
    handleChange(description);
  }, [description]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "#fff",
          padding: 20,
          height: "90vh",
          overflowY: "auto",
        }}
      >
        <TextField
          label="Title *"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        {/* <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: 10 }}
        /> */}

        <ReactQuill
          value={description}
          onChange={handleChange}
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            },
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "list",
            "bullet",
            "link",
          ]}
          style={{
            marginBottom: 10,
            height: "40vh",
            overflowY: "auto",
          }}
        />

        {/* Repeat for each image field */}
        {/* {[1, 2, 3].map((index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <TextField
              label="Image URL*"
              fullWidth
              value={imageUrls[index - 1]}
              onChange={(e) => {
                const updatedUrls = [...imageUrls];
                updatedUrls[index - 1] = e.target.value;
                setImageUrls(updatedUrls);
              }}
              style={{ marginBottom: 10 }}
            />
          </div>
        ))} */}

        <div style={{ marginBottom: 10 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: 10 }}
          />
        </div>
        <TextField
          label="Trending Video URL's *"
          fullWidth
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <div>
        <TextField
          select // Use select for dropdown
          label="Category" // Label for dropdown
          fullWidth
          value={category} // Selected category
          onChange={(e) => setCategory(e.target.value)} // Handle category change
          style={{ marginBottom: 10 }}
        >
          {/* Dropdown options */}
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="recent">Recent</MenuItem>
        </TextField>

          <TextField
            label="Title of the Match e.g KKR vs CSK *"
            fullWidth
            value={matchtitle}
            onChange={(e) => setMatchtitle(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Typography variant="h5">Fill these details</Typography>
          <TextField
            label="Venue of the Match"
            fullWidth
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Date and Time of the Match e.g  Friday, April 26, 7:30 pm"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Live Broadcast and Streaming Details"
            fullWidth
            value={live}
            onChange={(e) => setLive(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Weather Report"
            fullWidth
            value={weatherreport}
            onChange={(e) => setWeatherReport(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Pitch Report"
            fullWidth
            value={pitchReport}
            onChange={(e) => setPitchReport(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Prediction Result"
            fullWidth
            value={predictionresult}
            onChange={(e) => setPredictionResult(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Squad"
            fullWidth
            value={squad}
            onChange={(e) => setSquad(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Team 1 Name"
            fullWidth
            value={teamaname}
            onChange={(e) => setTeamAName(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Team 2 Name"
            fullWidth
            value={teambname}
            onChange={(e) => setTeamBName(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Team News"
            fullWidth
            value={teamnews}
            onChange={(e) => setTeamnews(e.target.value)}
            style={{ marginBottom: 10 }}
          />

          <TextField
            label="Team 1 Player 11"
            fullWidth
            value={teama}
            onChange={(e) => setTeamA(e.target.value)}
            style={{ marginBottom: 10 }}
          />

          <TextField
            label="Team 2 Player 11"
            fullWidth
            value={teamb}
            onChange={(e) => setTeamB(e.target.value)}
            style={{ marginBottom: 10 }}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
}

export default AddBlogModal;
