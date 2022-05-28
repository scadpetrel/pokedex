import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const BreedingStat = styled(Box)(({ theme }) => ({
  // height: "auto",
  // width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  // flexDirection: "column",
  // alignItems: "center",
  color: "blue",
  "& span": {
    color: "#ac0031",
  },
  "& .heightWeight": {
    // width: "70%",
    display: "flex",
    flexDirection: "column"
    // justifyContent: "space-between"
  }
}));

const Breeding = (props) => {
  const eggStepsHigh = props.eggCycle * 257
  const eggStepsLow = (props.eggCycle * 257) - 256
  return (
    <>
      {/* <h4>Physical:</h4> */}
      <BreedingStat
        sx={{ overflow: "auto", p: 3, boxSizing: "border-box" }}
        style={{   border: "1.5px solid #4eba94",
        borderRadius: "4px",
        backgroundColor: "rgba(255, 255, 255, 0.8)", }}
        width="100%"
      >
        <h4>Breeding</h4>
        {/* <div className="heightWeight"><span>Height:</span>{props.height}<span>Weight:</span> {props.weight} kg</div> */}
        
        <div className="heightWeight"><span>Gender:</span>{props.gender}</div>
        <div className="heightWeight"><span>egg groups:</span>
        {props.egg.map((egg) => (
          <div>{egg.name}</div>
        ))}
        </div>
        <div><span>Hatch Cycle:</span>
          {props.eggCycle} ({eggStepsLow} - {eggStepsHigh})
         </div>
      </BreedingStat>
    </>
  );
};

export default Breeding;
