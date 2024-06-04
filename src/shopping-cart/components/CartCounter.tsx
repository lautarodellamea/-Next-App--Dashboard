"use client"

import { addOne, initCounterState, resetCount, substractOne } from '@/lib/features/counter/counterSlice'
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks'
import { useEffect, useRef } from 'react'
// import { useState } from 'react'

interface Props {
  value: number
}

export interface CounterResponse {
  method: string;
  count: number;
}


const getApiCounter = async (): Promise<CounterResponse> => {
  const data = await fetch('/api/counter')
    .then(res => res.json())


  console.log(data)

  return data
}

export const CartCounter = ({ value = 10 }: Props) => {


  // const [count, setCount] = useState(value)


  const store = useAppStore()
  const count = useAppSelector(state => state.counter.count)
  const dispatch = useAppDispatch()



  // doc oficial propone esto
  // const initialized = useRef(false)

  // if (!initialized.current) {

  //   store.dispatch(initCounterState(value))

  //   initialized.current = true

  // }


  // fernando propone esto para que el estado inicial del count no cambie al navegar entre paginas
  // useEffect(() => {
  //   dispatch(initCounterState(value))


  // }, [dispatch, value])


  useEffect(() => {

    getApiCounter().then(({ count }) => dispatch(initCounterState(count)))
  }, [dispatch])




  return (
    <>
      <span className="text-9xl">{count}</span>

      <div className="flex">
        <button
          onClick={() => dispatch(addOne())}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
        >
          +1
        </button>
        <button
          onClick={() => dispatch(substractOne())}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
        >
          -1
        </button>
      </div>
    </>
  )
}
