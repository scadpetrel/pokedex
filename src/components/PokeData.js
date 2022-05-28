import React from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const PokeData = (props) => {
  return (
    <>
      
      <Box sx={{ p: 3, mb: 3, boxSizing: "border-box" }}style={{  border: "1.5px solid #4eba94",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", display: "flex", alignItems: "center", flexDirection: "column" }} width="100%">
           <Typography variant="h4" gutterBottom>Pokedex Data</Typography>
            
                    <div className="heightWeight"><span>Height:</span>{props.height}<span>Weight:</span> {props.weight} kg</div>

        <p><strong>Category</strong></p>
        <Box>{props.category}</Box>    
        <h4>abilities:</h4>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
        {props.abilities.map((ability) => (
          <Chip label={ability.ability.name} />
        ))}
        </Box>
        <h4>type:</h4>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
        {props.types.map((type) => (
          <Chip className={type.type.name} label={type.type.name} />
        ))}
        </Box>
      </Box>
    </>
  );
};

export default PokeData;
