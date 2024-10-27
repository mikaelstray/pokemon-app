"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PokemonDetails } from "@/lib/definitions";
import { useState } from "react";
import { PokemonCard } from "@/app/components/pokemon-card";

interface PokemonGridProps {
    pokemonList: PokemonDetails[];
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {

    const [searchText, setSearchText] = useState("");
    const [expandedId, setExpandedId] = useState<number | null>(null); // Expanded card

    const searchFilter = (list: PokemonDetails[]) => {
        return list.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchText.toLowerCase())
        );
    };

    const filteredList = searchFilter(pokemonList);

    return (
        <>
            <div>
                <h3 className="text-2xl py-6 text-center">Search for your Pokémon</h3>
                <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                    <Label htmlFor="pokemonName">Pokémon Name</Label>
                    <Input
                        type="text"
                        value={searchText}
                        id="pokemonName"
                        autoComplete="off"
                        placeholder="Charizard, etc..."
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </div>
                <h3 className="text-3xl pt-12 pb-6 text-center">Pokémon Collection</h3>
            </div>

            <div className="mb-32 grid gap-4 lg:grid-cols-1 text-center lg:text-left">
                {filteredList.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name + "Card"}
                        pokemon={pokemon}
                        isSelected={expandedId === pokemon.id}
                        setExpandedId={setExpandedId}
                    />
                ))}
            </div>
        </>
    );
}
