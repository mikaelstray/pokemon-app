// components/PokemonCard.tsx
"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {capitalizeFirstLetter} from "@/lib/utils";
import {PokemonDetails, StatType, Type} from "@/lib/definitions";
import {ExternalLinkIcon} from "@/app/components/icons";
import React from "react";

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
                <div className="flex items-center space-x-8 w-full">
                    <div className="relative w-12 h-12">
                        <Image
                            src={sprites.other['official-artwork'].front_default}
                            alt={`Picture of ${name}`}
                            fill
                            style={{ objectFit: "contain" }}
                            className="rounded-full"
                        />
                    </div>
                    <div className="w-1/3 text-lg font-semibold capitalize flex items-center space-x-2">
                        <span>{capitalizeFirstLetter(name)}</span>
                        <span className="text-sm text-gray-500">#{id}</span>
                    </div>
                    <div className="flex w-3/5 space-x-8">
                        {/* Conditionally render each stat based on whether it's in the visibleStats array */}
                        {visibleStats.includes(StatType.Weight) && (
                            <div className="flex-1 text-center">
                                <h4 className="text-sm font-medium text-gray-700">Weight</h4>
                                <p className="text-md font-semibold text-gray-900">{weight} kg</p>
                            </div>
                        )}
                        {visibleStats.includes(StatType.Height) && (
                            <div className="flex-1 text-center">
                                <h4 className="text-sm font-medium text-gray-700">Height</h4>
                                <p className="text-md font-semibold text-gray-900">{height} m</p>
                            </div>
                        )}
                        {visibleStats.includes(StatType.Types) && (
                            <div className="flex-1 text-center">
                                <h4 className="text-sm font-medium text-gray-700">Types</h4>
                                <p className="text-md font-semibold text-gray-900">
                                    {types.map((type: Type) => capitalizeFirstLetter(type.type.name)).join(", ")}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="group" onClick={preventPropagation}>
                    <Link href={`/${name}`} className="hover:scale-110 transition-transform">
                        <ExternalLinkIcon />
                    </Link>
                </div>
            </div>

            {isSelected && (
                <div className="mt-4 space-y-2 w-full">
                    {stats.map((stat) => (
                        <div key={stat.stat.name} className="flex justify-between text-sm text-gray-800">
                            <span className="capitalize font-medium">{capitalizeFirstLetter(stat.stat.name)}:</span>
                            <span>{stat.base_stat}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
