import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { blueGrey } from "@mui/material/colors";

// Component styles
export const PokemonPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0),
  margin: theme.spacing(0),
  marginBottom: theme.spacing(5),
  "& .Pokemon-info-container": {
    height: "calc(100% - 20px)",
    width: "auto",
    padding: theme.spacing(2),
    boxShadow: theme.shadows[4],
    backgroundColor: blueGrey[50],
    // style={{ backgroundColor: blueGrey[50] }}
    // sx={{ p: 2, boxShadow: 4 }}
  },
  // base styles for data containers
  "& .PokemonInfoBox": {
    border: "5px solid #4eba94",
    borderRadius: "5px",
    backgroundColor: "#f6fffe",
    // backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  // margin={0}
  // marginTop={0}
  // style={{ display: "flex", justifyContent: "space-between" }}
  // sx={{ p: 0 }}
}));

export const NavigatePrevNextContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginLeft: "auto",
  marginRight: "auto",
  height: "50px",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.only("md")]: {
    width: "66%",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(7),
  },
// sx={{ mt: 8, mx: "auto" }}
// height={50}
// style={{
//   width: prvNextWidth,
//   display: "flex",
//   justifyContent: "space-between",
// }}
}));


export const NavigationPrev = styled(Button)(({ theme }) => ({
  width: "50%",
  marginTop: "10px",
  color: theme.palette.grey[600],
  display: "flex",
  justifyContent: "flex-start",
  [theme.breakpoints.up("lg")]: {
    width: "49%",
  },
  "& span": {
    // color: theme.palette.grey[600]
  },
}));
export const NavigationNext = styled(Button)(({ theme }) => ({
  width: "50%",
  marginTop: "10px",
  color: theme.palette.grey[600],
  display: "flex",
  justifyContent: "flex-end",
  [theme.breakpoints.up("lg")]: {
    width: "49%",
  },
}));

export const NavigationPlaceholder = styled("div")(({ theme }) => ({
  width: "50%",
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "10px",
}));

export const PokemonImage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "auto",
  borderRadius: "10px",
  border: "5px solid #4eba94",
  padding: "35px",
  "& .imgPrimary": {
    height: "75%",
    width: "75%",
  },
  "& .imgAlt": {
    height: "100%",
    width: "100%",
  },
}));

