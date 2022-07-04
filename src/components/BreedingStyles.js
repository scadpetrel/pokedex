import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

export const BreedingStat = styled(Box)(({ theme }) => ({
  border: "1.5px solid #4eba94",
  borderRadius: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  overflow: "auto",
  padding: theme.spacing(3),
  boxSizing: "border-box",
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
      padding: "0px .5rem",
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
    },
    "& .gender:first-of-type": {
        marginRight: theme.spacing(2)
    },
    "& .gender:last-of-type": {
        marginLeft: theme.spacing(2)
    },
  },
}));
export const MalePokemonIcon = styled(MaleIcon)(({ theme }) => ({
  color: "blue",
  fontSize: "2rem"
}));
export const FemalePokemonIcon = styled(FemaleIcon)(({ theme }) => ({
  color: "rgb(224, 61, 88)",
  fontSize: "2rem"
}));
export const HatchCyleBlock = styled("div")(({ theme }) => ({
  "& .hatchCycleBody": {
    display: "flex",
  },
}));
export const EggGroupBlock = styled("div")(({ theme }) => ({
  "& .eggGroupChip": {
    padding: ".5rem",
  },
}));