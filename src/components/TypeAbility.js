import React from "react";
import Box from "@mui/material/Box";
import { lightBlue } from "@mui/material/colors";

const Stats = (props) => {
  return (
    <>
      <Box style={{ backgroundColor: "#e0e0e0" }} width="100%">
        <h4>abilities:</h4>
        {props.abilities.map((ability) => (
          <p>{ability.ability.name}</p>
        ))}
        <h4>type:</h4>
        {props.types.map((type) => (
          <p>{type.type.name}</p>
        ))}
      </Box>
    </>
  );
};

export default Stats;
