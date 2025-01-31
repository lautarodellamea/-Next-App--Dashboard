'use client'

import Link from 'next/link'
import React from 'react'
import { SimplePokemon } from '../interfaces/simple-pokemon';
import Image from 'next/image';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleFavorite } from '@/lib/features/pokemons/pokemonsSlice';

interface Props {
  pokemon: SimplePokemon
}

export const PokemonCard = ({ pokemon }: Props) => {

  const { id, name } = pokemon;

  // preguntamos si existe ese pokemon por id
  // esto me hace un arreglo de 151 elementos donde o hay pokemon o undefined, en caso de que querramos cambiar el undefined por un true o false usamos la doble negacion, ahora tendremos un arreglo de trues y falses
  // nos sirve para ver cual esta en los favoritos y cuales no
  const isFavorite = useAppSelector(state => !!state.pokemons.favorites[id])
  // console.log(isFavorite)

  const dispatch = useAppDispatch()


  const onToggle = () => {
    // console.log("click")
    // console.log(pokemon)
    dispatch(toggleFavorite(pokemon))

  }

  return (

    <div className="mx-auto right-0 mt-2 w-60">
      <div className="flex flex-col  bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          <Image key={pokemon.id} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} width={0}
            height={0} style={{ width: 'auto', height: '100px' }} alt={pokemon.name} />
          {/* https://nextjs.org/docs/app/api-reference/components/image#priority */}
          {/* Image con priority se iran cargando a medida que aparezcan y no todas de una, por defecto esta en true y hace el lazyload */}
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{name}</p>

          <div className="mt-5">
            <Link href={`/dashboard/pokemon/${name}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Más información
            </Link>
          </div>
        </div>
        <div className="border-b">
          <div onClick={onToggle} className='px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer' >
            <div className="text-red-600">


              {
                isFavorite ? <IoHeart className='text-red-500' /> : <IoHeartOutline className='text-red-500' />
              }

              {/* <IoHeartOutline className='text-red-500' />
              <IoHeart className='text-red-500' /> */}

            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                {
                  isFavorite ? "Es favorito" : "No es favorito"
                }
              </p>
              <p className="text-xs text-gray-500">Click para cambiar</p>
            </div>

          </div>

        </div>


      </div>
    </div>
  )
}
