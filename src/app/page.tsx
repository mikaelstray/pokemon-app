import {PokemonGrid} from "@/app/components/pokemon-grid";
import { getPokemonList } from "@/lib/data";
import {PokemonDetails} from "@/lib/definitions";

export default async function Home() {
    const pokemonList: PokemonDetails[] = await getPokemonList();
  return (

      <PokemonGrid pokemonList={pokemonList}/>
        );
        }
