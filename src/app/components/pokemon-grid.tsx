// components/PokemonGrid.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PokemonDetails } from "@/lib/definitions";
import { useState } from "react";
import { PokemonCard } from "@/app/components/pokemon-card";
import { searchFilter } from "@/lib/utils";
import { StatFilter} from "@/app/components/stat-filter";
import {StatType} from "@/lib/definitions";

interface PokemonGridProps {
    pokemonList: PokemonDetails[];
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
    const [searchText, setSearchText] = useState("");
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Manage visible stats as an array of strings
    const [visibleStats, setVisibleStats] = useState<StatType[]>([StatType.Weight, StatType.Height, StatType.Types]);

    // Filter the Pokémon list based on the search text
    const filteredList = searchFilter(pokemonList, searchText);

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
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <h3 className="text-3xl flex justify-end pt-12 pb-6 text-center pr-20">Filter Options</h3>

                {/* Use the StatFilter component */}
                <StatFilter visibleStats={visibleStats} setVisibleStats={setVisibleStats}/>
            </div>

            <div className="mb-32 grid gap-4 lg:grid-cols-1 text-center lg:text-left">
                {filteredList.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name + "Card"}
                        pokemon={pokemon}
                        isSelected={expandedId === pokemon.id}
                        setExpandedId={setExpandedId}
                        visibleStats={visibleStats} // Pass visible stats as a single prop
                    />
                ))}
            </div>

        </>
    );
}