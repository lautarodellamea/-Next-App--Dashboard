'use client'

import { IoCartOutline } from "react-icons/io5"
import { SimpleWidget } from "./SimpleWidget"
import { useAppSelector } from "@/lib/hooks"

export const WidgetsGrid = () => {


  const isCart = useAppSelector(state => state.counter.count)

  return (
    <div className="flex flex-wrap items-center justify-center p-2">
      <SimpleWidget label="contador" title={`${isCart}`} subTitle="Productos agregados" icon={<IoCartOutline size={70} className="text-blue-500" />} href="/dashboard/counter" />
    </div>
  )
}