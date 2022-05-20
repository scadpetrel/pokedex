import React, {useState, useEffect} from "react";
import Pokecard from "./Pokecard";
import './Pokedex.css'

const FetchPoke = () => {
  const [pokemons, setPokemons] = useState([])
  const [loadMore, setLoadMore ] = useState(['https://pokeapi.co/api/v2/pokemon'])

  const fetchPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)
    console.log(data.results)

    function fetchDetails (result) {
      result.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json();

        setPokemons(curState => [...curState, data]
        )
        
      })
      
      }
    
    fetchDetails(data.results)
    
  }

  useEffect(() => {
    console.log("useEffect again")
    fetchPokemons()
  }, [])

  const handleLoadMore = () => {
    fetchPokemons()
  }

  return(
    <>
    <div className="Pokedex">
      {pokemons.map(item => (
        <Pokecard key={item.id} name={item.name} img={item.sprites.other.dream_world.front_default} type={item.types[0].type.name}/>
        ))}
    </div>
    <button onClick={handleLoadMore}>Load More</button>
    </>
  )
}

export default FetchPoke;

