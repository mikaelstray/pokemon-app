import { PokemonApiResponse, PokemonDetails } from "@/lib/definitions";

const POKEMON_API = "https://pokeapi.co/api/v2/";

// Fetches a list of Pokémon details with a limit of 100
export async function getPokemonList(): Promise<PokemonDetails[]> {
    const response = await fetch(`${POKEMON_API}pokemon?limit=100&offset=0`, {
    });

    const data: PokemonApiResponse = await response.json();

    // Fetches detailed data for each Pokémon in the list
    return await Promise.all(
        data.results.map(async (pokemon) => await getPokemon(pokemon.name))
    );
}

// Fetches detailed information for a specific Pokémon by name
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
