// definitions.ts

export type Pokemon = {
    name: string;
    url: string;
}

export type PokemonApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export type Stat = {
    base_stat: number;
    stat: {
        name: string;
    };
}

export type PokemonDetails = {
    id: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    stats: Stat[];
    weight: number;
}
