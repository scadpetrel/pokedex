import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";



export const PokedexGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "100px",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  padding: "0",
  [theme.breakpoints.down("sm")]: {
    marginTop: "70px",
  },
}));

export const PokedexItemWrapperGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down(481)]: {
    paddingLeft: "0 !important",
  },
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  position: "absolute",
  top: "0",
  left: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

