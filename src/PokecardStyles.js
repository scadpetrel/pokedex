import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardContent from "@mui/material/CardContent";

import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/system";


export const StyledPokecard = styled(Card)(({ theme }) => ({
  width: 225,
  height: 343,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  // width: 12rem;
  // height: "100%",
  // margin: 0 auto;
  // padding: 1rem;
  // margin: 3.5rem 2rem 1rem 2rem;
  // backgroundColor: "lightblue",
  // border-radius: 10px;
}));

export const PokeCardContent = styled(CardContent)(({ theme }) => ({
  width: "100%",
  height: "100%",
  "& img": {
    width: "auto",
    height: "5rem",
  // margin-top: 1rem;
  // position: relative;
  // left: 1.5rem;

  // top: -4rem;
  // background-color: rgba(255, 255, 255, .4);
    borderRadius: "10px",
    padding: "1rem",
    margin: "0 auto",
  },
}));

export const PokeTypeChips = styled(Box)(({ theme }) => ({
  
  "& .typeLabel": {
    backgroundColor: "rgba(255, 255,255, 0.25)",
  },
  "& .secondType": {
    marginLeft: theme.spacing(1),
  },
}));