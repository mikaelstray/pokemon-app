// PokemonCard.tsx

import Image from "next/image";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PokemonDetails, Stat } from "@/lib/definitions";

interface PokemonCardProps {
    pokemon: PokemonDetails;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <Link
            href={`/${pokemon.name}`}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition cursor-pointer space-x-4"
        >
            <div className="relative w-12 h-12">
                <Image
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={`Picture of ${pokemon.name}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-full"
                />
            </div>

            {/* Name and ID Section */}
            <div className="w-1/4 text-lg font-semibold capitalize">
                {capitalizeFirstLetter(pokemon.name)} <span className="text-sm text-gray-500">#{pokemon.id}</span>
            </div>

            {/* Stats Section (4 Columns) */}
            <div className="flex w-3/5 justify-between space-x-4">
                {pokemon.stats.slice(0, 4).map((stat: Stat) => (
                    <div key={stat.stat.name} className="text-center">
                        <h4 className="text-sm font-medium text-gray-700">{capitalizeFirstLetter(stat.stat.name)}</h4>
                        <p className="text-md font-semibold text-gray-900">{stat.base_stat}</p>
                    </div>
                ))}
            </div>
        </Link>
    );
}
