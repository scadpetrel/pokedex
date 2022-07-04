import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import "./scss/Pokecard.scss";
import { cardGradients } from "./helpers/colorVariables";
import { Box } from "@mui/system";

const Pokecard = (props) => {
  const [hover, setHover] = useState(1);
  const backgroundType = `Pokecard ${props.type}`;
  const history = useNavigate();

  let image = !props.img ? props.imgAlt : props.img;
  const handleMouseEnter = () => {
    setHover(18);
  };

  const handleMouseOut = () => {
    setHover(1);
  };
  return (
    <Grid item >
      {/* xl={3} lg={3} md={4} sm={6} xs={12} */}
      <Card
        elevation={hover}
        sx={{ width: 225, height: 343 }}
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseOut}
        style={{ cursor: "pointer" }}
        onClick={() => history(`pokemon/${props.number}`)}
      >
        <CardContent className={backgroundType} style={{background: `${cardGradients[props.type]}`}} >
        {/* style={{background: `${cardGradients[props.type]}`}} */}
          <Typography variant="overline" display="block" gutterBottom>
            {props.number}
          </Typography>
          <CardMedia component="img" image={image} alt={props.name} />
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Box>
            <Chip sx={{ mr: 1 }} label={props.type} />
            {props.type2 ? (
              <>
                <Chip label={props.type2} />
              </>
            ) : (
              ""
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Pokecard;
