import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import "../scss/PokemonNav.scss";
import { changeToTitleCase } from '../helper'
// import { useParams } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const PokemonNav = (props) => {
  const history = useNavigate();

  function handlePrev(){
    history(`/${props.id -1}`)
    // history(0)
  }

  function handleNext(){
    history(`/${props.id +1}`)
    // history(0)
  }
  function handleHome(){
    history('/')
    // history(0)
  }

  let name = changeToTitleCase(props.name)
  
  return (
    <Box sx={{   flexGrow: 1 }}>
    <AppBar sx={{ flexDirection: 'row', justifyContent: 'center' }}position="fixed">
    <CatchingPokemonIcon onClick={handleHome} style={{ fontSize: "2.5rem", position: "absolute", left: "20", top: "15"}}/>
      
     {/* <Button color="inherit" onClick={handlePrev}>Prev</Button> */}
     <Typography variant="h3" component="h1" align="center" gutterBottom>
        {props.name} #{props.id}
      </Typography>
     {/* <Button color="inherit" onClick={handleNext}>Next</Button> */}
    </AppBar>
    </Box>
  )


};

export default PokemonNav;
