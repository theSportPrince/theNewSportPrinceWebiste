import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Divider, Typography } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import not from "../../assets/not.png";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// for batter
const ResponsiveTable = ({ data }) => {
  if (!data || !data.batsmen || data.batsmen.length === 0) {
    return <div>No batsman data available</div>;
  }

  const { batsmen } = data;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Batter</TableCell>
            <TableCell>R</TableCell>
            <TableCell>B</TableCell>
            <TableCell>4s</TableCell>
            <TableCell>6s</TableCell>
            <TableCell>SR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            batsmen &&
            batsmen?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.runs}</TableCell>
                <TableCell>{row.balls_faced}</TableCell>
                <TableCell>{row.fours}</TableCell>
                <TableCell>{row.sixes}</TableCell>
                <TableCell>{row.strike_rate}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// bowler table

const BowlerTable = ({ data }) => {
  const { batsmen, bowlers } = data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bowler</TableCell>
            <TableCell>Ov</TableCell>
            <TableCell>M</TableCell>
            <TableCell>R</TableCell>
            <TableCell>W</TableCell>
            <TableCell>NB</TableCell>
            <TableCell>WD</TableCell>
            <TableCell>Eco</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bowlers &&
            bowlers?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row?.name}</TableCell>
                <TableCell>{row?.overs}</TableCell>
                <TableCell>{row?.maidens}</TableCell>
                <TableCell>{row?.runs_conceded}</TableCell>
                <TableCell>{row?.wickets}</TableCell>
                <TableCell>{row?.noballs}</TableCell>
                <TableCell>{row?.wides}</TableCell>
                <TableCell>{row?.econ}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function ScoreCard({ data }) {
  const tabledata = [];
  const { match_id } = data;
  const [scoreCard, setScoreCard] = useState([]);
  const [expandScoreCard, setExpandScoreCard] = useState(false);
  const [expandScoreCardforteamb, setExpandScoreCardForTeamb] = useState(false);
  const handleExpandscoreCardforTeama = () => {
    setExpandScoreCard(!expandScoreCard);
  };
  const handleExpandscoreCardforTeamb = () => {
    setExpandScoreCardForTeamb(!expandScoreCardforteamb);
  };
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

  const { innings } = scoreCard;
  const TeamAInnings = innings && innings.length > 0 ? innings[0] : null;
  const TeamBInnings = innings && innings.length > 1 ? innings[1] : null;

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",

        overflowY: "auto",
      }}
    >
      {scoreCard?.status_str === "Scheduled" ? (
        <Box
          sx={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            display: "flex",
          }}
        >
          <img src={not} style={{ width: "60%", height: "50%", top: "50%" }} />
        </Box>
      ) : (
        <Box>
          <Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "white",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <img
                src={scoreCard && scoreCard?.teama?.logo_url}
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                }}
              />
              <Typography>
                {scoreCard && scoreCard?.teama?.short_name}
              </Typography>
              <SyncAltIcon />
              <Typography>
                {scoreCard && scoreCard?.teamb?.short_name}
              </Typography>
              <img
                src={scoreCard && scoreCard?.teamb?.logo_url}
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                width: "100%",
                textAlign: "center",
              }}
            >
              <Typography sx={{ color: "red" }}>
                {scoreCard && scoreCard?.result}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "black",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                color: "white",
              }}
              onClick={handleExpandscoreCardforTeama}
            >
              <Typography>{TeamAInnings && TeamAInnings.short_name}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>
                  Run {TeamAInnings && TeamAInnings.short_name}
                </Typography>
                {expandScoreCard ? (
                  <KeyboardArrowDownIcon
                    onClick={handleExpandscoreCardforTeama}
                  />
                ) : (
                  <KeyboardArrowUpIcon
                    onClick={handleExpandscoreCardforTeama}
                  />
                )}
              </Box>
            </Box>

            {expandScoreCard && (
              <>
                <ResponsiveTable data={TeamAInnings} />
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "black",
                    display: "flex",
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  {scoreCard.status_str === "Live" ? (
                    <Typography>
                      YET TO BAT: Sameer Shaik, Suresh Kumar, Taher Bin Jaffar,
                      SP Reddy
                    </Typography>
                  ) : (
                    <Typography>
                      DID NOT BAT:{" "}
                      {TeamAInnings &&
                        TeamAInnings.did_not_bat.map((batsman, index) => (
                          <span key={batsman.player_id}>
                            {batsman.name}
                            {index !== TeamAInnings.did_not_bat.length - 1 &&
                              ", "}
                          </span>
                        ))}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "black",
                    display: "flex",
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  <Typography>
                    EXTRA ( B - {TeamAInnings && TeamAInnings?.extra_runs?.byes}
                    , W - {TeamAInnings && TeamAInnings?.extra_runs?.wides}, NB
                    - {TeamAInnings && TeamAInnings?.extra_runs?.noballs}, LB -{" "}
                    {TeamAInnings && TeamAInnings?.extra_runs?.legbyes}, P -{" "}
                    {TeamAInnings && TeamAInnings?.extra_runs?.penalty} )
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  <Typography>TOTAL</Typography>
                  <Typography>
                    {" "}
                    {TeamAInnings && TeamAInnings?.scores_full}{" "}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "black",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  <Typography>Fall of Wickets</Typography>
                  <Divider />
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "black",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {TeamAInnings &&
                      TeamAInnings?.fows.map((fow, index) => (
                        <Typography key={index} sx={{ marginRight: "10px" }}>
                          {fow.runs}-{fow.number} ({fow.name},{" "}
                          {fow.overs_at_dismissal})
                        </Typography>
                      ))}
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <BowlerTable data={TeamAInnings} />
                </Box>
              </>
            )}
          </Box>

          <Box>
            {TeamBInnings && (
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "black",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  padding: "10px",
                  color: "white",
                }}
                onClick={handleExpandscoreCardforTeamb}
              >
                <Typography>
                  {TeamBInnings && TeamBInnings.short_name}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>
                    Run {TeamBInnings && TeamBInnings?.short_name}
                  </Typography>
                  {expandScoreCardforteamb ? (
                    <KeyboardArrowDownIcon
                      onClick={handleExpandscoreCardforTeamb}
                    />
                  ) : (
                    <KeyboardArrowUpIcon
                      onClick={handleExpandscoreCardforTeamb}
                    />
                  )}
                </Box>
              </Box>
            )}

            {expandScoreCardforteamb && (
              <>
                <ResponsiveTable data={TeamBInnings} />
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "black",
                    display: "flex",
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  {scoreCard.status_str === "Live" ? (
                    <Typography>
                      YET TO BAT: Sameer Shaik, Suresh Kumar, Taher Bin Jaffar,
                      SP Reddy
                    </Typography>
                  ) : (
                    <Typography>
                      DID NOT BAT:{" "}
                      {TeamBInnings &&
                        TeamBInnings.did_not_bat.map((batsman, index) => (
                          <span key={batsman.player_id}>
                            {batsman.name}
                            {index !== TeamBInnings.did_not_bat.length - 1 &&
                              ", "}
                          </span>
                        ))}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "black",
                    display: "flex",
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  <Typography>
                    EXTRA ( B - {TeamBInnings && TeamBInnings?.extra_runs?.byes}
                    , W - {TeamBInnings && TeamBInnings?.extra_runs?.wides}, NB
                    - {TeamBInnings && TeamBInnings?.extra_runs?.noballs}, LB -{" "}
                    {TeamBInnings && TeamBInnings?.extra_runs?.legbyes}, P -{" "}
                    {TeamBInnings && TeamBInnings?.extra_runs?.penalty} )
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "space-between",
                    border: "2px solid",
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  <Typography>TOTAL ( 9.10 RUNS PER OVER )</Typography>
                  <Typography>
                    {" "}
                    {TeamBInnings && TeamBInnings?.scores_full}{" "}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "black",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  <Typography>Fall of Wickets</Typography>
                  <Divider />
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "black",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {TeamBInnings &&
                      TeamBInnings?.fows.map((fow, index) => (
                        <Typography key={index} sx={{ marginRight: "10px" }}>
                          {fow.runs}-{fow.number} ({fow.name},{" "}
                          {fow.overs_at_dismissal})
                        </Typography>
                      ))}
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <BowlerTable data={TeamBInnings} />
                </Box>
              </>
            )}
          </Box>

          <Box sx={{ width: "100%" }}>
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
                <Typography sx={{ color: "white", padding: "10px" }}>
                  -
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ScoreCard;
