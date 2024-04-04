import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
function Info({ data }) {
  const [matchDetails, setMatchDetails] = useState([]);

  const { match_id } = data;

  console.log(match_id, process.env.REACT_APP_TOKEN);
  const fetchMatchInfo = async () => {
    try {
      const response = await axios.get(
        `https://rest.entitysport.com/v2/matches/${match_id}/info?token=${process.env.REACT_APP_TOKEN}`
      );
      setMatchDetails(response?.data.response);
    } catch (error) {
      console.log("error :", error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    };
    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .replace(",", "");
    return formattedDate;
  }

  useEffect(() => {
    fetchMatchInfo();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "red",
        overflowY: "auto",
        height: "80vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          border: "2px solid",
          margin: "10px 5px 10px 5px",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <Typography sx={{ color: "red", marginLeft: "10px" }}>
          {matchDetails?.status_str === "Completed"
            ? matchDetails?.status_note
            : matchDetails?.toss?.text}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          border: "2px solid",
          margin: "10px 5px 10px 5px",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "grey", marginLeft: "10px" }}
        >
          3rd ODI
        </Typography>
        <Typography variant="h6" sx={{ marginLeft: "10px" }}>
          {matchDetails?.competition?.title}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          border: "2px solid",
          margin: "10px 5px 10px 5px",
          paddingBottom: "10px",
          borderRadius: "5px",
          justifyContent: "flex-start",
          paddingTop: "10px",
        }}
      >
        <Box
          sx={{ display: "flex", marginLeft: "10px", alignContent: "center" }}
        >
          <CalendarTodayIcon />
          <Typography
            variant="subtitle1"
            sx={{ marginLeft: "20px", color: "grey" }}
          >
            {formatDate(matchDetails?.date_start)}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            marginLeft: "10px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <LocationOnIcon />
          <Typography
            variant="subtitle1"
            sx={{ marginLeft: "10px", color: "grey" }}
          >
            {`${matchDetails?.venue?.name} ${matchDetails?.venue?.location}  ${matchDetails?.venue?.country}`}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            border: "2px solid",
            margin: "10px 5px ",
            borderRadius: "5px",
            padding: "10px",
            display: "flex",
          }}
        >
          <img
            src={matchDetails?.teama?.logo_url}
            style={{ height: "20px", width: "20px", borderRadius: "50%" }}
          />
          <Typography
            variant="subtitle1"
            sx={{ marginLeft: "10px", color: "grey" }}
          >
            {matchDetails?.teama?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            border: "2px solid",
            margin: "10px 5px 10px 5px",
            borderRadius: "5px",
            padding: "10px",
            display: "flex",
          }}
        >
          <img
            src={matchDetails?.teamb?.logo_url}
            style={{ height: "20px", width: "20px", borderRadius: "50%" }}
          />
          <Typography
            variant="subtitle1"
            sx={{ marginLeft: "10px", color: "grey" }}
          >
            {matchDetails?.teamb?.name}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            border: "2px solid",
            margin: "10px 5px 10px 5px",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ marginLeft: "10px", color: "grey" }}
          >
            Refree:{matchDetails?.referee}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            border: "2px solid",
            margin: "10px 5px 10px 5px",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ marginLeft: "10px", color: "grey" }}
          >
            Empire: {matchDetails?.umpires}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            border: "2px solid",
            margin: "10px 5px 10px 5px",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ marginLeft: "10px", color: "grey" }}
          >
            Third Umpire:Adrian HoldStock
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Info;
