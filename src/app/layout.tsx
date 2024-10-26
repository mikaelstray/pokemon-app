import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Pokemon Finder',
    description: 'Search and discover Pokémon!',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <header className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex p-6">
            <Link href="/" className="text-2xl font-bold">PokemonFinder</Link>
        </header>
        <main className="flex min-h-screen flex-col items-center p-6">
            {children}
        </main>
        </body>
        </html>
    );
}
