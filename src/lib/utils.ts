import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PokemonDetails } from "@/lib/definitions";

// Utility function for merging Tailwind and conditional classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Capitalizes the first letter of a given string
export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Filters the Pokémon list based on the search text
export function searchFilter(pokemonList: PokemonDetails[], searchText: string) {
    return pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
}

// Handles keyboard navigation for the Pokémon list
export const handleNavigation = (
    e: React.KeyboardEvent,
    filteredList: PokemonDetails[],
    expandedId: number | null
): number | null => {
    const currentIndex = filteredList.findIndex((pokemon) => pokemon.id === expandedId);

    if (e.key === "ArrowDown") {
        const nextIndex = (currentIndex + 1) % filteredList.length;
        return filteredList[nextIndex]?.id ?? null;
    }
    else if (e.key === "ArrowUp") {
        const prevIndex = (currentIndex - 1 + filteredList.length) % filteredList.length;
        return filteredList[prevIndex]?.id ?? null;
    }

    return expandedId;
};
