import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import axios from "axios";
import InfoModal from "../Carousel/CarouselModal";
import ErrorNotifier from "../ToastNotifications/ErrorNotifier";
import SuccessNotifier from "../ToastNotifications/SuccessNotifier";

function Live() {
  const [liveMatchData, setLiveMatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchLiveMatch();
  }, []);

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  const fetchLiveMatch = async () => {
    try {
      const response = await axios.get(
        `https://rest.entitysport.com/v2/matches/?status=3&token=${process.env.REACT_APP_TOKEN}&paged=1&per_page=50`
      );
      setLiveMatchData(response.data.response.items);
      setLoading(false);
      setIsSuccess(true);
      setSuccessMessage("Live Data fetch sucessfully");
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.response?.data?.message);
      setError("Error fetching live match data. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginTop: "70px" }}>
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}

      {isSuccess && (
        <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
      )}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        liveMatchData.map((match) => (
          <Box
            key={match.match_id}
            sx={{
              marginBottom: "20px",
              border: "2px solid black",
              cursor: "pointer",
            }}
            onClick={() => handleMatchClick(match)}
          >
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Typography>{`${match.teama.name} vs ${match.teamb.name} - ${match.venue.name}, ${match.venue.location}`}</Typography>
                <Typography>{match.date_start}</Typography>
                <Divider
                  orientation="horizontal"
                  sx={{ width: "2px solid", marginBottom: "5px " }}
                />
              </Box>

              <Box sx={{ justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    backgroundColor: "red", // Change color based on match status
                    borderRadius: "10px",
                    marginTop: "10px",
                    marginRight: "10px",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {match.status_str} {/* Show match status */}
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
                src={match.teama.logo_url}
                style={{ height: "30px", width: "30px", borderRadius: "50%" }}
                alt={match.teama.name}
              />
              <Typography>{match.teama.name}</Typography>
              <SyncAltIcon />
              <Typography>{match.teamb.name}</Typography>
              <img
                src={match.teamb.logo_url}
                style={{ height: "30px", width: "30px", borderRadius: "50%" }}
                alt={match.teamb.name}
              />
            </Box>
            <Box>
              <Typography>{match.venue.name}</Typography>
            </Box>
          </Box>
        ))
      )}
      <InfoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedMatch}
      />
    </Box>
  );
}

export default Live;
