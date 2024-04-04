import React from "react";
import { Box, Typography } from "@mui/material";
import TeamRanking from "../More/TeamRanking";
import PlayerRanking from "../More/PlayerRanking";
import Blog from "../More/Blog";

function HomeTeamRankingtab() {
  const flag = true;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-evenly",
        marginTop: "10px",
      }}
    >
      {/* parent box 1 */}
      <Box
        sx={{
          marginRight: { xs: 0, sm: "10px" }, // Add right margin on small screens and above
          textAlign: "center",

          width: { xs: "100%", sm: "50%" },
        }}
      >
       
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Blog flag={flag} />
        </Box>
      </Box>
      {/* parent box 2 */}
    
    </Box>
  );
}

export default HomeTeamRankingtab;
