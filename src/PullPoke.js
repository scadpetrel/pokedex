import { Component } from 'react'
import Pokecard from './Pokecard'

class PullPoke extends Component {
  constructor(props){
    super(props);
    this.state = {pokemons: [{name: "bulbasaur"}, {name: "ivysaur"}, {name: "venusaur"}], offset: 0, size: 20, loading: false, pokedetail: []}
  }

  componentDidMount(){
    this.state.pokemons.map(p => {
      this.getPokeDetail(p.name)
    })
   
}

componentDidUpdate(){

}
// componentDidMount(){
//   this.loadPokemonDetail('bulbasaur');
// }

  loadMorePokemons = () => {
    if(!this.state.loading){
     this.setState({loading:true});

     fetch(`https://pokeapi.co/api/v2/pokemon?offset=${this.state.offset}&limit=${this.state.size}`)
         .then(res => res.json())
         .then(res => {
          
             let pokemons = [...this.state.pokemons,...res.results];
             // const initial = pokemons.length - (this.state.size * 2);
             // pokemons = pokemons.slice(initial >= 0 ? initial : 0,pokemons.length);

             this.setState(state => ({
                 pokemons: pokemons,
                 loading:false,
                 offset:this.state.offset + this.state.size
             }));
         });
    }
 }


 // this returns data. Think the async was necessary for retrn time
 getPokeDetail = async (pokeId) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`);
  const data = await response.json();

  this.setState(currState => ({
    pokedetail: [...this.state.pokedetail, data]
  }));

};

// fillState(){
//   this.state.pokemons.map(p => {
//     this.getPokeDetail(p.name)
//   })
// }
 
  render(){

    const pokemon = this.state.pokedetail.map(p => (
      
      <Pokecard name={p.name} id={p.id}/>
    ))
    return <div>{pokemon}</div>
  }
}

export default PullPoke