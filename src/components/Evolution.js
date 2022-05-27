import React from 'react';
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import '../scss/Evolution.scss'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { padding } from '@mui/system';

const EvolutionImg = styled("div")(({ theme }) => ({
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  
  "& img": {
    height: "75px",
    width: "75px",
    margin: "15px",
    padding: "15px",
    // borderRadius: "50%",
    // backgroundColor: "blue",
    // boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "white"
    }
  },
  
}));

const Evolution = (props) => {
  const [evolution, setEvolution ] = useState([])

  useEffect(() => {
    // fetchPokemons()
   getEvolutionDetails();
    // getSpecies()
  }, []);  

  const getEvolutionDetails = async () => {
    let evoData = []
    axios.all(props.evolution.map((endpoint) => axios.get(`https://pokeapi.co/api/v2/pokemon/${endpoint.species_name}`))).then(function (response) {
      console.log(response[0].data.sprites)
      response.map((details) => evoData = [...evoData, {id: details.data.id, name: details.data.name, img: details.data.sprites.other.dream_world.front_default}])
      console.log(evoData)
      setEvolution(evoData)
    }
    );
    // console.log(evoData)
  };

  return (
    <div className='Evolution'>
    <Box sx={{ mb: 3, p: 3, boxSizing: "border-box"}} style={{ display: 'flex', flexDirection: 'column', alignItems: "center", border: "1.5px solid #4eba94", borderRadius: "4px",  backgroundColor: "rgba(255, 255, 255, 0.8)" }}width="100%">
      <div>
      <h4>Evolution</h4>
      </div>
      <div className='Evolution-chain'>
    {evolution.map((evo) => (
      <>
      <EvolutionImg>
        <a href={`/${evo.id}`}><img src={evo.img} /></a>
        <p>{evo.name}</p>
      </EvolutionImg>
      <span>→</span>
      </>
    ))}
    </div>
    </Box>
    </div>
  )
}

export default Evolution;