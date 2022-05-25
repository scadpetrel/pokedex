import React from "react";
import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../scss/PokemonNav.scss";
const PokemonNav = (props) => {
  return (
    <Box sx={{  height: 145, flexGrow: 1 }}>
    <AppBar sx={{ flexDirection: 'row', justifyContent: 'space-between' }}position="fixed">
     <Button color="inherit">Prev</Button>
     <Typography variant="h1" component="div" gutterBottom>
        {props.name} #{props.id}
      </Typography>
     <Button color="inherit">Next</Button>
    </AppBar>
    </Box>
  )


};

export default PokemonNav;
