import React from "react";
import './scss/Pokecard.scss'

class Pokecard extends React.Component {
  
  render() {
    const backgroundType = `Pokecard ${this.props.type}`
    return (
      <div className={backgroundType}>
        <small className="Pokecard-id">{this.props.number}</small>
        <div>
        <img className ="pokeCards-img"src={this.props.img} />
        </div>
        <div>
          <h3 className="Pokecard-name">{this.props.name}</h3>
          <div className="Pokecard-types">
          <p>{this.props.type} </p>
          <p>{this.props.type2}</p>
          </div>
          
          
          
        </div>
        
      </div>
    );
  }
}

export default Pokecard;
