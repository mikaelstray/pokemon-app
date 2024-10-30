import {getPokemon} from "@/lib/data";
import {PokemonImage} from "@/app/components/pokemon-image";
import {capitalizeFirstLetter} from "@/lib/utils";
import {PageStatItem} from "@/app/components/stat/page-stat-item";
import {Stat} from "@/lib/definitions";

export default async function PokemonPage(props: { params: Promise<{ pokemonName: string }> }) {
    // Await params and extract the Pokémon name
    const { pokemonName } = await props.params;

    // Fetch Pokémon data based on the name
    const pokemonObject = await getPokemon(pokemonName);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {/* Pokémon Name Header */}
            <h1 className="text-4xl font-bold text-center capitalize pt-4">
                {capitalizeFirstLetter(pokemonName)}
            </h1>

            {/* Pokémon Image */}
            <div className="flex justify-center m-6">
                <div className="relative w-72 h-72">
                    <PokemonImage
                        image={pokemonObject.sprites.other['official-artwork'].front_default}
                        name={pokemonName}
                    />
                </div>
            </div>

            {/* Pokémon ID */}
            <h3 className="text-lg font-semibold text-center mb-4">
                #{pokemonObject.id}
            </h3>

            {/* Pokémon Stats */}
            <div className="space-y-4">
                {pokemonObject.stats.map((statObject: Stat) => (
                    <PageStatItem key={statObject.stat.name} stat={statObject} />
                ))}
            </div>
        </div>
    );
}
