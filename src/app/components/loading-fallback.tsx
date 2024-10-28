export function LoadingFallback() {
    return (
        <div className="flex justify-center items-center p-6">
            <p className="text-gray-500 text-lg">Loading Pokémon data...</p>
            <div className="flex justify-center items-center p-6">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}