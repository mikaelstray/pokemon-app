"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "@/redux/slices/pokemon-slices";
import {AppDispatch, RootState} from "@/redux/store";
import { PokemonGrid } from "@/app/components/pokemon-grid";
import { LoadingFallback } from "@/app/components/loading-fallback";

export function HomePageContent() {
    const dispatch: AppDispatch = useDispatch();
    const status = useSelector((state: RootState) => state.pokemon.status);
    const error = useSelector((state: RootState) => state.pokemon.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPokemonList());
        }
    }, [dispatch, status]);

    if (status === "loading" || status === "idle") {
        return <LoadingFallback />;
    }

    if (status === "failed") {
        return (
            <div className="flex justify-center items-center p-6 text-lg text-red-500">
                Error loading Pokémon data: {error}
            </div>
        );
    }

    return <PokemonGrid />;
}
