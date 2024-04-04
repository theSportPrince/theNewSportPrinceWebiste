import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  Button,
  Modal,
} from "@mui/material";
import { Container } from "@mui/material";
import axios from "axios";

function News() {
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [displayedBestNews, setDisplayedBestNews] = useState(4);
  const [displayedLatestNews, setDisplayedLatestNews] = useState(4);
  const [sportnewsData, setSportNewsData] = useState([]);
  const [bestNewsData, setBestNewsData] = useState([]);
  const [latestNewsData, setLatestNewsData] = useState([]);

  const newsData = [
    { id: 1, title: "News 1", content: "Content for news 1..." },
    { id: 2, title: "News 2", content: "Content for news 2..." },
    { id: 3, title: "News 3", content: "Content for news 3..." },
    { id: 4, title: "News 4", content: "Content for news 4..." },
    { id: 5, title: "News 5", content: "Content for news 5..." },
    { id: 6, title: "News 6", content: "Content for news 6..." },
    { id: 7, title: "News 7", content: "Content for news 7..." },
    { id: 8, title: "News 8", content: "Content for news 8..." },
    { id: 9, title: "News 9", content: "Content for news 9..." },
    { id: 10, title: "News 10", content: "Content for news 10..." },
  ];

  // const fetchNewsdata=async()=>{
  //   try {
  //     const response=await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${process.env.REACT_APP_NEW_APIKEY}`)
  //     console.log(response.data);
  //     setSportNewsData(response?.data.articles)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const fetchBestNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=sports&sortBy=popularity&apiKey=${process.env.REACT_APP_NEW_APIKEY}`
      );
      console.log(response.data);
      setBestNewsData(response?.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLatestNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=sports&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEW_APIKEY}`
      );
      console.log(response.data);
      setLatestNewsData(response?.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchNewsdata();
    fetchLatestNews();
    fetchBestNews();
  }, []);

  const handleCardClick = (news) => {
    setSelectedNews(news);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowMoreBestNews = () => {
    setDisplayedBestNews((prevCount) => prevCount + 4);
  };

  const handleShowMoreLatestNews = () => {
    setDisplayedLatestNews((prevCount) => prevCount + 4);
  };

  return (
    <Container sx={{ marginTop: "40px" }}>
      <Typography variant="h6">Best News</Typography>
      <Grid container spacing={4}>
        {bestNewsData.slice(0, displayedBestNews).map((result, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                maxWidth: 345,
                height: "50vh",
                overflowY: "hidden",
                "&:hover": {
                  overflowY: "auto",
                },
              }}
            >
              <CardActionArea onClick={() => handleCardClick(result)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={result?.urlToImage}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {result.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {displayedBestNews < newsData.length && (
        <Button
          variant="contained"
          onClick={handleShowMoreBestNews}
          sx={{ mt: 2 }}
        >
          Show More Best News
        </Button>
      )}

      <Typography variant="h6">Latest News</Typography>
      <Grid container spacing={4}>
        {latestNewsData.slice(0, displayedLatestNews).map((result, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                maxWidth: 345,
                height: "50vh",
                overflowY: "hidden",
                "&:hover": {
                  overflowY: "auto",
                },
              }}
            >
              <CardActionArea onClick={() => handleCardClick(result)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={result?.urlToImage}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {result.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {displayedLatestNews < newsData.length && (
        <Button
          variant="contained"
          onClick={handleShowMoreLatestNews}
          sx={{ mt: 2 }}
        >
          Show More Latest News
        </Button>
      )}

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Card sx={{ m: 2 }}>
          <CardMedia
            component="img"
            sx={{ height: "60vh", overflowY: "auto", objectFit: "contain" }}
            image={selectedNews?.urlToImage}
            alt="News Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedNews?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedNews?.content}
            </Typography>
          </CardContent>
        </Card>
      </Modal>
    </Container>
  );
}

export default News;
