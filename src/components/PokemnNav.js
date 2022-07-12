import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { HomeLink, PokemonTitleHeading } from "./PokemnNavStyles";

const PokemonNav = (props) => {
  const history = useNavigate();
  const homePath = localStorage.getItem('pokedexPath')
  console.log(homePath)

  function handleHome() {
    history(`${homePath}`)
  }

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ flexDirection: "row", justifyContent: "center" }}
        position="fixed"
      >
        <HomeLink onClick={handleHome}>
          <CatchingPokemonIcon   />
        </HomeLink>
        <PokemonTitleHeading
          component="h1"
        >
          {props.name} #{props.id}
        </PokemonTitleHeading>
      </AppBar>
    </Box>
  );
};

export default PokemonNav;
