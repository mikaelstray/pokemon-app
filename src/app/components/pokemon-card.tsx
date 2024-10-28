"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PokemonDetails, StatType } from "@/lib/definitions";
import { ExternalLinkIcon } from "@/app/components/icons";
import React from "react";
import { StatDisplay } from "@/app/components/card/card-stat";

interface PokemonCardProps {
    pokemon: PokemonDetails;
    isSelected: boolean;
    setExpandedId: (id: number | null) => void;
    visibleStats: StatType[]; // Array of visible stats
}

export function PokemonCard({
                                pokemon,
                                isSelected,
                                setExpandedId,
                                visibleStats,
                            }: PokemonCardProps) {
    const { id, name, sprites, weight, height, types, stats } = pokemon;

    const handleClick = () => setExpandedId(isSelected ? null : id);
    const preventPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <div
            onClick={handleClick}
            className={clsx(
                "flex flex-col items-start p-4 border rounded-lg transition cursor-pointer space-y-4 hover:shadow-lg",
                {
                    "bg-blue-50 border-blue-500 shadow-lg ring-2 ring-blue-300": isSelected,
                }
            )}
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4 w-full max-w-xs">
                    <div className="relative w-12 h-12">
                        <Image
                            src={sprites.other['official-artwork'].front_default}
                            alt={`Picture of ${name}`}
                            fill
                            style={{ objectFit: "contain" }}
                            className="rounded-full"
                        />
                    </div>
                    <div className="text-lg font-semibold capitalize flex flex-col">
                        <span>{capitalizeFirstLetter(name)}</span>
                        <span className="text-sm text-gray-500">#{id}</span>
                    </div>
                </div>

                <div className="flex flex-grow gap-x-8 items-center justify-between">
                    <StatDisplay
                        label="Weight"
                        value={`${weight} kg`}
                        isVisible={visibleStats.includes(StatType.Weight)}
                    />
                    <StatDisplay
                        label="Height"
                        value={`${height} m`}
                        isVisible={visibleStats.includes(StatType.Height)}
                    />
                    <StatDisplay
                        label="Types"
                        value={types.map((type) => capitalizeFirstLetter(type.type.name)).join(", ")}
                        isVisible={visibleStats.includes(StatType.Types)}
                        width="150px"
                    />
                </div>

                <Link
                    href={`/${name}`}
                    className="flex items-center justify-center p-2 hover:scale-110 transition-transform"
                    onClick={preventPropagation}
                >
                    <ExternalLinkIcon />
                </Link>
            </div>

            {isSelected && (
                <div className="mt-4 flex flex-col gap-y-2 w-full">
                    {stats.map((stat) => (
                        <div key={stat.stat.name} className="flex justify-between items-center w-full">
                            <span className="text-xs font-medium text-gray-700 capitalize">
                                {capitalizeFirstLetter(stat.stat.name)}
                            </span>
                            <span className="text-md font-semibold text-gray-900">{stat.base_stat}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
