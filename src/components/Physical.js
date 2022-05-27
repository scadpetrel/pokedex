import React from "react";
import Box from "@mui/material/Box";
import { blueGrey } from "@mui/material/colors";

const Physical = (props) => {
  return (
    <>
      <h4>Physical:</h4>
      <Box
        sx={{ overflow: "auto", p: 3, boxSizing: "border-box" }}
        style={{  border: "1px solid black", borderRadius: '4px', backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        
      >
        
        <p>height: {props.height}</p>
        <p>weight: {props.weight} kg</p>
        <p>Gender: {props.gender}</p>
        <p>category: {props.category}</p>
        <p>egg groups: </p>
        {props.egg.map((egg) => (
          <span>{egg.name} </span>
        ))}
        
      </Box>
    </>
  );
};

export default Physical;
