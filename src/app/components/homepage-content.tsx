"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "@/redux/slices/pokemon-slices";
import { AppDispatch, RootState } from "@/redux/store";
import { PokemonGrid } from "@/app/components/pokemon-grid";
import { LoadingFallback } from "@/app/components/loading-fallback";

export function HomePageContent() {
    const dispatch: AppDispatch = useDispatch();
    const status = useSelector((state: RootState) => state.pokemon.status);
    const error = useSelector((state: RootState) => state.pokemon.error);

    // Fetch Pokémon list on initial render if status is idle
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPokemonList());
        }
    }, [dispatch, status]);

    // Show loading state if the data is loading or idle
    if (status === "loading" || status === "idle") {
        return <LoadingFallback />;
    }

    // Show error message if the fetch fails
    if (status === "failed") {
        return (
            <div className="flex justify-center items-center p-6 text-lg text-red-500">
                Error loading Pokémon data: {error}
            </div>
        );
    }

    // Show the main Pokémon grid if data is successfully loaded
    return <PokemonGrid />;
}
