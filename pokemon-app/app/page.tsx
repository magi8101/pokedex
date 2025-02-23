import { PokemonSearch } from "@/components/pokemon-search"
import { PokemonDisplay } from "@/components/pokemon-display"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="space-y-8">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter">Welcome to the Modern Pokédex</h1>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Search for any Pokémon to discover their stats, abilities, and more!
          </p>
        </section>
        <PokemonSearch />
        <PokemonDisplay />
      </div>
    </main>
  )
}

