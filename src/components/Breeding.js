import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const BreedingStat = styled(Box)(({ theme }) => ({
  border: "1.5px solid #4eba94",
  borderRadius: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  "& .dataBlock": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "& .dataItem": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    "& span": {
      padding: "0px 1rem",
      display: "flex",
      alignItems: "center",
    },
  },
}));

const Breeding = (props) => {
  const eggStepsHigh = props.eggCycle * 257;
  const eggStepsLow = props.eggCycle * 257 - 256;
  return (
    <>
      <BreedingStat sx={{ overflow: "auto", p: 3, boxSizing: "border-box" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center">
              Breeding
            </Typography>
          </Grid>
          {/* <div className="dataBlock"><span>Height:</span>{props.height}<span>Weight:</span> {props.weight} kg</div> */}
          <Grid item xs={12}>
            <div className="dataBlock">
              <Typography pb={2} variant="h6">
                Gender
              </Typography>
              {props.genderRate === -1 ? (
                "Genderless"
              ) : (
                <div className="dataItem">
                  <Typography variant="body1">
                    <span>
                      {props.genderMale}
                      <MaleIcon style={{ color: "blue" }} />
                    </span>
                  </Typography>
                  <Typography variant="body1">
                    <span>
                      {props.genderFemale}
                      <FemaleIcon style={{ color: "rgb(224, 61, 88)" }} />
                    </span>
                  </Typography>
                </div>
              )}
              {/* <div className="gender"><span>{props.genderMale}<MaleIcon style={{ color: "blue"}}/></span><span>{props.genderFemale}<FemaleIcon/></span></div> */}
            </div>
          </Grid>
          <Grid container spacing={3} p={3}>
            <Grid item xs={6}>
              <div className="dataBlock">
                <Typography pb={2} variant="h6">
                  {props.egg.length > 1 ? "Egg Groups" : "Egg Group"}
                </Typography>
                <div className="dataItem">
                  {props.egg.map((egg) => (
                    <span>
                      <Chip label={egg.name} />
                    </span>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="dataBlock">
                <Typography pb={2} variant="h6">
                  Hatch Cycle
                </Typography>
                <Typography variant="body1">
                  <div>
                    <strong>{props.eggCycle}</strong> ({eggStepsLow} -{" "}
                    {eggStepsHigh})
                  </div>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </BreedingStat>
    </>
  );
};

export default Breeding;