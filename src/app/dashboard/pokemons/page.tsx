import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { notFound } from "next/navigation";

// export const revalidate = 60
// si trabajaramos con axios por ejemplo, deberiamos hacer el revalidate asi, recordar pasar un numero no una expresion de javascript


export const metadata = {
  title: '151 Pokémons',
  description: 'Ad minim sit cupidatat culpa consectetur.',
};


const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {

  // si hago esta peticion 4 veces con los mismos argumentos, por defecto la guarda en cache
  // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    // { cache: "no-store" | "force-cache" } // hace la peticion cada vez que el visitante entra y se evita el cache, por defecto es force-cache
    // {next: { revalidate: false | 0 | number }} // para revalidar, defino cuanto tiempo guardarlo en cache, 0 evita que se guarde 
    // esto puede causar conflictos { revalidate: 3600, cache: 'no-store' }, pero se pueden usar las dos si se hace bien

  ).then(res => res.json());

  // cuardamos los pokemones como nosotros queremos extrayendolos de la respuesta
  const pokemons = data.results.map(pokemon => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }));

  // cuando tengamos un error nos lleva al error.tsx
  // throw new Error('Esto es un error que no debería de suceder');

  // para llevarlo a la pagina not-found.tsx
  // throw notFound();

  return pokemons;
}




export default async function PokemonsPage() {

  const pokemons = await getPokemons(151);

  return (
    <div className="flex flex-col">

      <span className="text-5xl my-2">Listado de Pokémons <small className="text-blue-500">estático</small></span>

      <PokemonGrid pokemons={pokemons} />

    </div>
  );
}

