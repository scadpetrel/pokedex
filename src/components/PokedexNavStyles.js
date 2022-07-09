import Toolbar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import ShuffleIcon from "@mui/icons-material/Shuffle";

export const PokedexToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "0 4rem",
  height: "75px",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  [theme.breakpoints.down("lg")]: {
    padding: "0 2.5rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0 1.5rem",
    height: "75px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "65px",
    padding: "0 1rem",
  },
  "& .menu-container": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
}));

export const PokedexToolbarButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "flex-start",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
}));
export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.6),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.8),
  },
  marginRight: theme.spacing(0),
  marginBottom: theme.spacing(2),
  marginLeft: 0,
  width: "atuo",
  transition: theme.transitions.create(["width", "display"]),
  "&:hover": {
    "& svg": {
      color: "rgba(0, 0, 0, 0.6)",
    },
  },
  [theme.breakpoints.down("sm")]: {
    width: "3rem",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    "&:focus-within": {
      width: "100%",
      "& svg": {
        display: "none",
      },
    },
    
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(0,0,0,0.4)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 1.5),
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.down("sm")]: {
      "&:focus-within": {
        paddingLeft: ".6rem",
      },
    },
  },
}));

export const RandomButton = styled(Button)(({ theme }) => ({
  width: "auto",
  padding: theme.spacing(1, 2),
  marginLeft: theme.spacing(2),
  marginBottom: theme.spacing(0),
  [theme.breakpoints.down("sm")]: {
    // width: "1px",
  },
}));

// const GenerationSelect = styled(Select)(({ theme }) => ({
//   height: 40,
//   width: "10rem",
//   transition: theme.transitions.create("width"),
//   [theme.breakpoints.down("sm")]: {
//     width: "3rem",
//     "&:focus-visible": {
//       width: "10rem",
//     },
//   },
// }));
