import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Dispatch, SetStateAction} from "react";
import {StatType} from "@/lib/definitions";

interface StatFilterProps {
    visibleStats: StatType[];
    setVisibleStats: Dispatch<SetStateAction<StatType[]>>;
}

export function StatFilter({ visibleStats, setVisibleStats }: StatFilterProps) {
    const toggleStat = (stat: StatType) => {
        setVisibleStats((prev) =>
            prev.includes(stat) ? prev.filter((s) => s !== stat) : [...prev, stat]
        );
    };

    return (
        <div className="flex justify-end w-full space-x-8 pr-14 pb-8">
            <div className="flex flex-col items-center space-y-4 border-r border-gray-400 pr-4">
                <Label htmlFor="weight">Weight</Label>
                <Checkbox
                    id="weight"
                    checked={visibleStats.includes(StatType.Weight)}
                    onCheckedChange={() => toggleStat(StatType.Weight)}
                />
            </div>
            <div className="flex flex-col items-center space-y-4 border-r border-gray-400 pr-6">
                <Label htmlFor="height">Height</Label>
                <Checkbox
                    id="height"
                    checked={visibleStats.includes(StatType.Height)}
                    onCheckedChange={() => toggleStat(StatType.Height)}
                />
            </div>
            <div className="flex flex-col items-center space-y-4">
                <Label htmlFor="types">Types</Label>
                <Checkbox
                    id="types"
                    checked={visibleStats.includes(StatType.Types)}
                    onCheckedChange={() => toggleStat(StatType.Types)}
                />
            </div>
        </div>
    );
}
