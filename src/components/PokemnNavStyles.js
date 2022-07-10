import { styled, keyframes } from "@mui/material/styles";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import Typography from "@mui/material/Typography";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
    color: black;
  }

  100% {
    transform: rotate(720deg);
    color: #ac0031;
  }
`;

export const HomeLink = styled(CatchingPokemonIcon)(({ theme }) => ({
  fontSize: "2.5rem",
  marginRight: "auto",
  top: "25%",
  position: "absolute",
  // transform: "translateY(-50%)",
  cursor: "pointer",
  transition: "color 0.5s ease-out",

  "&:hover": {
    color: theme.palette.pokemonRed.main,
    // transform: "rotate(90deg)",
    // top: "25%",
    // transition: "transform 0.5s ease-in-out",
    animation: `${spin} 1.0s ease-in-out`,
  },
  left: 15,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },

}));



export const PokemonTitleHeading = styled(Typography)(({ theme }) => ({
  align: "center",
  fontSize: "2.5rem",
  marginLeft: 15,
  marginBottom: 5,
  marginTop: 5,
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.5rem",
  },
  // fontSize={{ xs: "2rem", sm: "2.5rem", lg: "3rem" }}
  // style={{ marginLeft: 15, marginBottom: 5, marginTop: 5}}
}));

