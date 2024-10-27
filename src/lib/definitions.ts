export type Pokemon = {
    name: string;
    url: string;
};

export type PokemonApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
};

export type Stat = {
    base_stat: number;
    stat: {
        name: string;
    };
};

export type Ability = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};

export type Type = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
};

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

export enum StatType {
    Weight = "weight",
    Height = "height",
    Types = "types",
}