import React from 'react';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { styled } from "@mui/material/styles";
// import { lightBlue } from '@mui/material/colors';
import '../scss/Stats.scss'

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& span": {
    color: "#ac0031"
  }
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
    <h4>Stats: </h4>
    <Box sx={{ mt: 3, p: 3, boxSizing: "border-box" }}style={{  border: "1px solid black", borderRadius: "4px", display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}width="100%">
    <Grid container spacing={2}>
    {props.stats.map((stat) => (
      
      <StyledGrid item xs={12} md={6} lg={4}>
      <span>{stat.stat.name}</span> {stat.base_stat}
      </StyledGrid>
      
    ))}
    </Grid>
    </Box>
    </>
  )
}

export default Stats;