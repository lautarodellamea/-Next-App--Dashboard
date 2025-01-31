import { Pokemon } from "@/pokemons"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

// si veo als Props en un console log, tendremos los params y searchParams, y bueno los que yo defina
interface Props {
  params: {
    id: string
  }
}

// EN BUILD TIME - generacion estatica, antes de que la gente lo solicite, estos ya se crean en el build time, es decir 151 paginas estaticas
// genero paginas estaticas al hacer el build (en build time), shortcut: gsp
// hasta el 151 estan creados desde build time pero si un usuario busca el 152 este se generara del lado del servidor y creara el archivo estatico para servirlo a futureas peticiones
export async function generateStaticParams() {

  // esto crea un arreglo de 151 elementos, la v es el valor del elemento (ene ste caso undefined porque no teien nada) y el otro es el indice 
  const static151Pokemons = Array.from({ length: 151 }).map((v, i) => `${i + 1}`) // le sumo 1 ya que el pokemon 0 no existe [1,2,3,4...151]

  // debemos regresar un arreglo con todos los params que queremos que sean usados a la hora de construccion (esto se ejecutara solo en build time)
  // aca se regresa lo que queremos como params
  return static151Pokemons.map((id) => ({ id: id }))

  // return [
  //   { id: "1" },
  //   { id: "2" },
  //   { id: "3" },
  //   { id: "4" },
  //   { id: "5" },
  //   { id: "6" },
  // ]
}


// genero la metadata dinamicamente, shortcut: genMeta
export async function generateMetadata({ params }: Props): Promise<Metadata> {

  try {

    // Realizamos una segunda consulta aquí. Esta consulta se ejecuta en tiempo de construcción (buildTime),
    // y nunca mas se ejecutara, a menos que se cargue una nueva pagina que nunca eh mostrado
    // ya que creamos 151 paginas en construccion, si aparece una nueva, ahi es donde podria ejecutarse nuevamente
    // la revalidacion estara en el getPokemon
    const { id, name } = await getPokemon(params.id)

    return {
      title: `#${id} - ${name}`,
      description: `Página del pokémon ${name}`
    }
  } catch (error) {
    return {
      title: "Página del pokemon falló",
      description: "Página del pokemon falló"
    }
  }

}



const getPokemon = async (id: string): Promise<Pokemon> => {


  try {


    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      // cache: "force-cache", // no-store, es para que se haga de nuevo la solicitud, no-cache es para no guardarla en cache
      next: {
        // cada 6 meses se revalidara
        revalidate: 60 * 60 * 30 * 6
      }
    })
      .then(resp => resp.json())

    // console.log("Se cargó:", pokemon.name)

    return pokemon
  } catch (error) {
    notFound()
  }
}

export default async function PokemonPage({ params }: Props) {

  const pokemon = await getPokemon(params.id)

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ''}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />


            <div className="flex flex-wrap">
              {
                pokemon.moves.map(move => (
                  <p key={move.move.name} className="mr-2 capitalize">{move.move.name}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {
                pokemon.types.map(type => (
                  <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {
                pokemon.weight
              }
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>



        </div>
      </div>
    </div>
  );
}



