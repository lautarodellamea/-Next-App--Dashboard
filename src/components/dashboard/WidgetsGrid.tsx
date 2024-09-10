'use client'

import { IoCartOutline } from "react-icons/io5"
import { SimpleWidget } from "./SimpleWidget"
import { useAppSelector } from "@/lib/hooks"


export const WidgetsGrid = () => {


  const isCart = useAppSelector(state => state.counter.count)

  return (
    <div className="flex flex-wrap items-center justify-center p-2">
      <p>Este componente parcara 50, que es estado inicial, una vez que entremos al counter, este cambiara de valor y tomara el que le pasemos en ese componente que seria un ejemplo de algun dato que pasemos desde el servidor.</p>
      <SimpleWidget label="Redux - Contador" title={`${isCart}`} subTitle="Productos agregados" icon={<IoCartOutline size={70} className="text-blue-500" />} href="/dashboard/counter" />
    </div>
  )
}