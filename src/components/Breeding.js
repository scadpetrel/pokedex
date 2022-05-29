import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from '@mui/material/Chip';
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const BreedingStat = styled(Box)(({ theme }) => ({
  // height: "auto",
  // width: "100%",
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "center",
  // flexDirection: "column",
  // alignItems: "center",
  "& span": {
    color: "#ac0031",
  },
  "& .heightWeight": {
    // width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Breeding = (props) => {
  const eggStepsHigh = props.eggCycle * 257;
  const eggStepsLow = props.eggCycle * 257 - 256;
  return (
    <>
      {/* <h4>Physical:</h4> */}
      <BreedingStat
        sx={{ overflow: "auto", p: 3, boxSizing: "border-box" }}
        style={{
          border: "1.5px solid #4eba94",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
        width="100%"
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center">
              Breeding
            </Typography>
          </Grid>
          {/* <div className="heightWeight"><span>Height:</span>{props.height}<span>Weight:</span> {props.weight} kg</div> */}
          <Grid item xs={12}>
            <div className="heightWeight">
              <span>Gender:</span>
              {props.gender}
            </div>
          </Grid>
          <Grid container spacing={3} p={3}>
            <Grid item xs={6}>
              <div className="heightWeight">
                <span>egg groups:</span>
                {props.egg.map((egg) => (
                  <Chip label={egg.name} />
                ))}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="heightWeight">
                <span>Hatch Cycle:</span>
                {props.eggCycle} ({eggStepsLow} - {eggStepsHigh})
              </div>
            </Grid>
          </Grid>
        </Grid>
      </BreedingStat>
    </>
  );
};

export default Breeding;
