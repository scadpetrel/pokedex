import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { styled, alpha } from "@mui/material/styles";
import { cardGradients, typeColors } from "../helpers/colorVariables";

const DataContainer = styled(Box)(({ theme }) => ({
  border: "1.5px solid #4eba94",
  borderRadius: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  "& .dataItem": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  "& span": {
    paddingBottom: ".3rem",
  },
  "& .MuiChip-labelMedium": {
    fontSize: "16px",
    padding: "14px",
  },
  "& .heightWeight .dataItem": {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
    },
  },
}));

const PokeData = (props) => {
  return (
    <>
      <DataContainer sx={{ p: 3, mb: 3, boxSizing: "border-box" }}>
        <Typography variant="h4" mb={4} gutterBottom>
          Pokedex Data
        </Typography>
        <Grid container>
          <Grid className="dataItem" item xs={12}>
            <Typography mb={1} variant="h6">
              Category
            </Typography>
            <Typography variant="subtitle1">
              <Chip label={props.category} variant="outlined" />
            </Typography>
          </Grid>
          <Grid container mb={3} className="heightWeight">
            <Grid item className="dataItem" ml="auto" pt={2} xs={4}>
              <Typography color="#ac0031" variant="subtitle2">
                Height
              </Typography>
              <Typography variant="body1">
                {props.meter} / {props.ftIn}
              </Typography>
            </Grid>
            <Grid item className="dataItem" mr="auto" pt={2} xs={4}>
              <Typography color="#ac0031" variant="subtitle2">
                Weight
              </Typography>
              <Typography variant="body1">
                {props.weight} kg / {props.pounds}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid className="dataItem" item xs={12} sm={6}>
              <Typography mb={1} variant="h6">
                {props.types.length > 1 ? "Types" : "Type"}
              </Typography>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {props.types.map((type) => (
                  <span key={`typesKey-${type.type.name}`}>
                    <Chip
                      key={type.type.name}
                      className={type.type.name}
                      label={type.type.name}
                      style={{
                        padding: ".5rem",
                        background: alpha(`${typeColors[type.type.name]}`, 0.2),
                      }}
                    />
                  </span>
                ))}
              </Box>
            </Grid>
            <Grid className="dataItem" item xs={12} sm={6}>
              <Typography mb={1} variant="h6">
                Abilities
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {props.abilities.map((ability) => (
                  <span key={`abilitySpan-${ability.ability.name}`}>
                    <Chip
                      key={ability.ability.name}
                      label={ability.ability.name}
                      variant="outlined"
                    />
                  </span>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DataContainer>
    </>
  );
};

export default PokeData;
