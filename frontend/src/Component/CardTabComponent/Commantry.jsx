import React,{useState,useEffect} from 'react'
import { Box, Divider, Typography } from "@mui/material";
import axios from 'axios';

function Commantry({data}) {

  const [scoreCard, setScoreCard] = useState([]);
  const { match_id } = data;

  function formatDate(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dateObj = new Date(inputDate);
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedDate = `${day} ${month} ${year}, ${dayOfWeek}, ${formattedHours}:${formattedMinutes} ${ampm}`;

    return formattedDate;
  }
  const fetchScoreCard = async () => {
    try {
      const response = await axios.get(
        `https://rest.entitysport.com/v2/matches/${match_id}/scorecard?token=${process.env.REACT_APP_TOKEN}`
      );
      console.log(response.data);
      setScoreCard(response?.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchScoreCard();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
        {/* <Typography sx={{ marginLeft: "20px" }}>INFO</Typography> */}

        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "black",
              margin: "5px",
            }}
          >
            <Typography sx={{ color: "white", padding: "10px" }}>
              Series
            </Typography>
            <Typography sx={{ color: "white", padding: "10px" }}>
              {scoreCard && scoreCard?.competition?.title}
            </Typography>
          </Box>
          {/* second box */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "black",
              margin: "5px",
            }}
          >
            <Typography sx={{ color: "white", padding: "10px" }}>
              DATE & TIME
            </Typography>
            <Typography sx={{ color: "white", padding: "10px" }}>
              {formatDate(scoreCard.date_start)}
            </Typography>
          </Box>
          {/* third box */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "black",
              margin: "5px",
            }}
          >
            <Typography sx={{ color: "white", padding: "10px" }}>
              TOSS
            </Typography>
            {console.log("-----info", scoreCard)}
            {scoreCard && scoreCard?.toss && (
              <Typography sx={{ color: "white", padding: "10px" }}>
                {scoreCard.toss.text}
              </Typography>
            )}
          </Box>

          {/* 4th box */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "black",
              margin: "5px",
            }}
          >
            <Typography sx={{ color: "white", padding: "10px" }}>
              VENUE
            </Typography>
            {scoreCard && (
              <Typography sx={{ color: "white", padding: "10px" }}>
                {scoreCard?.venue?.name}
              </Typography>
            )}
          </Box>
          {/* 5th box */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "black",
              margin: "5px",
            }}
          >
            <Typography sx={{ color: "white", padding: "10px" }}>
              UMPIRES
            </Typography>
            {scoreCard && (
              <Typography sx={{ color: "white", padding: "10px" }}>
                {scoreCard?.umpires}
              </Typography>
            )}
          </Box>
          {/* 6th box */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "black",
              margin: "5px",
            }}
          >
            <Typography sx={{ color: "white", padding: "10px" }}>
              MATCH REFEREE
            </Typography>
            <Typography sx={{ color: "white", padding: "10px" }}>-</Typography>
          </Box>
        </Box>
      </Box>
  )
}

export default Commantry