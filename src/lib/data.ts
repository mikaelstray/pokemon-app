// data.ts

import {PokemonApiResponse, PokemonDetails} from "@/lib/definitions";

const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList(): Promise<PokemonDetails[]> {
    // Fetch the list of Pokémon names and URLs
    const response = await fetch(POKEMON_API + "pokemon?limit=100&offset=0");
    const data: PokemonApiResponse = await response.json();

    // Fetch detailed data for each Pokémon
    return await Promise.all(
        data.results.map(async (pokemon) => await getPokemon(pokemon.name))
    );
}

// Fetch individual Pokémon details
export async function getPokemon(name: string): Promise<PokemonDetails> {
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    const data = await response.json();
    return data;
}
