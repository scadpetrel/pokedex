import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { changeToTitleCase } from "../helper";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../scss/Evolution.scss";

// component sytles =============
const EvolutionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1.5px solid #4eba94",
  borderRadius: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  "& .Evolution-chain": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& svg": {
      alignSelf: "flex-end",
      // marginBottom: "10px",
      color: "#4eba94",
    },
    "& svg:last-of-type": {
      display: "none",
    },
  },
}));

const EvolutionImg = styled("div")(({ theme }) => ({
  height: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& img": {
    height: "4rem",
    width: "4rem",
    margin: "15px",
    padding: "15px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
}));

// main function ============
const Evolution = (props) => {
  const [evolution, setEvolution] = useState([]);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    getEvolutionDetails();
  }, []);

  const getEvolutionDetails = async () => {
    let evoData = [];
    axios
      .all(
        props.evolution.map((endpoint) =>
          axios.get(
            `https://pokeapi.co/api/v2/pokemon/${endpoint.species_name}`
          )
        )
      )
      .then(function (response) {
        console.log(response[0].data.sprites);
        response.map(
          (details) =>
            (evoData = [
              ...evoData,
              {
                id: details.data.id,
                name: details.data.name,
                img: details.data.sprites.other.dream_world.front_default,
              },
            ])
        );
        console.log(evoData);
        setEvolution(evoData);
      });
  };

  return (
    <>
      <EvolutionContainer
        sx={{ mb: 3, p: 3, boxSizing: "border-box" }}
        width="auto"
      >
        <Typography variant="h4" gutterBottom>
          Evolution
        </Typography>
        <div className="Evolution-chain">
          {evolution.map((evo) => (
            <>
              <EvolutionImg>
                <a href={`/${evo.id}`}>
                  <img src={evo.img} />
                </a>
                <Typography variant="body1">
                  {changeToTitleCase(evo.name)}
                </Typography>
              </EvolutionImg>
              {smUp ? <ArrowRightAltIcon /> : <ArrowDownwardIcon />}
            </>
          ))}
        </div>
      </EvolutionContainer>
    </>
  );
};

export default Evolution;
