import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const DataItems = styled(Box)(({ theme }) => ({
  border: "1.5px solid #4eba94",
  borderRadius: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  "& .pokeItem": {
    // width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const PokeData = (props) => {
  return (
    <>
      <DataItems sx={{ p: 3, mb: 3, boxSizing: "border-box" }} width="100%">
        <Typography variant="h4" mb={4} gutterBottom>
          Pokedex Data
        </Typography>
        <Grid container>
          <Grid className="pokeItem" item xs={12}>
            <Typography mb={1} variant="h6">
              Category
            </Typography>
            <Typography variant="subtitle1">
              <Chip label={props.category} variant="outlined" />
            </Typography>
          </Grid>
          <Grid container mb={3}>
            <Grid item className="pokeItem" ml="auto" pt={2} xs={4}>
              <Typography color="#ac0031" variant="subtitle2">
                Height
              </Typography>
              <Typography variant="body1">{props.meter} / {props.ftIn}</Typography>
              
            </Grid>
            <Grid item className="pokeItem" mr="auto" pt={2} xs={4}>
              <Typography color="#ac0031" variant="subtitle2">
                Weight
              </Typography>
              <Typography variant="body1"> {props.weight} kg / {props.pounds}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid className="pokeItem" item xs={6}>
              <Typography mb={1} variant="h6">
                {props.types.length > 1 ? "Types" : "Type" }
              </Typography>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {props.types.map((type) => (
                  <Chip className={type.type.name} label={type.type.name} />
                ))}
              </Box>
            </Grid>
            <Grid className="pokeItem" item xs={6}>
              <Typography mb={1} variant="h6">
                Abilities
              </Typography>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {props.abilities.map((ability) => (
                  <Chip label={ability.ability.name} variant="outlined"/>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DataItems>
    </>
  );
};

export default PokeData;
