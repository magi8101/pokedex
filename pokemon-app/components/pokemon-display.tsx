"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { usePokemon } from "@/hooks/use-pokemon"
import { useSearchHistory } from "@/hooks/use-search-history"
import { SoloCompare } from "@/components/SoloCompare"

// Define the Pokemon interface.
export interface Pokemon {
  name: string
  id: number
  types: string[]
  stats: Array<{ name: string; value: number }>
  height: number
  weight: number
  abilities: string[]
  sprites?: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
}

/*
  PokemonDisplay component fetches Pokémon data from various API endpoints available under the app/api directory:
    /api/legendary
    /api/popular
    /api/new-generation
    /api/top-rated
    /api/starter
    /api/mythical
    /api/ultra-beasts
    /api/regional
    /api/gigantamax
  
  It displays the Pokémon in horizontally scrollable, responsive containers.
  Card boxes have been increased in size and images now load faster and respond to different device widths.
  It also renders the SoloCompare component (if two Pokémon are selected) to compare stats.
*/
export function PokemonDisplay() {
  // usePokemon hook returns the main searched Pokémon,
  // along with additional properties: selectedPokemon and comparisonResults.
  const { pokemon, loading, error, selectedPokemon, comparisonResults } = usePokemon()
  const { searchHistory, userIp, addToHistory } = useSearchHistory()

  // State variables for each genre.
  const [legendary, setLegendary] = useState<Pokemon[]>([])
  const [popular, setPopular] = useState<Pokemon[]>([])
  const [newGeneration, setNewGeneration] = useState<Pokemon[]>([])
  const [topRated, setTopRated] = useState<Pokemon[]>([])
  const [starter, setStarter] = useState<Pokemon[]>([])
  const [mythical, setMythical] = useState<Pokemon[]>([])
  const [ultraBeasts, setUltraBeasts] = useState<Pokemon[]>([])
  const [regional, setRegional] = useState<Pokemon[]>([])
  const [gigantamax, setGigantamax] = useState<Pokemon[]>([])

  // Function to fetch data for a given genre.
  async function fetchGenre(endpoint: string): Promise<Pokemon[]> {
    try {
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error("Failed to fetch from " + endpoint)
      const data: Pokemon[] = await res.json()
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  // On mount, fetch data from all available endpoints.
  useEffect(() => {
    fetchGenre("/api/legendary").then(setLegendary)
    fetchGenre("/api/popular").then(setPopular)
    fetchGenre("/api/new-generation").then(setNewGeneration)
    fetchGenre("/api/top-rated").then(setTopRated)
    fetchGenre("/api/starter").then(setStarter)
    fetchGenre("/api/mythical").then(setMythical)
    fetchGenre("/api/ultra-beasts").then(setUltraBeasts)
    fetchGenre("/api/regional").then(setRegional)
    fetchGenre("/api/gigantamax").then(setGigantamax)
  }, [])

  // Add the main searched Pokémon (if any) to the search history.
  useEffect(() => {
    if (pokemon) {
      addToHistory(pokemon)
    }
  }, [pokemon, addToHistory])

  // Utility function to pick a Tailwind color for each Pokémon type.
  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-200",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-blue-400",
      psychic: "bg-pink-500",
      bug: "bg-green-400",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-600",
      dark: "bg-gray-800",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    }
    return colors[type] || "bg-gray-500"
  }

  // Reusable Pokémon Card component.
  const PokemonCard = ({
    pokemon,
    isLegendary = false,
  }: {
    pokemon: Pokemon
    isLegendary?: boolean
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      // Increased min width box size for better visual impact.
      className={isLegendary ? "border-2 border-yellow-400 dark:border-yellow-600 rounded-lg" : "rounded-lg"}
    >
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="text-center p-4">
          <CardTitle className="text-3xl capitalize">{pokemon.name}</CardTitle>
          <CardDescription>#{String(pokemon.id).padStart(3, "0")}</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center gap-4">
              {/* Increased image container size for responsiveness */}
              <div className="relative w-64 h-64">
                <Image
                  src={
                    pokemon.sprites?.other["official-artwork"]?.front_default ||
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                  }
                  alt={pokemon.name}
                  // Use responsive sizes so the image loads faster on smaller screens.
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`${getTypeColor(type)} px-4 py-1 rounded-full text-white capitalize text-sm`}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <p>Height: {(pokemon.height / 10).toFixed(1)}m</p>
                <p>Weight: {(pokemon.weight / 10).toFixed(1)}kg</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1 text-lg">Stats</h3>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{stat.name}</span>
                        <span>{stat.value}</span>
                      </div>
                      <Progress value={stat.value} max={255} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-lg">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span key={ability} className="bg-gray-200 px-3 py-1 rounded-full text-sm capitalize">
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-12 p-4">
      {/* Recently Searched Section */}
      {searchHistory.length > 0 && (
        <section id="recently-searched">
          <h2 className="text-2xl font-bold mb-6">Recently Searched</h2>
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {searchHistory
              .filter((item) => item.userIp === userIp)
              .map((item) => (
                <div key={`${item.pokemon.id}-${item.timestamp}`} className="min-w-[350px] scale-90">
                  <PokemonCard pokemon={item.pokemon} />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Search Result Section */}
      {pokemon && (
        <section id="search-result">
          <h2 className="text-2xl font-bold mb-6">Search Result</h2>
          <div className="flex space-x-6 overflow-x-auto pb-6">
            <div className="min-w-[350px]">
              <PokemonCard pokemon={pokemon} />
            </div>
          </div>
        </section>
      )}

      {/* Genre Sections */}
      <section id="legendary">
        <h2 className="text-2xl font-bold mb-6">Featured Legendary Pokémon</h2>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {legendary.map((poke) => (
            <div key={poke.id} className="min-w-[350px]">
              <PokemonCard pokemon={poke} isLegendary={true} />
            </div>
          ))}
        </div>
      </section>

      <section id="popular">
        <h2 className="text-2xl font-bold mb-6">Popular Pokémon</h2>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {popular.map((poke) => (
            <div key={poke.id} className="min-w-[350px]">
              <PokemonCard pokemon={poke} />
            </div>
          ))}
        </div>
      </section>

      <section id="new-generation">
        <h2 className="text-2xl font-bold mb-6">New Generation Pokémon</h2>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {newGeneration.map((poke) => (
            <div key={poke.id} className="min-w-[350px]">
              <PokemonCard pokemon={poke} />
            </div>
          ))}
        </div>
      </section>

      <section id="top-rated">
        <h2 className="text-2xl font-bold mb-6">Top Rated Pokémon</h2>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {topRated.map((poke) => (
            <div key={poke.id} className="min-w-[350px]">
              <PokemonCard pokemon={poke} />
            </div>
          ))}
        </div>
      </section>

      <section id="starters">
        <h2 className="text-2xl font-bold mb-6">Starter Pokémon</h2>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {starter.map((poke) => (
            <div key={poke.id} className="min-w-[350px]">
              <PokemonCard pokemon={poke} />
            </div>
          ))}
        </div>
      </section>

      <section id="mythical">
        <h2 className="text-2xl font-bold mb-6">Mythical Pokémon</h2>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {mythical.map((poke) => (
            <div key={poke.id} className="min-w-[350px]">
              <PokemonCard pokemon={poke} isLegendary={true} />
            </div>
          ))}
        </div>
      </section>

      <section id="ultra-beasts">
        <h2 className="text-2xl font-bold mb-6">Ultra Beasts</h2>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {ultraBeasts.map((poke) => (
            <div key={poke.id} className="min-w-[350px]">
              <PokemonCard pokemon={poke} />
            </div>
          ))}
        </div>
      </section>

      <section id="regional">
        <h2 className="text-2xl font-bold mb-6">Regional Pokémon</h2>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {regional.map((poke) => (
            <div key={poke.id} className="min-w-[350px]">
              <PokemonCard pokemon={poke} />
            </div>
          ))}
        </div>
      </section>

      <section id="gigantamax">
        <h2 className="text-2xl font-bold mb-6">Gigantamax Pokémon</h2>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {gigantamax.map((poke) => (
            <div key={poke.id} className="min-w-[350px]">
              <PokemonCard pokemon={poke} />
            </div>
          ))}
        </div>
      </section>

      {/* Render the SoloCompare component if two Pokémon are selected and a comparison is available */}
      {selectedPokemon && comparisonResults && selectedPokemon.length === 2 && (
        <SoloCompare
          selectedPokemon={selectedPokemon}
          comparisonResults={comparisonResults}
        />
      )}

      {loading && <div className="text-center text-lg">Loading...</div>}
      {error && <div className="text-center text-red-500 text-lg">{error}</div>}
    </div>
  )
}

