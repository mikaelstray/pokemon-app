"use server";

import { Stat } from "@/lib/definitions";
import { capitalizeFirstLetter } from "@/lib/utils";
import {Progress} from "@/components/ui/progress";

interface StatItemProps {
    stat: Stat;
}

export async function PageStatItem({ stat }: StatItemProps) {
    const statName = capitalizeFirstLetter(stat.stat.name);
    const statValue = stat.base_stat;

    return (
        <div className="flex items-center w-full space-x-2">
            <h3 className="w-40 text-sm font-medium capitalize whitespace-nowrap text-right">
                {statName}: {statValue}
            </h3>
            <div className="flex-grow">
                <Progress value={statValue} />
            </div>
        </div>
    );
};
