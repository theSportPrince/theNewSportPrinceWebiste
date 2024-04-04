import React,{useState,useEffect} from "react";
import { Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
function PointTable() {
  const [pointTableData,setPointTableData]=useState([]);


  const bowlers = [];



  const fetchPointTable=async()=>{
     try {
      const response=await axios.get(``);
      console.log(response.data);
      setPointTableData(response.data);

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Teams</TableCell>
              <TableCell>P</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>NR</TableCell>
              <TableCell>NRR</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log("-----------", bowlers)}
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PointTable;
