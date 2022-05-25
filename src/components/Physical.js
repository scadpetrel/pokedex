import React from "react";
import Box from "@mui/material/Box";
import { lightBlue } from "@mui/material/colors";

const Physical = (props) => {
  return (
    <>
      <Box sx={{ overflow: 'auto' }} style={{ backgroundColor: "#e0e0e0" }} width="100%">
  
          <p>Physical: </p>
          <p>height: {props.height}</p>
          <p>weight: {props.weight}</p>
          <p>gender - get</p>
          <p>category - get</p>    
      </Box>
    </>
  );
};

export default Physical;
