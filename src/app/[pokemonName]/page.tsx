import {getPokemon} from "@/lib/data";
import {PokemonImage} from "@/app/components/pokemon-image";
import {capitalizeFirstLetter} from "@/lib/utils";
import {StatItem} from "@/app/components/stat-item";
import {Stat} from "@/lib/definitions";

export default async function PokemonPage({ params } : { params: { pokemonName: string} }) {
    const { pokemonName } = params;
    const pokemonObject = await getPokemon(pokemonName)
    console.log(pokemonObject);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center capitalize pt-4">
                {capitalizeFirstLetter(pokemonName)}
            </h1>
            <div className="flex justify-center m-6">
                <div className="relative w-72 h-72">
                    {pokemonObject.sprites?.other?.['official-artwork']?.front_default ? (
                        <PokemonImage
                            image={pokemonObject.sprites.other['official-artwork'].front_default}
                            name={pokemonName}
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
            </div>

            <h3 className="text-lg font-semibold text-center mb-4">
                Weight: {pokemonObject.weight} kg
            </h3>

            <div className="space-y-4">
                {pokemonObject.stats.map((statObject: Stat) => (
                    <StatItem key={statObject.stat.name} stat={statObject} />
                ))}
            </div>
        </div>
    );
}