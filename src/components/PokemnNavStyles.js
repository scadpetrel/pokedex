import { styled } from "@mui/material/styles";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import Typography from "@mui/material/Typography";


export const HomeLink = styled(CatchingPokemonIcon)(({ theme }) => ({
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

export const PokemonTitleHeading = styled(Typography)(({ theme }) => ({
  align: "center",
  fontSize: "3rem",
  marginLeft: 15,
  marginBottom: 5,
  marginTop: 5,
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "2rem",
  },
  // fontSize={{ xs: "2rem", sm: "2.5rem", lg: "3rem" }}
  // style={{ marginLeft: 15, marginBottom: 5, marginTop: 5}}
}));

