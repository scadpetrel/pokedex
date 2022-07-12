import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
// import "./scss/Pokecard.scss";
import { StyledPokecard, PokeTypeChips, PokeCardContent } from "./PokecardStyles";
import { cardGradients } from "./helpers/colorVariables";

const Pokecard = (props) => {
  const [hover, setHover] = useState(1);
  const backgroundType = `Pokecard ${props.type}`;
  const history = useNavigate();
  const location = useLocation();
  let image = !props.img ? props.imgAlt : props.img;
  const handleMouseEnter = () => {
    setHover(18);
  };

  const handleMouseOut = () => {
    setHover(1);
  };

  // link to pokemon and save path for return to home
  const handleLink = () => {
    history(`/pokemon/${props.number}`)
    localStorage.setItem( 'pokedexPath', location.pathname )
  }
  return (
    <Grid item >
      {/* <Link to={`/pokemon/${props.number}`} state={{ from: location.pathname }} > */}
      <StyledPokecard
        elevation={hover}
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseOut}
        style={{ cursor: "pointer", }}
        onClick={handleLink}
      >
        <PokeCardContent className={backgroundType} style={{ background: `${cardGradients[props.type]}`}} >
        {/* style={{background: `${cardGradients[props.type]}`}} */}
          <Typography variant="overline" display="block" gutterBottom>
            {props.number}
          </Typography>
          <CardMedia component="img" image={image} alt={props.name} />
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <PokeTypeChips>
            <Chip className="typeLabel" label={props.type} />
            {props.type2 ? (
              <>
            <Chip className="typeLabel secondType" label={props.type2} />
              </>
            ) : (
              ""
            )}
          </PokeTypeChips>
        </PokeCardContent>
      </StyledPokecard>
      {/* </Link> */}
    </Grid>
  );
};

export default Pokecard;
