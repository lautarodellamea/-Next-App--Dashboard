// https://redux-toolkit.js.org/api/getDefaultMiddleware

import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "../store";


export const localStorageMiddleware = (state: MiddlewareAPI) => {
  return (next: Dispatch) => (action: Action) => {

    // console.log(action)
    // console.log({ state: state.getState() })

    // esto es sincrono, luego de esto podemos ver los cambios
    next(action);
    // si no ponemos esta linea bloquea todas las acciones

    // console.log({ state })
    // console.log(action) // vemos que accion se disparo
    // console.log({ state: state.getState() }) // vemos todo el store completo, counter y pokemons


    // si esta es la accion que se ejecuta, guardamos en el local storage, podemos hacer un switch si estuvieramos analizando mas acciones, etc.
    if (action.type === "pokemons/toggleFavorite") {

      // el RootState es para ver que tenemos en la desestructuracion, en este caso pokemons y counter
      const { pokemons } = state.getState() as RootState;
      localStorage.setItem("favorite-pokemons", JSON.stringify(pokemons))
      return
    }
  }
}