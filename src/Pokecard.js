import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, useHistory, create } from 'react-router-dom';
import "./scss/Pokecard.scss";



const Pokecard = (props) => {
  const backgroundType = `Pokecard ${props.type}`;
  const history = useNavigate();
  // const link = props.number;

  return (
    <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
      <Card sx={{ width: 225 }} onClick={() => history(`/${props.number}`)}>
        <CardContent className={backgroundType}>
          <Typography variant="overline" display="block" gutterBottom>
            {props.number}
          </Typography>
          <CardMedia component="img" image={props.img} alt={props.name} />
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {props.type}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {props.type2}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Pokecard;
