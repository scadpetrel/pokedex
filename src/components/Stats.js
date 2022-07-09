import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { changeToTitleCase } from "../helper";

const StatsContainer = styled(Box)(({ theme }) => ({
  // border: "1.5px solid #4eba94",
  // borderRadius: "4px",
  // backgroundColor: "rgba(255, 255, 255, 0.8)",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
}));

const StatsGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& span": {
    color: "#ac0031",
  },
}));

const Stats = (props) => {
  return (
    <>
      <StatsContainer sx={{ mt: 3, p: 2, boxSizing: "border-box" }} className="PokemonInfoBox">
        <Typography variant="h4" mb={4} gutterBottom>
          Stats
        </Typography>
        <Grid container spacing={2}>
          {props.stats.map((stat) => (
            <StatsGrid key={`${stat.stat.name}-${stat.base_stat}`} item xs={12} sm={4} md={6} lg={4}>
              <Typography key={stat.stat.name}color="#ac0031" variant="subtitle2">
                <span>{changeToTitleCase(stat.stat.name)}</span>
              </Typography>
              <Typography key={stat.base_stat} variant="body1">{stat.base_stat}</Typography>
            </StatsGrid>
          ))}
        </Grid>
      </StatsContainer>
    </>
  );
};

export default Stats;
