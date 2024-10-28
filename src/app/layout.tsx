import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Pokemon Finder',
    description: 'Search and discover Pokemons!',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-gray-100`}>
        <div className="flex flex-col min-h-screen">
            <header className="bg-white shadow-md w-full py-4 px-4">
                <div className="max-w-5xl mx-auto flex items-center">
                    <Link href="/" className="text-3xl font-bold text-gray-900">
                        PokemonFinder
                    </Link>
                </div>
            </header>

            <main className="flex-grow flex justify-center items-center">
                <div className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg mt-10">
                    {children}
                </div>
            </main>

            <footer className="bg-gray-200 w-full py-4">
                <div className="max-w-5xl mx-auto text-center text-gray-600">
                    © {new Date().getFullYear()} PokemonFinder. All rights reserved.
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}
