import { SimplePokemon } from '@/pokemons';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'


// nuestro estado tendra la siguiente estructura
/* 
{
 favorites: {
   "1": { id: "1", name: "bulbasaur" },
   "2": { id: "2", name: "ivysaur" },
   "3": { id: "3", name: "venusaur" },
 },

//  podriamos agregar 
//  pokemons: []
}
nos sera mas facil y directo ver si existe tal pokemon y dependiendo de esto, eliminarlo o insertarlo 

*/

// fer hace esto
// interface PokemonsState {
//   [key: string]: SimplePokemon
// }

// buena forma
// type PokemonsState = Record<string, SimplePokemon>
// esto se podria usar en el caso de que el inicialState tenga la forma
// {
//   "1": { id: "1", name: "bulbasaur" },
//   "2": { id: "2", name: "ivysaur" },
//   "3": { id: "3", name: "venusaur" },
// }

interface PokemonsState {
  favorites: { [key: string]: SimplePokemon }
}


// Leo del localStorage, esto si podemos hacerlo y no es que es algo que no se recomienda, ya que lo generamos de forma sincrona
/* const getInitialState = (): PokemonsState => {
  // aca determino si esta disponible el localstorage para que no me de error del punto *!* (*2*)
  // igualmente esto nos dara problemas ya que del lado del cliente no coinside con el servidor asique lo haremos de otra forma
  // if (typeof localStorage === "undefined") return {}

  // el inconveniente sucede cuando usamos el localstorage para condicionalmente generar html, si solo usaramos el localstorage para solo hacer validaciones no habria inconveniente


  // aca me marcaria que el localStorage no esta definido ya que solo esta del lado del cliente y no del servidor (*!*)
  const favorites = JSON.parse(localStorage.getItem("favorite-pokemons") ?? "{}") // "??" verificamos porque la primera vez no hay nada en el localStorage

  return favorites
} */

const initialState: PokemonsState = {

  favorites: {},
  // ...getInitialState()
  // "1": { id: "1", name: "bulbasaur" },
  // "2": { id: "2", name: "ivysaur" },
  // "3": { id: "3", name: "venusaur" },
  // "4": { id: "4", name: "charmander" },
}

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {

    setFavoritePokemons(state, action: PayloadAction<{ [key: string]: SimplePokemon }>) {

      state.favorites = action.payload
    },


    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {

      const pokemon = action.payload
      const { id } = pokemon

      if (!!state.favorites[id]) {
        delete state.favorites[id]
        // return
      } else {
        state.favorites[id] = pokemon
      }

      // esto es mala practica ya que en los reducer solo debemos tener funciones puras
      // NO SE DEBE DE HACER EN REDUX
      // localStorage.setItem("favorite-pokemons", JSON.stringify(state.favorites))
      // para hacer esto de mejor forma es haciendo un custom middleware, aunque a esto no lo haremos mucho ya que trabajaremos con bases de datos




    }
  }
})

export const { toggleFavorite, setFavoritePokemons } = pokemonSlice.actions

export default pokemonSlice.reducer