import React from "react";
import Box from "@mui/material/Box";
// import { lightBlue } from "@mui/material/colors";
import Chip from '@mui/material/Chip';

const Stats = (props) => {
  return (
    <>
      <Box style={{ backgroundColor: "#e0e0e0" }} width="100%">
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

export default Stats;
