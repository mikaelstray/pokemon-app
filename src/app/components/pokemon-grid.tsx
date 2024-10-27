"use client"

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchPokemonList } from "@/redux/slices/pokemon-slices";
import { setSearchText, setExpandedId } from "@/redux/slices/ui-slice";
import { PokemonCard } from "@/app/components/pokemon-card";
import { searchFilter } from "@/lib/utils";
import { StatFilter } from "@/app/components/stat-filter";

export function PokemonGrid() {
    const dispatch = useAppDispatch();
    const pokemonList = useAppSelector((state) => state.pokemon.pokemonList);
    const searchText = useAppSelector((state) => state.ui.searchText);
    const expandedId = useAppSelector((state) => state.ui.expandedId);
    const visibleStats = useAppSelector((state) => state.ui.visibleStats);

    useEffect(() => {
        dispatch(fetchPokemonList());
    }, [dispatch]);

    const filteredList = searchFilter(pokemonList, searchText);

    return (
        <>
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchText}
                onChange={(e) => dispatch(setSearchText(e.target.value))}
            />
            <StatFilter />

            <div>
                {filteredList.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        isSelected={expandedId === pokemon.id}
                        setExpandedId={(id) => dispatch(setExpandedId(id))}
                        visibleStats={visibleStats}
                    />
                ))}
            </div>
        </>
    );
}
