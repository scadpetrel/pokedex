import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const EvolutionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // border: "1.5px solid #4eba94",
  // borderRadius: "4px",
  // backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxSizing: "border-box",
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  "& .Evolution-chain": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
    "& svg": {
      alignSelf: "center",
      color: "#4eba94",
      [theme.breakpoints.up("sm")]: {
        alignSelf: "flex-end"
      }
    },
    "& svg:last-of-type": {
      display: "none",
    },
  },
}));

export const EvolutionImg = styled("div")(({ theme }) => ({
  height: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "hidden",
  "& img": {
    height: "5rem",
    width: "5rem",
    margin: "15px",
    padding: "15px",
    transition: ".3s ease-in-out",
    "&:hover": {
      transform: "scale(1.15)",
    },
  },
}));
