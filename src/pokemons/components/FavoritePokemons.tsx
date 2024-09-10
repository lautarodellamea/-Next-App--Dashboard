'use client'

import { useAppSelector } from "@/lib/hooks"
import { PokemonGrid } from "./PokemonGrid"
import { useEffect, useState } from "react"
import { IoHeartOutline } from "react-icons/io5"


export const FavoritePokemons = () => {



  const favoritePokemons = useAppSelector(state => Object.values(state.pokemons.favorites)) // en este codigo transformo state.pokemons.favorites que es un objeto, a arreglo
  // console.log((favoritePokemons))



  // const [pokemons, setPokemons] = useState(favoritePokemons)

  // useEffect(() => {

  //   setPokemons(favoritePokemons)
  // }, [favoritePokemons])


  return (
    <>

      {
        favoritePokemons.length === 0
          ? (<NoFavorites />)
          : (<PokemonGrid pokemons={favoritePokemons} />)
      }

    </>




    // al usar pokemons aca y no favoritePokemons, al marcarlo de vuelta como favorito no se me borra, pero al salir y entrard e vuelta ahora si ya que se renderiza nuevamente
    // < PokemonGrid pokemons={pokemons} />
  )
}



export const NoFavorites = () => {

  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />

      <span>
        No hay pokémons favoritos
      </span>


    </div>
  )
}