"use client"

import { PokemonGrid } from "@/app/components/pokemon-grid";
import {Provider} from "react-redux";
import { store } from "@/redux/store";

export default function HomePage() {

    return (
        <Provider store={store}>
            <h1 className="text-4xl font-bold text-center pt-6">Pokémon List</h1>
            <PokemonGrid/>
        </Provider>
    );
}