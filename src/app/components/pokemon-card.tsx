import Link from "next/link"
import {useState} from "react";

interface PokemonCardProps {
    name: string;
}

export function PokemonCard({ name } : PokemonCardProps) {
    return (
        <Link
            href={name}
            className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-grey-500 hover:border-gray-300"
            key={name + "Card"}
            >
            <h2 className={`mb-3 text-2xl font-semibold`}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </h2>
        </Link>
    )
}