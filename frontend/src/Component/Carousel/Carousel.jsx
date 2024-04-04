import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  Box,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import InfoModal from "./CarouselModal";
import axios from "axios";
import ErrorNotifier from "../ToastNotifications/ErrorNotifier";
import SuccessNotifier from "../ToastNotifications/SuccessNotifier";

function SimpleSlider() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const settings = {
    dots: false,
    swipeToSlide: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrow: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // const fetchMatchData = async () => {
  //   try {
  //     const statuses = [1, 2, 3]; // Status values to fetch
  //     let allMatches = []; // Array to store all matches from different statuses

  //     for (const status of statuses) {
  //       const response = await axios.get(
  //         `https://rest.entitysport.com/v2/matches/?status=${status}&token=${process.env.REACT_APP_TOKEN}`
  //       );
  //       const { items } = response.data.response;
  //       allMatches = [...allMatches, ...items]; // Merge current status matches with previous matches
  //     }
  //     console.log(allMatches);
  //     setMatchData(allMatches);
  //     setLoading(false);
  //   } catch (error) {
  //     setError("Error fetching match data. Please try again later.");
  //     setLoading(false);
  //   }
  // };
  const fetchMatchData = async () => {
    try {
      const statuses = [3, 1, 2]; // Status values to fetch
      const batchedRequests = statuses.map((status) =>
        axios.get(
          `https://rest.entitysport.com/v2/matches/?status=${status}&token=${process.env.REACT_APP_TOKEN}&per_page=50`
        )
      );

      const responses = await Promise.all(batchedRequests);
      let allMatches = [];

      responses.forEach((response) => {
        const { items } = response.data.response;
        allMatches = [...allMatches, ...items];
      });
      setMatchData(allMatches);
      setLoading(false);
      setIsSuccess(true);
      setSuccessMessage("Data fetched Sucessfully");
    } catch (error) {
      setHasError(true);
      setErrorMessage("Error fetching match data. Please try again later.");
      // setError("Error fetching match data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchData();
  }, []);

  const renderDescription = (item) => {
    if (item.status === 2) {
      return item.status_note;
    } else if (item.status === 1 && item.start_time < 24) {
      return `Match starts in ${item.start_time} hours`;
    } else if (item.status === 1 && item.start_time > 24) {
      return `Match starts in ${item.date_start_ist} hours`;
    } else if (item.status === 3) {
      // console.log("-----------------", item);
      // return `Scores: ${item.live_inning?.scores_full}`;
    }
  };

  return (
    <>
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}

      {isSuccess && (
        <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
      )}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Slider {...settings} style={{ backgroundColor: "red" }}>
          {matchData.map((item, index) => (
            <Box
              key={index}
              onClick={() => handleCardClick(item)}
              sx={{ justifyContent: "space-around" }}
            >
              <Box
                sx={{
                  width: "90%",
                  height: "35vh",
                  padding: "20px",
                  border: "2px solid black",
                  marginLeft: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  marginRight: "10px",
                  backgroundColor: "white",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {/* <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button>{item.buttonText}</button> */}
                <Box sx={{ width: "100%" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    {item?.competition.title}
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "100%" }}>
                    {/* title box */}
                    <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      {item?.short_title}
                    </Typography>
                    <Typography>{item?.date_start}</Typography>
                    <Divider
                      orientation="horizontal"
                      sx={{
                        width: "100%",
                        height: "2px",
                        backgroundColor: "black",
                      }}
                    />
                  </Box>
                  <Box>
                    {/* button box */}
                    <Button
                      sx={{
                        borderRadius: "5%",
                        backgroundColor:
                          item?.status_str === "Live"
                            ? "red"
                            : item?.status_str === "Completed"
                            ? "green"
                            : "orange",
                        color: "white",
                      }}
                    >
                      {item?.status_str === "Scheduled"
                        ? "Upcoming"
                        : item?.status_str}
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <img
                    src={item?.teama.logo_url}
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography>{item?.teama.short_name}</Typography>
                  <SyncAltIcon />
                  <Typography>{item?.teamb.short_name}</Typography>
                  <img
                    src={item?.teamb.logo_url}
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  {/* description */}

                  <Typography>{renderDescription(item)}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      alignItems: "center",
                      marginRight: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "orange",
                        borderRadius: "5%",
                        height: "20px",
                        width: "5px",
                        textAlign: "center",
                        alignItems: "center",
                        marginLeft: "5px",
                      }}
                    >
                      1
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "black",
                        borderRadius: "5%",
                        height: "20px",
                        width: "5px",
                      }}
                    >
                      2
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      )}

      <InfoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedItem}
      />
    </>
  );
}

export default SimpleSlider;
