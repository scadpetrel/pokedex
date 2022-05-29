import React from "react";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import useMediaQuery from '@mui/material/useMediaQuery';  
import "../scss/Evolution.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { padding } from "@mui/system";


// component sytles =============
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
    // borderRadius: "50%",
    // backgroundColor: "blue",
    // boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "white",
    },
  },
}));


// main function ============
const Evolution = (props) => {
  const [evolution, setEvolution] = useState([]);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
 

  useEffect(() => {
    // fetchPokemons()
    getEvolutionDetails();
    // getSpecies()
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
    // console.log(evoData)
  };

  return (
    <div className="Evolution">
      <Box
        sx={{ mb: 3, p: 3, boxSizing: "border-box" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1.5px solid #4eba94",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
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
                <p>{evo.name}</p>
              </EvolutionImg>
              {smUp ? <ArrowRightAltIcon /> : <ArrowDownwardIcon /> }
              {/* <i class="fa-solid fa-arrow-right"></i>
      <i class="fa-solid fa-arrow-down"></i> */}
            </>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Evolution;
