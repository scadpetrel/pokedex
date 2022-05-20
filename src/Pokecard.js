import React from "react";
import Pokedex from "./Pokedex";
import './Pokecard.css'

class Pokecard extends React.Component {
  
  render() {
    const backgroundType = `Pokecard ${this.props.type}`
    return (
      <div className={backgroundType}>
        <div>
        <img className ="pokeCards-img"src={this.props.img} />
        </div>
        <div>
          <h3>{this.props.name}</h3>
          <p>{this.props.type}</p>
        </div>
        
      </div>
    );
  }
}

export default Pokecard;
