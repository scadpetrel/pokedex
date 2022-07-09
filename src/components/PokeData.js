import React from "react";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { typeColors } from "../helpers/colorVariables";
import { DataContainer } from "./PokeDataStyles";

const PokeData = ({category, meter, ftIn, weight, pounds, types, abilities}) => {
  return (
    <>
      <DataContainer className="PokemonInfoBox">
        <Typography variant="h4" gutterBottom>
          Pokedex Data
        </Typography>
        <Grid container>
          <Grid className="dataItem" item xs={12}>
            <Typography mb={1} variant="h6">
              Category
            </Typography>
            <Typography variant="subtitle1">
              <Chip label={category} variant="outlined" />
            </Typography>
          </Grid>
          <Grid container className="heightWeight">
            <Grid item className="dataItem" xs={4}>
              <Typography variant="subtitle2">Height</Typography>
              <Typography variant="body1">
                {meter} / {ftIn}
              </Typography>
            </Grid>
            <Grid item className="dataItem" xs={4}>
              <Typography variant="subtitle2">Weight</Typography>
              <Typography variant="body1">
                {weight} kg / {pounds}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid className="dataItem typeBlock" item xs={12} sm={6}>
              <Typography variant="h6">
                {types.length > 1 ? "Types" : "Type"}
              </Typography>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {types.map((type) => (
                  <span key={`typesKey-${type.type.name}`}>
                    <Chip
                      key={type.type.name}
                      className={type.type.name}
                      label={type.type.name}
                      style={{
                        background: alpha(`${typeColors[type.type.name]}`, 0.2),
                      }}
                    />
                  </span>
                ))}
              </Box>
            </Grid>
            <Grid className="dataItem abilitiesBlock" item xs={12} sm={6}>
              <Typography variant="h6">
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
                {abilities.map((ability) => (
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
