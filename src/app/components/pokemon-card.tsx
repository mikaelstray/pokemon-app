import Image from "next/image";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PokemonDetails, Type } from "@/lib/definitions";

interface PokemonCardProps {
    pokemon: PokemonDetails;
    isExpanded: boolean;
    setExpandedId: (id: number | null) => void;
    isActive: boolean;
}

export function PokemonCard({ pokemon, isExpanded, setExpandedId, isActive }: PokemonCardProps) {
    const handleClick = () => {
        setExpandedId(isExpanded ? null : pokemon.id); // Toggle expansion
    };

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-start p-4 border rounded-lg transition cursor-pointer space-y-4 ${
                isExpanded ? 'bg-blue-50 border-blue-500 shadow-lg' : 'hover:shadow-lg'
            } ${isActive ? 'ring-2 ring-blue-300' : ''}`} // Apply highlight if active
        >
            {/* Top Section: Basic Info and Icon */}
            <div className="flex items-center justify-between w-full">
                {/* Left Section: Image and Stats */}
                <div className="flex items-center space-x-8 w-full">
                    <div className="relative w-12 h-12">
                        <Image
                            src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={`Picture of ${pokemon.name}`}
                            fill
                            style={{objectFit: "contain"}}
                            className="rounded-full"
                        />
                    </div>
                    <div className="w-1/3 text-lg font-semibold capitalize flex items-center space-x-2">
                        <span>{capitalizeFirstLetter(pokemon.name)}</span>
                        <span className="text-sm text-gray-500">#{pokemon.id}</span>
                    </div>
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
                </div>

                {/* Right Section: Icon Link */}
                <div className="group" onClick={(e) => e.stopPropagation()}>
                    <Link href={`/${pokemon.name}`} className="hover:scale-110 transition-transform">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-500 group-hover:text-red-400 transition-colors duration-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Expanded Section for Additional Stats */}
            {isExpanded && (
                <div className="mt-4 space-y-2 w-full">
                    {pokemon.stats.map((stat) => (
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
