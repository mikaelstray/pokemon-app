import { Pokemon, PokemonApiResponse } from "@/lib/definitons";

const POKEMON_API = "https://pokeapi.co/api/v2/"

export async function getPokemonList(): Promise<Pokemon[]> {
    try {
        const response = await fetch(POKEMON_API + "pokemon?limit=100&offset=0")

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data: PokemonApiResponse = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        return [];
    }
}