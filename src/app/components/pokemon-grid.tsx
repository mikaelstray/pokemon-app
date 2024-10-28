"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSearchText, setExpandedId } from "@/redux/slices/ui-slice";
import { PokemonCard } from "@/app/components/pokemon-card";
import { searchFilter, handleNavigation } from "@/lib/utils";
import { StatFilter } from "@/app/components/stat/stat-filter";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function PokemonGrid() {
    const dispatch = useAppDispatch();
    const pokemonList = useAppSelector((state) => state.pokemon.pokemonList);
    const searchText = useAppSelector((state) => state.ui.searchText);
    const expandedId = useAppSelector((state) => state.ui.expandedId);
    const visibleStats = useAppSelector((state) => state.ui.visibleStats);

    // Filter the list based on the search term
    const filteredList = searchFilter(pokemonList, searchText);

    // Handle keyboard navigation for Pokemon cards
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const newExpandedId = handleNavigation(e, filteredList, expandedId);
        dispatch(setExpandedId(newExpandedId));
    };

    return (
        <Card className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
            <CardContent className="space-y-4">
                {/* Search Input */}
                <Input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={searchText}
                    onChange={(e) => dispatch(setSearchText(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    aria-label="Search Pokémon"
                />

                {/* Filter Options */}
                <StatFilter />

                {/* Display Filtered Pokémon List */}
                {filteredList.length > 0 ? (
                    <div
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        className="grid grid-cols-1 gap-6 outline-none"
                        aria-label="Pokemon Grid"
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
                ) : (
                    <div className="flex justify-center items-center h-32 text-gray-500 text-lg">
                        No Pokémon found. Try a different search term.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
