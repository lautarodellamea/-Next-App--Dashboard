import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface CounterState {
  count: number;
  isReady: boolean;
}


const initialState: CounterState = {
  count: 50,
  isReady: false, // esto lo uso para que al cambiar de pantalla no se me pierda el estado, al entrar de nuevo a la pantalla del componente y llaama nuevamente al initState, si ya se ejecuto una vez el isReady esta en true por lo que no se iniciara de vuelta, manteniendo asi el estado
}

// shortcurt: rxslice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    initCounterState(state, action: PayloadAction<number>) {
      if (state.isReady) return;

      state.count = action.payload;
      state.isReady = true;

    },

    addOne(state) {
      // a diferencia de los reducer de react, en redux podemos mutar el state y redux-toolkit crea un estado nuevo
      state.count++;

    },
    substractOne(state) {
      if (state.count === 0) return;
      state.count--;

    },

    resetCount(state, action: PayloadAction<number>) {
      if (action.payload < 0) action.payload = 0;
      state.count = action.payload;
    }


  }
});

export const { addOne, substractOne, resetCount, initCounterState } = counterSlice.actions

export default counterSlice.reducer




