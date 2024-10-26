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
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const pageSize = 10; // Set items per page
    const [expandedId, setExpandedId] = useState<number | null>(null); // Expanded card

    // Filter Pokémon list based on search text
    const searchFilter = (list: PokemonDetails[]) => {
        return list.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchText.toLowerCase())
        );
    };

    const filteredList = searchFilter(pokemonList);
    const totalPages = Math.ceil(filteredList.length / pageSize);

    // Paginate the list to display only the current page's items
    const paginate = (list: PokemonDetails[]) => {
        const start = (currentPage - 1) * pageSize;
        return list.slice(start, start + pageSize);
    };

    const displayedPokemon = paginate(filteredList);

    // Update the current page
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
                            setCurrentPage(1); // Reset to first page on search change
                        }}
                    />
                </div>
                <h3 className="text-3xl pt-12 pb-6 text-center">Pokémon Collection</h3>
            </div>

            <div className="mb-32 grid gap-4 lg:grid-cols-1 text-center lg:text-left">
                {displayedPokemon.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name + "Card"}
                        pokemon={pokemon}
                        isExpanded={expandedId === pokemon.id}
                        setExpandedId={setExpandedId}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls flex justify-center space-x-2 mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                {/* Display limited page numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded ${
                            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
}
