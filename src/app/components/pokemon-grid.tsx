"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pokemon } from "@/lib/definitons";
import { useState } from "react";
import {PokemonCard} from "@/app/components/pokemon-card";

interface PokemomGridProps {
    pokemonList: Pokemon[];
}

export function PokemonGrid({ pokemonList } : PokemomGridProps) {
    const [searchText, setSearchText] = useState("")


    return (
        <>
            <div>
                <h3 className="text-2xl py-6 text-center">Search for your pokemon</h3>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="pokemonName">Pokemon Name</Label>
                    <Input
                        type="text"
                        value={searchText}
                        id="pokemonName"
                        autoComplete="off"
                        placeholder="Charizad, etc..."
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon Collection</h3>
            </div>

            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                {pokemonList.map((pokemon: Pokemon) => (
                    <PokemonCard key={pokemon.name} name={pokemon.name}/>
                ))}
            </div>
        </>
    )
}