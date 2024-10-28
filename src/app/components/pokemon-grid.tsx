"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchPokemonList } from "@/redux/slices/pokemon-slices";
import { setSearchText, setExpandedId } from "@/redux/slices/ui-slice";
import { PokemonCard } from "@/app/components/pokemon-card";
import { searchFilter } from "@/lib/utils";
import { StatFilter } from "@/app/components/stat-filter";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const currentIndex = filteredList.findIndex(pokemon => pokemon.id === expandedId);

        if (e.key === "ArrowDown") {
            const nextIndex = (currentIndex + 1) % filteredList.length;
            dispatch(setExpandedId(filteredList[nextIndex]?.id ?? null));
        } else if (e.key === "ArrowUp") {
            const prevIndex = (currentIndex - 1 + filteredList.length) % filteredList.length;
            dispatch(setExpandedId(filteredList[prevIndex]?.id ?? null));
        }
    };

    return (
        <Card className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
            <CardContent className="space-y-4">
                <Input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={searchText}
                    onChange={(e) => dispatch(setSearchText(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <StatFilter />

                <div
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    className="grid grid-cols-1 gap-6 outline-none"
                >
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
            </CardContent>
        </Card>
    );
}
