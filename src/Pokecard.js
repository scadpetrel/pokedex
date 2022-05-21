import React from "react";
import './scss/Pokecard.scss'

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
          <p>{this.props.type} {this.props.type2}</p>
          <p></p>
          <small>{this.props.number}</small>
          
        </div>
        
      </div>
    );
  }
}

export default Pokecard;
