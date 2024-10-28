// redux/slices/pokemon-slices.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PokemonDetails } from "@/lib/definitions";
import { getPokemonList } from "@/lib/data";

interface PokemonState {
    pokemonList: PokemonDetails[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: PokemonState = {
    pokemonList: [],
    status: "idle",
    error: null,
};

export const fetchPokemonList = createAsyncThunk(
    "pokemon/fetchPokemonList",
    async () => {
        return await getPokemonList();
    }
);

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPokemonList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.pokemonList = action.payload;
            })
            .addCase(fetchPokemonList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch Pokémon";
            });
    },
});

export default pokemonSlice.reducer;
