import React from "react";
import { Box } from "@mui/material";

// Dummy data for trending series
const trendingSeriesData = [
  {
    id: 1,
    title: "Series 1",
    date: "2024-03-15",
    numberOfMatches: 5,
    imageUrl:
      "https://cdn.wisden.com/wp-content/uploads/2020/02/GettyImages-1148666383-e1581052648634-980x530.jpg",
  },
  {
    id: 2,
    title: "Series 2",
    date: "2024-03-18",
    numberOfMatches: 3,
    imageUrl:
      "https://media.gettyimages.com/id/1148632837/photo/hyderabad-india-ishan-kishan-of-the-mumbai-indians-bats-during-the-indian-premier-league.jpg?s=612x612&w=gi&k=20&c=MXdQgvRwLaoQhPgHdfdXHfpvTbZC8E_Mjl6Q4YswNfM=",
  },
  {
    id: 3,
    title: "Series 3",
    date: "2024-03-21",
    numberOfMatches: 7,
    imageUrl:
      "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/resizedimageskirti/22de91cd-5caa-4f65-a854-ce6829fc23d9_compressed.jpg",
  },
  // Add more series as needed
];

function TrendingSeries() {
  return (
    <Box sx={{ width: "100%" }}>
      {trendingSeriesData.map((series, index) => (
        <Box
          key={series.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "20px", // Increase gap between boxes
            padding: "10px",
            display: "flex",
            width: "100%",
            height: "fit-content",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow
          }}
        >
          <Box sx={{ flex: 1, marginRight: "10px" }}>
            <img
              src={series?.imageUrl}
              style={{ maxWidth: "100%", height: "auto" }}
              alt={series.title}
            />
          </Box>
          <Box sx={{ flex: 2 }}>
            <h3>{series.title}</h3>
            <p>Date: {series.date}</p>
            <p>Number of Matches: {series.numberOfMatches}</p>
            {/* Add more information as needed */}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default TrendingSeries;
