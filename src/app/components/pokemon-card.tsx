import Image from "next/image";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PokemonDetails, Type } from "@/lib/definitions";

interface PokemonCardProps {
    pokemon: PokemonDetails;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <Link
            href={pokemon.name}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition cursor-pointer space-x-8"
        >
            {/* Image Section */}
            <div className="relative w-12 h-12">
                <Image
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={`Picture of ${pokemon.name}`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-full"
                />
            </div>

            {/* Name and ID Section */}
            <div className="w-1/3 text-lg font-semibold capitalize flex items-center space-x-2">
                <span>{capitalizeFirstLetter(pokemon.name)}</span>
                <span className="text-sm text-gray-500">#{pokemon.id}</span>
            </div>


            {/* Stats Section (Weight, Height, Types) */}
            <div className="flex w-3/5 space-x-8">
                <div className="flex-1 text-center">
                    <h4 className="text-sm font-medium text-gray-700">Weight</h4>
                    <p className="text-md font-semibold text-gray-900">{pokemon.weight} kg</p>
                </div>
                <div className="flex-1 text-center">
                    <h4 className="text-sm font-medium text-gray-700">Height</h4>
                    <p className="text-md font-semibold text-gray-900">{pokemon.height} m</p>
                </div>
                <div className="flex-1 text-center">
                    <h4 className="text-sm font-medium text-gray-700">Types</h4>
                    <p className="text-md font-semibold text-gray-900">
                        {pokemon.types.map((type: Type) => capitalizeFirstLetter(type.type.name)).join(", ")}
                    </p>
                </div>
            </div>

        </Link>
    );
}

