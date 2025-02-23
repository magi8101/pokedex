"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { usePokemon } from "@/hooks/use-pokemon"
import { useSearchHistory } from "@/hooks/use-search-history"
import { useEffect } from "react"

export function PokemonDisplay() {
  const { pokemon, loading, error } = usePokemon()
  const { searchHistory, userIp, addToHistory } = useSearchHistory()

  // Example legendary Pokémon data
  const legendaryPokemon = [
    {
      name: "Mewtwo",
      id: 150,
      types: ["psychic"],
      stats: [
        { name: "hp", value: 106 },
        { name: "attack", value: 110 },
        { name: "defense", value: 90 },
        { name: "special-attack", value: 154 },
        { name: "special-defense", value: 90 },
        { name: "speed", value: 130 },
      ],
      height: 20,
      weight: 1220,
      abilities: ["pressure", "unnerve"],
      isLegendary: true,
    },
    {
      name: "Rayquaza",
      id: 384,
      types: ["dragon", "flying"],
      stats: [
        { name: "hp", value: 105 },
        { name: "attack", value: 150 },
        { name: "defense", value: 90 },
        { name: "special-attack", value: 150 },
        { name: "special-defense", value: 90 },
        { name: "speed", value: 95 },
      ],
      height: 70,
      weight: 2065,
      abilities: ["air-lock"],
      isLegendary: true,
    },
  ]

  useEffect(() => {
    if (pokemon) {
      addToHistory(pokemon)
    }
  }, [pokemon, addToHistory])

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

  const PokemonCard = ({ pokemon, isLegendary = false }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${isLegendary ? "border-2 border-yellow-400 dark:border-yellow-600" : ""}`}
    >
      <Card className="overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl capitalize">
            {pokemon.name}
            {isLegendary && (
              <span className="ml-2 inline-block">
                <Image src="/placeholder.svg" alt="Legendary" width={24} height={24} className="inline-block" />
              </span>
            )}
          </CardTitle>
          <CardDescription>#{String(pokemon.id).padStart(3, "0")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-48 h-48">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span key={type} className={`${getTypeColor(type)} px-3 py-1 rounded-full text-white capitalize`}>
                    {type}
                  </span>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Height: {pokemon.height / 10}m</p>
                <p>Weight: {pokemon.weight / 10}kg</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Stats</h3>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{stat.name}</span>
                        <span>{stat.value}</span>
                      </div>
                      <Progress value={stat.value} max={255} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span key={ability} className="bg-muted px-3 py-1 rounded-full text-sm capitalize">
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
    <div className="space-y-8">
      {/* Recently Searched Section */}
      {searchHistory.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Recently Searched</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchHistory
              .filter((item) => item.userIp === userIp)
              .map((item) => (
                <div key={`${item.pokemon.id}-${item.timestamp}`} className="scale-90">
                  <PokemonCard pokemon={item.pokemon} />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Current Search Result */}
      {pokemon && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Search Result</h2>
          <PokemonCard pokemon={pokemon} />
        </section>
      )}

      {/* Legendary Pokémon Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Featured Legendary Pokémon</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {legendaryPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} isLegendary={true} />
          ))}
        </div>
      </section>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
    </div>
  )
}

