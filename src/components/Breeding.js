import React from "react";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import {
  BreedingStat,
  MalePokemonIcon,
  FemalePokemonIcon,
  HatchCyleBlock,
  EggGroupBlock,
} from "./BreedingStyles";

const Breeding = ({eggCycle, genderRate, genderFemale, genderMale, egg }) => {
 
  // Hatch cycle conversion
  const eggStepsHigh = eggCycle * 257;
  const eggStepsLow = eggCycle * 257 - 256;

  return (
      <BreedingStat>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center">
              Breeding
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="dataBlock">
              <Typography pb={2} variant="h6">
                Gender
              </Typography>
              {genderRate === -1 ? (
                "Genderless"
              ) : (
                <div className="dataItem genderBlock">
                  <Typography variant="body1" className="gender">
                    <span>
                      {genderMale}
                      <MalePokemonIcon />
                    </span>
                  </Typography>
                  <Typography variant="body1" className="gender">
                    <span>
                      {genderFemale}
                      <FemalePokemonIcon />
                    </span>
                  </Typography>
                </div>
              )}
            </div>
          </Grid>
          <Grid container spacing={3} p={3} pl={6}>
            <Grid item xs={12} sm={6}>
              <EggGroupBlock className="dataBlock">
                <Typography pb={2} variant="h6">
                  {egg.length > 1 ? "Egg Groups" : "Egg Group"}
                </Typography>
                <div className="dataItem">
                  {egg.map((egg) => (
                    <span key={`eggName-span-${egg.name}`}>
                      <Chip
                        key={egg.name}
                        label={egg.name}
                        className="eggGroupChip"
                      />
                    </span>
                  ))}
                </div>
              </EggGroupBlock>
            </Grid>
            <Grid item xs={12} sm={6}>
              <HatchCyleBlock className="dataBlock">
                <Typography pb={2} variant="h6">
                  Hatch Cycle
                </Typography>
                <Typography variant="body1" className="hatchCycleBody">
                  <strong>{eggCycle}</strong>
                  <Typography component={"span"} variant="body2" pl={1}>
                    ({eggStepsLow} - {eggStepsHigh})
                  </Typography>
                </Typography>
              </HatchCyleBlock>
            </Grid>
          </Grid>
        </Grid>
      </BreedingStat>
  );
};

export default Breeding;
