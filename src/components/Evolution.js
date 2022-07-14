import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { changeToTitleCase } from "../helper";
// MUI Components
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useMediaQuery from "@mui/material/useMediaQuery";
// Styles and Helpers
import { EvolutionContainer, EvolutionImg } from "./EvolutionStyles";

const Evolution = (props) => {
  const [evolution, setEvolution] = useState([]);

  // Theme breakpoints for media queries in JSX
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  // Fetch evolution data from API
  useEffect(() => {
    const getEvolutionDetails = async () => {
      // console.log("getEvolutionDetails");
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
          response.map(
            (details) =>
              (evoData = [
                ...evoData,
                {
                  id: details.data.id,
                  name: details.data.name,
                  img: details.data.sprites.other.dream_world.front_default,
                  imgAlt: details.data.sprites.other.home.front_default,
                },
              ])
          );
          setEvolution(evoData);
        });
    };
    getEvolutionDetails();
  }, [props.evolution]);

  return (
      <EvolutionContainer className="PokemonInfoBox">
        <Typography variant="h4" gutterBottom>
          Evolution
        </Typography>
        <div className="Evolution-chain">
          {evolution.map((evo) => (
            <div key={`chainBlock-${evo.name}`}>
              <EvolutionImg key={`img-${evo.name}`}>
                <a href={`/pokemon/${evo.id}`}>
                  {!evo.img ? (
                    <img key={`imageAlt-${evo.name}`} src={evo.imgAlt} alt={`Illustration of ${evo.name} Pokemon`}/>
                  ) : (
                    <img key={`imageMain-${evo.name}`} src={evo.img} alt={`Illustration of ${evo.name} Pokemon`}/>
                  )}
                </a>
                <Typography variant="body1" key={evo.name}>
                  {changeToTitleCase(evo.name)}
                </Typography>
              </EvolutionImg>
              {smUp ? (
                <ArrowRightAltIcon key={`arrowRight-${evo.name}`} />
              ) : (
                <ArrowDownwardIcon key={`arrowDown-${evo.name}`} />
              )}
            </div>
          ))}
        </div>
      </EvolutionContainer>
  );
};

export default Evolution;
