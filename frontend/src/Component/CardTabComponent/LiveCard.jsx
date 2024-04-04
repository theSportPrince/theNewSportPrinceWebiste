import React, { useEffect, useState } from "react";
import { Box, Typography, Button, useMediaQuery, Divider } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import SettingsIcon from "@mui/icons-material/Settings";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
function LiveCard({ data }) {
  const [volume, setVolume] = useState(true);
  const [batsman, setBatsman] = useState([]);
  const [bawler, setBawler] = useState([]);
  const [yetTobat, setYettoBat] = useState([]);
  const [lastWicket, setlastWicket] = useState([]);
  const [currentPartnership, setCurrentPartnerShip] = useState([]);
  const [matchDetails, setMatchDetails] = useState([]);
  const [bettingTeam, setBettingTeam] = useState("");
  const [liveIningDetails, setLiveIningDetails] = useState([]);
  const [recentScores, setRecentScore] = useState("");
  const [liveScore, setLiveScore] = useState([]);
  const isMobileOrTablet = useMediaQuery("(max-width: 960px)");
  const { match_id } = data;

  console.log(match_id, process.env.REACT_APP_TOKEN);
  const fetchMatchInfo = async () => {
    const response = await axios.get(
      `https://rest.entitysport.com/v2/matches/${match_id}/live?token=${process.env.REACT_APP_TOKEN}`
    );
    console.log("match info response", response.data.response);

    setBatsman(response?.data?.response?.batsmen);
    setBawler(response?.data?.response?.bowlers);
    setCurrentPartnerShip(
      response?.data?.response?.live_inning?.current_partnership
    );
    setlastWicket(response?.data?.response?.live_inning?.last_wicket);
    setYettoBat(response?.data?.response?.live_inning?.did_not_bat);
    setRecentScore(response?.data?.response?.live_inning?.recent_scores);
    setLiveIningDetails(response?.data?.response?.live_inning);
    setBettingTeam(response?.data?.response?.team_batting);
    setLiveScore(response?.data?.response?.live_score);
  };

  const MatchInfo = async () => {
    try {
      const response = await axios.get(
        `https://rest.entitysport.com/v2/matches/${match_id}/info?token=${process.env.REACT_APP_TOKEN}`
      );
      console.log("match", response?.data.response);
      setMatchDetails(response?.data.response);
    } catch (error) {
      console.log("error :", error);
    }
  };

  let scoresArray = [];

  if (recentScores) {
    scoresArray = recentScores.split(",");
  }

  console.log(scoresArray);
  useEffect(() => {
    fetchMatchInfo();
    MatchInfo();
  }, []);

  const handleVolume = () => {
    setVolume(!volume);
  };
  const dummyData = [
    {
      over: 1,
      ball1: "-",
      ball2: "6",
      ball3: "W",
      ball4: "-",
      ball5: "4",
      ball6: "-",
    },
    {
      over: 2,
      ball1: "W",
      ball2: "-",
      ball3: "-",
      ball4: "6",
      ball5: "-",
      ball6: "W",
    },
    {
      over: 3,
      ball1: "-",
      ball2: "6",
      ball3: "4",
      ball4: "-",
      ball5: "-",
      ball6: "W",
    },
    {
      over: 4,
      ball1: "-",
      ball2: "6",
      ball3: "4",
      ball4: "-",
      ball5: "-",
      ball6: "W",
    },
    // Add more data as needed
  ];

  return (
    <Box
      sx={{
        // height: "fit-content",
        width: "100%",
        height: "80vh",
        backgroundColor: "grey",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "grey",
          alignItems: "center",
          justifyItems: "center",
          alignContent: "center",
          textAlign: "-webkit-center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* 1st layer box */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              backgroundColor: "white",
              border: "2px solid",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {volume === true ? (
                <VolumeUpIcon onClick={handleVolume} />
              ) : (
                <VolumeOffIcon onClick={handleVolume} />
              )}
            </Box>
            <Box>
              <LiveTvIcon />
            </Box>
          </Box>

          {/* 2nd layer box */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "black",
              height: "20vh",
              color: "white",
              textAlign: "-webkit-center",
              paddingTop: "40px",
            }}
          >
            <Typography>Live Score will show</Typography>
          </Box>

          {/* 3rd box */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
              border: "2px solid",
            }}
          >
            <Typography>
              {bettingTeam} {liveIningDetails?.scores_full}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        {/* box1 */}
        <Typography>{matchDetails?.teama?.short_name} :</Typography>
        <Typography>{matchDetails?.teamb?.short_name} :</Typography>
        <Typography>Target :{liveScore?.target}</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>BAN Need 0 Runs In 58 Balls</Typography>
      </Box>

      <Box sx={{ backgroundColor: "white", overflowX: "auto" }}>
        {/* 1st box */}
        {/* <Box sx={{ justifyContent: "space-between", display: "flex" }}>
          <Typography>Fav Team : BAN</Typography>
          <Typography>BAN</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button>1</Button>
            <Button>0</Button>
          </Box>
        </Box>
        <Divider /> */}

        {/* 2nd box */}
        {/* <Box sx={{ justifyContent: "space-between", display: "flex" }}>
          <Typography>Fav Team : BAN</Typography>
          <Typography>BAN</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button>1</Button>
            <Button>0</Button>
          </Box>
        </Box> */}
        {/* <Divider />  */}

        {/* 3rd box */}
        {/* <Box sx={{ justifyContent: "space-between", display: "flex" }}>
          <Typography>Fav Team : BAN</Typography>
          <Typography>BAN</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button>1</Button>
            <Button>0</Button>
          </Box>
        </Box> */}
      </Box>

      <Box sx={{ width: "100%", backgroundColor: "white", overflowX: "auto" }}>
        <Table
          sx={{
            width: "100%",
            height: "fit-content",

            paddingLeft: "10px",
            paddingRight: "`10px",
          }}
        >
          <TableHead sx={{ width: "100%" }}>
            <TableRow>
              <TableCell>Batter</TableCell>
              <TableCell>R(B)</TableCell>
              <TableCell>4s</TableCell>
              <TableCell>6s</TableCell>
              <TableCell>SR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {batsman && batsman?.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.runs}</TableCell>
                <TableCell>{player.fours}</TableCell>
                <TableCell>{player.sixes}</TableCell>
                <TableCell>{player.strike_rate}</TableCell>
              </TableRow>
            ))}

            {/* Add more rows as needed */}
          </TableBody>
        </Table>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Typography>
            P'Ship :{currentPartnership?.runs}({currentPartnership?.balls})
          </Typography>
          <Typography>Last Wicket:{lastWicket && lastWicket?.name}</Typography>
        </Box>
      </Box>

      {/* bowler */}
      <Box sx={{ width: "100%", backgroundColor: "white", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bowler</TableCell>
              <TableCell>W</TableCell>
              <TableCell>R</TableCell>
              <TableCell>Overs</TableCell>
              <TableCell>Econ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bawler && bawler?.map((player, index) => (
              <TableRow key={`bowler-${index}`}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.wickets}</TableCell>
                <TableCell>{player.runs_conceded}</TableCell>
                <TableCell>{player.overs}</TableCell>
                <TableCell>{player.econ}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ backgroundColor: "white", width: "100%", padding: "10px" }}>
        <Typography>Yet To Bat</Typography>
        <Divider />

        {yetTobat.map((player, index) => (
          <Typography key={index}>{player.name}</Typography>
        ))}
      </Box>
      {/* last 4 over details */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          overflowX: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>Recent Score</Typography>
        <Typography sx={{ width: `${scoresArray.length * 30}px` }}>
          {scoresArray.map((score, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                backgroundColor: score === "4" ? "red" : "transparent",
                color: score === "4" || score === "6" ? "white" : "black",
                textAlign: "center",
                lineHeight: "25px",
                margin: "0 5px",
              }}
            >
              {score}
            </span>
          ))}
        </Typography>
      </Box>

      {/* session */}
      <Box sx={{ width: "100%", backgroundColor: "white" }}>
        <Box
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography>Session</Typography>
          <Divider />
        </Box>

        <Box sx={{ width: "100%", backgroundColor: "white" }}>
          <Typography variant="h5">Match Information</Typography>
          <Typography>
            Match Date: {matchDetails?.date_start_ist}
            <br />
            Venue: {matchDetails?.venue?.name}
            <br />
            Teams: {matchDetails.title}
            <br />
            Match Type: {matchDetails?.format_str}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default LiveCard;
