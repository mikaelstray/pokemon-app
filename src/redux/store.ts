import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/pokemon-slices";
import uiReducer from "./slices/ui-slice";

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
