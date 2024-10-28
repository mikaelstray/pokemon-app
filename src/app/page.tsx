"use client";

import { Provider} from "react-redux";
import { store } from "@/redux/store";
import {HomePageContent} from "@/app/components/homepage-content";

export default function HomePage() {
    return (
        <Provider store={store}>
            <h1 className="text-4xl font-bold text-center pt-6 pb-6">Pokémon List</h1>
            <HomePageContent />
        </Provider>
    );
}
