import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatType } from "@/lib/definitions";

const loadFromLocalStorage = () => {
    try {
        const savedState = localStorage.getItem("visibleStats");
        return savedState ? (JSON.parse(savedState) as StatType[]) : [StatType.Weight, StatType.Height, StatType.Types];
    } catch (e) {
        console.error("Failed to load from localStorage", e);
        return [StatType.Weight, StatType.Height, StatType.Types];
    }
};

interface UIState {
    searchText: string;
    visibleStats: StatType[];
    expandedId: number | null;
}

const initialState: UIState = {
    searchText: "",
    visibleStats: typeof window !== "undefined" ? loadFromLocalStorage() : [StatType.Weight, StatType.Height, StatType.Types],
    expandedId: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        },
        toggleVisibleStat(state, action: PayloadAction<StatType>) {
            const stat = action.payload;
            state.visibleStats = state.visibleStats.includes(stat)
                ? state.visibleStats.filter((s) => s !== stat)
                : [...state.visibleStats, stat];

            localStorage.setItem("visibleStats", JSON.stringify(state.visibleStats));
        },
        setExpandedId(state, action: PayloadAction<number | null>) {
            state.expandedId = action.payload;
        },
    },
});

export const { setSearchText, toggleVisibleStat, setExpandedId } = uiSlice.actions;
export default uiSlice.reducer;
