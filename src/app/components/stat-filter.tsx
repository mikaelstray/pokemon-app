"use client"

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleVisibleStat } from "@/redux/slices/ui-slice";
import { StatType } from "@/lib/definitions";

export function StatFilter() {
    const dispatch = useAppDispatch();
    const visibleStats = useAppSelector((state) => state.ui.visibleStats);

    return (
        <div>
            {[StatType.Weight, StatType.Height, StatType.Types].map((stat) => (
                <label key={stat}>
                    <input
                        type="checkbox"
                        checked={visibleStats.includes(stat)}
                        onChange={() => dispatch(toggleVisibleStat(stat))}
                    />
                    {stat}
                </label>
            ))}
        </div>
    );
}
