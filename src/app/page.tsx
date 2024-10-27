import { PokemonGrid } from "@/app/components/pokemon-grid";
import { getPokemonList } from "@/lib/data";
import { PokemonDetails } from "@/lib/definitions";

export default async function HomePage() {
    const pokemonList: PokemonDetails[] = await getPokemonList();

    return (
        <div>
            <h1 className="text-4xl font-bold text-center pt-6">Pokémon List</h1>
            <PokemonGrid pokemonList={pokemonList} />
        </div>
    );
}