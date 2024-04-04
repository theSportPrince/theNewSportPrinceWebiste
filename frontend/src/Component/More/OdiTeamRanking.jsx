import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

// Dummy data for team rankings
const teamRankingsData = [
  { position: 1, teamName: "Team A", ranking: 100, points: 200 },
  { position: 2, teamName: "Team B", ranking: 90, points: 180 },
  { position: 3, teamName: "Team C", ranking: 80, points: 160 },
  { position: 4, teamName: "Team D", ranking: 70, points: 140 },
  { position: 5, teamName: "Team E", ranking: 60, points: 120 },
];

function OdiTeamRanking() {
  return (
    <div style={{ overflowX: "auto", width: "100%",  }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Position</TableCell>
            <TableCell variant="head">Team Name</TableCell>
            <TableCell variant="head">Ranking</TableCell>
            <TableCell variant="head">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamRankingsData.map((team, index) => (
            <TableRow
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? "#f0f0f0" : "white" }}
            >
              <TableCell>{team.position}</TableCell>
              <TableCell>{team.teamName}</TableCell>
              <TableCell>{team.ranking}</TableCell>
              <TableCell>{team.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OdiTeamRanking;
