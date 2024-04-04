import React, { useState } from "react";
import {
  Grid,
  Card,
  Typography,
  CardActionArea,
  Button,
  Modal,
} from "@mui/material";
import { Container } from "@mui/material";

function Video() {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [displayedVideos, setDisplayedVideos] = useState(4);

  const videosData = [
    { id: 1, title: "Video 1", videoId: "0_bWGpejW4E" },
    { id: 2, title: "Video 2", videoId: "Gqmzv_BaGj4" },
    { id: 3, title: "Video 3", videoId: "Q9xz-KfRtRo" },
    { id: 4, title: "Video 4", videoId: "Ti4vE1l6kcs" },
    { id: 5, title: "Video 5", videoId: "lPhMjrktDF8" },
    { id: 6, title: "Video 6", videoId: "TEnH7MPAmFA" },
    { id: 7, title: "Video 7", videoId: "NXe9qMloOM0" },
    { id: 8, title: "Video 8", videoId: "6noZqWOvoAs" },
    { id: 9, title: "Video 9", videoId: "J6LAnE8Aem0" },
    { id: 10, title: "Video 10", videoId: "v9DvLownj7E" },
  ];

  const handleCardClick = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowMoreVideos = () => {
    setDisplayedVideos((prevCount) => prevCount + 4);
  };

  return (
    <Container sx={{ marginTop: "10%" }}>
      <Typography variant="h6">Featured Videos</Typography>
      <Grid container spacing={4}>
        {videosData.slice(0, displayedVideos).map((video, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => handleCardClick(video)}>
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div style={{ padding: "16px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {video.title}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {displayedVideos < videosData.length && (
        <Button
          variant="contained"
          onClick={handleShowMoreVideos}
          sx={{ mt: 2 }}
        >
          Show More Videos
        </Button>
      )}

      <Modal open={showModal} onClose={handleCloseModal}>
        <div style={{ maxWidth: 600, margin: "auto" }}>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${selectedVideo?.videoId}`}
            title={selectedVideo?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div style={{ padding: "16px" }}>
            <Typography variant="h5" component="div">
              {selectedVideo?.title}
            </Typography>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

export default Video;
