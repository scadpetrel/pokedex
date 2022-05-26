import React from 'react';
import Box from "@mui/material/Box";
import { lightBlue } from '@mui/material/colors';

const Evolution = (props) => {


  return (
    <>
    <Box style={{ backgroundColor: "#e0e0e0" }}width="100%">
    <h4>Evolution: </h4>
    {props.evolution.map((evo) => (
      <p>
        {evo.species_name} 
      </p>
    ))}
    </Box>
    </>
  )
}

export default Evolution;