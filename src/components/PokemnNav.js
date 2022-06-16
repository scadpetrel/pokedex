import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { styled } from "@mui/material/styles";
import "../scss/PokemonNav.scss";
import { changeToTitleCase } from "../helper";
import { Home } from "@mui/icons-material";

const HomeLink = styled(CatchingPokemonIcon)(({ theme }) => ({
  fontSize: "2.5rem",
  marginRight: "auto",
  top: "50%",
  position: "absolute",
  transform: "translateY(-50%)",
  left: 15,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
}));

const PokemonNav = (props) => {
  const history = useNavigate();

  function handleHome() {
    history("/");
    console.log("home click")
  }

  let name = changeToTitleCase(props.name);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ flexDirection: "row", justifyContent: "center" }}
        position="fixed"
      >
        <HomeLink onClick={handleHome}>
          <CatchingPokemonIcon   />
        </HomeLink>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          
          fontSize={{ xs: "2rem", sm: "2.5rem", lg: "3rem" }}
          style={{ marginLeft: 15, marginBottom: 5, marginTop: 5}}
        >
          {props.name} #{props.id}
        </Typography>
      </AppBar>
    </Box>
  );
};

export default PokemonNav;
