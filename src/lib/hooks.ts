// archivo barril de la doc oficial

import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`

// hook que nos retorna la funcion dispatch que se comunica con el store para hacer dispatch de acciones
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// el useSelector nos sirve para tomar y escuchar ciertas partes de neustro state y cuando estas partes cambien se redibuje el componente
export const useAppSelector = useSelector.withTypes<RootState>()

// el useAppStore es un hook personalizado que se utiliza para acceder al store completo de Redux
export const useAppStore = useStore.withTypes<AppStore>()