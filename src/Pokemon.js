import React from 'react'
import { useParams } from 'react-router-dom';

const Pokemon = () => {
    const { pokemonId } = useParams()

  return (
    <div><h3>{`Pokemon ${pokemonId}`}</h3></div>
  )
}

export default Pokemon
