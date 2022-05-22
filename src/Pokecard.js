import React from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./scss/Pokecard.scss";

class Pokecard extends React.Component {
  render() {
    const backgroundType = `Pokecard ${this.props.type}`;
    return (
      <Grid item xs={3}>
        <Card className={backgroundType}>
          <CardContent>
        <div >
          <small className="Pokecard-id">{this.props.number}</small>
          <div>
            <img className="pokeCards-img" src={this.props.img} />
          </div>
          <div>
            <h3 className="Pokecard-name">{this.props.name}</h3>
            <div className="Pokecard-types">
              <p>{this.props.type} </p>
              <p>{this.props.type2}</p>
            </div>
          </div>
        </div>
        </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default Pokecard;
