"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Shuffle, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { usePokemon } from "@/hooks/use-pokemon"
import { PokemonCompare } from "@/components/PokemonCompare"
import { SoloCompare } from "@/components/SoloCompare"

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

export function PokemonSearch() {
  const [search, setSearch] = useState("")
  const {
    pokemon,
    fetchPokemon,
    loading,
    error,
    selectedPokemon,
    setSelectedPokemon,
    groups,
    setGroups,
    compareGroups,
    comparisonResults,
    handleDeletePokemon,
    compareSolo,
    soloComparisonResult,
  } = usePokemon()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      fetchPokemon(search.trim())
    }
  }

  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 898) + 1
    fetchPokemon(randomId.toString())
  }

  const handleSelectPokemon = () => {
    if (pokemon && !selectedPokemon.some(p => p.id === pokemon.id)) {
      setSelectedPokemon([...selectedPokemon, pokemon])
    }
  }

  const handleAddToGroup = (groupIndex: number) => {
    if (pokemon && !groups[groupIndex].some(p => p.id === pokemon.id)) {
      const newGroups = [...groups]
      newGroups[groupIndex].push(pokemon)
      setGroups(newGroups)
    }
  }

  const handleCompareGroups = () => {
    if (groups[0].length > 0 && groups[1].length > 0) {
      compareGroups(groups[0], groups[1])
    }
  }

  const handleCompareSolo = () => {
    if (selectedPokemon.length === 2) {
      compareSolo(selectedPokemon[0], selectedPokemon[1])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 space-y-6"
    >
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            disabled={loading}
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleRandom}
            disabled={loading}
            className="gap-2"
          >
            <Shuffle className="h-4 w-4" />
            Random
          </Button>
        </div>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {pokemon && (
        <div className="bg-gray-800 border border-yellow-500 shadow-md rounded-lg p-4 flex flex-col sm:flex-row">
          <div className="flex-shrink-0">
            <img
              src={pokemon.sprites?.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-64 h-64 mb-4 sm:mb-0"
            />
          </div>
          <div className="text-white ml-0 sm:ml-4 flex-1">
            <div className="text-center sm:text-left mb-4">
              <h2 className="text-2xl font-bold">
                {pokemon.name} <span className="text-gray-500">#{pokemon.id}</span>
              </h2>
            </div>
            <p className="font-bold">
              Type:{" "}
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`${getTypeColor(type)} text-white px-2 py-1 rounded-full mr-2`}
                >
                  {type}
                </span>
              ))}
            </p>
            <p className="font-bold">Height: {pokemon.height / 10}m</p>
            <p className="font-bold">Weight: {pokemon.weight / 10}kg</p>
            <p className="font-bold">Evolution: {pokemon.evolution}</p>
            <p className="font-bold text-gray-400">Abilities: {pokemon.abilities.join(", ")}</p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Power</h3>
              {pokemon.stats.map((stat) => (
                <div key={stat.name} className="mb-2">
                  <p className="capitalize">
                    {stat.name}: {stat.value}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      style={{ width: `${Math.min(stat.value, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {pokemon && (
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <Button onClick={handleSelectPokemon} disabled={selectedPokemon.length >= 2}>
            Select Pokémon
          </Button>
          <Button onClick={() => handleAddToGroup(0)} disabled={groups[0].length >= 10}>
            Add to Group 1
          </Button>
          <Button onClick={() => handleAddToGroup(1)} disabled={groups[1].length >= 10}>
            Add to Group 2
          </Button>
        </div>
      )}
      {selectedPokemon.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-white">Selected Pokémon</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedPokemon.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 rounded-lg p-2 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={p.sprites?.other["official-artwork"].front_default}
                    alt={p.name}
                    className="w-16 h-16"
                  />
                  <div className="ml-2">
                    <p className="text-white font-bold">
                      {p.name} <span className="text-gray-500">#{p.id}</span>
                    </p>
                    <p className="text-gray-400">Type: {p.types.join(", ")}</p>
                  </div>
                </div>
                <Button variant="destructive" onClick={() => handleDeletePokemon(p.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedPokemon.length === 2 && (
        <div className="mt-4">
          <Button onClick={handleCompareSolo} className="w-full">
            Compare Selected Pokémon
          </Button>
        </div>
      )}
      {(groups[0].length > 0 || groups[1].length > 0) && (
        <div className="mt-4">
          <Button onClick={handleCompareGroups} className="w-full">
            Compare Groups
          </Button>
        </div>
      )}
      {selectedPokemon.length === 2 && (
        <SoloCompare
          selectedPokemon={selectedPokemon}
          comparisonResults={soloComparisonResult}
        />
      )}
      {(groups[0].length > 0 || groups[1].length > 0) && (
        <PokemonCompare
          group1={groups[0]}
          group2={groups[1]}
          comparisonResults={comparisonResults}
        />
      )}
    </motion.div>
  )
}

