// Represents a basic Pokémon with a name and API URL
export type Pokemon = {
    name: string;
    url: string;
};

// Response structure for Pokémon list API calls
export type PokemonApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
};

// Represents a Pokémon stat, including its base value and name
export type Stat = {
    base_stat: number;
    stat: {
        name: string;
    };
};

// Represents an ability with details like name, visibility, and slot
export type Ability = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};

// Represents a type with its name, slot, and API URL
export type Type = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
};

// Represents detailed information about a Pokémon, including its stats, types, abilities, and sprites
export type PokemonDetails = {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: Type[];
    abilities: Ability[];
    stats: Stat[];
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
};

// Enumeration for different stat types, used to control visibility
export enum StatType {
    Weight = "weight",
    Height = "height",
    Types = "types",
}
