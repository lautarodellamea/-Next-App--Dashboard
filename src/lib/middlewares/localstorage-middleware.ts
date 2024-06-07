import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "../store";


export const localStorageMiddleware = (state: MiddlewareAPI) => {
  return (next: Dispatch) => (action: Action) => {

    // console.log(action)
    // console.log({ state: state.getState() })


    next(action);


    if (action.type === "pokemons/toggleFavorite") {

      // el RootState es para ver que tenemos en la desestructuracion, en este caso pokemons y counter
      const { pokemons } = state.getState() as RootState;
      localStorage.setItem("favorite-pokemons", JSON.stringify(pokemons))
      return
    }
  }
}