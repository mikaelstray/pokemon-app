"use client";

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

    // Get the current index of the expanded Pokémon, if any
    const currentIndex = filteredList.findIndex(pokemon => pokemon.id === expandedId);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            // Move to the next item, or stay at the last item if at the end
            const nextIndex = (currentIndex + 1) % filteredList.length;
            dispatch(setExpandedId(filteredList[nextIndex]?.id ?? null));
        } else if (e.key === "ArrowUp") {
            // Move to the previous item, or loop to the last item if at the start
            const prevIndex = (currentIndex - 1 + filteredList.length) % filteredList.length;
            dispatch(setExpandedId(filteredList[prevIndex]?.id ?? null));
        }
    };

    // Attach the event listener for key presses
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentIndex, filteredList]);

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
