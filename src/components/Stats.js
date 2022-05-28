import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
// import { lightBlue } from '@mui/material/colors';
import "../scss/Stats.scss";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& span": {
    color: "#ac0031",
  },
  // "& .MuiInputBase-input": {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //   transition: theme.transitions.create("width"),
  //   width: "100%",
  //   [theme.breakpoints.up("md")]: {
  //     width: "20ch",
  //   },
  // },
}));

const Stats = (props) => {
  return (
    <>
      
      <Box
        sx={{ mt: 3, p: 2, boxSizing: "border-box" }}
        style={{
          border: "1.5px solid #4eba94",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        width="100%"
      >
        <Typography variant="h4" gutterBottom="true">Stats</Typography>
        <h2></h2>
        <Grid container spacing={2}>
        
          {props.stats.map((stat) => (
            <StyledGrid item xs={12} sm={4} md={6} lg={4}>
              <span>{stat.stat.name}</span> {stat.base_stat}
            </StyledGrid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Stats;
