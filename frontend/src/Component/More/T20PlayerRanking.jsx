import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

// Dummy data for player rankings
const playerRankingsData = [
  { position: 1, playerName: "Player A", country: "Country A", points: 200 },
  { position: 2, playerName: "Player B", country: "Country B", points: 180 },
  { position: 3, playerName: "Player C", country: "Country C", points: 160 },
  { position: 4, playerName: "Player D", country: "Country D", points: 140 },
  { position: 5, playerName: "Player E", country: "Country E", points: 120 },
];

function T20PlayerRanking() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle1">Rank</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1">Player Name</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1">Country</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1">Points</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerRankingsData.map((player, index) => (
            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "#f0f0f0" : "white" }}>
              <TableCell align="center">{player.position}</TableCell>
              <TableCell align="center">{player.playerName}</TableCell>
              <TableCell align="center">{player.country}</TableCell>
              <TableCell align="center">{player.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default T20PlayerRanking;
