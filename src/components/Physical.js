import React from "react";
import Box from "@mui/material/Box";
import { lightBlue } from "@mui/material/colors";

const Physical = (props) => {
  return (
    <>
      <Box sx={{ overflow: 'auto' }} style={{ backgroundColor: "#e0e0e0" }} width="100%">
  
          <h4>Physical:</h4>
          <p>height: {props.height}</p>
          <p>weight: {props.weight} kg</p>
          <p>Gender: {props.gender}</p>
          <p>category: {props.category}</p>
          <p>egg types</p>    
      </Box>
    </>
  );
};

export default Physical;
