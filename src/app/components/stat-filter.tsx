"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleVisibleStat } from "@/redux/slices/ui-slice";
import { StatType } from "@/lib/definitions";
import { capitalizeFirstLetter } from "@/lib/utils";

export function StatFilter() {
    const dispatch = useAppDispatch();
    const visibleStats = useAppSelector((state) => state.ui.visibleStats);

    return (
        <div className="flex w-full justify-between">
            {/* Checkbox options for each stat type */}
            {[StatType.Weight, StatType.Height, StatType.Types].map((stat) => (
                <div key={stat} className="flex flex-col items-center space-y-1 flex-1">
                    {/* Stat label */}
                    <label className="text-gray-700 text-sm" htmlFor={stat}>
                        {capitalizeFirstLetter(stat)}
                    </label>

                    {/* Checkbox to toggle stat visibility */}
                    <input
                        id={stat}
                        type="checkbox"
                        checked={visibleStats.includes(stat)}
                        onChange={() => dispatch(toggleVisibleStat(stat))}
                        aria-label={`Toggle visibility for ${stat}`}
                    />
                </div>
            ))}
        </div>
    );
}
