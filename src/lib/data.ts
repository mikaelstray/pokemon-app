import { PokemonApiResponse, PokemonDetails } from "@/lib/definitions";

const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList(): Promise<PokemonDetails[]> {
    const response = await fetch(`${POKEMON_API}pokemon?limit=100&offset=0`, {
        cache: "force-cache"
    });

    const data: PokemonApiResponse = await response.json();

    return await Promise.all(
        data.results.map(async (pokemon) => await getPokemon(pokemon.name))
    );
}

// Fetch individual Pokémon details
export async function getPokemon(name: string): Promise<PokemonDetails> {
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    const data = await response.json();

    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types,
        abilities: data.abilities,
        sprites: data.sprites,
        stats: data.stats
    };
}
