import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Typography from '@mui/material/Typography';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import "../scss/PokemonNav.scss";
import { changeToTitleCase } from '../helper'
const PokemonNav = (props) => {
  const history = useNavigate();

  function handleHome(){
    history('/')
  }

  let name = changeToTitleCase(props.name)
  
  return (
    <Box sx={{   flexGrow: 1 }}>
    <AppBar sx={{ flexDirection: 'row', justifyContent: 'center' }}position="fixed">
    <CatchingPokemonIcon onClick={handleHome} style={{ fontSize: "2.5rem", position: "absolute", left: "20", top: "15"}}/>
     <Typography variant="h3" component="h1" align="center" gutterBottom>
        {props.name} #{props.id}
      </Typography>
    </AppBar>
    </Box>
  )
};

export default PokemonNav;
