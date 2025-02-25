"use client"

import { useState } from "react"
import { getPokemonById } from "@/lib/mock-data"

interface Pokemon {
  name: string
  id: number
  types: string[]
  stats: Array<{ name: string; value: number }>
  height: number
  weight: number
  abilities: string[]
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  evolution: string
}

interface ComparisonResult {
  group1Total: number
  group2Total: number
  statName: string
}

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([])
  const [groups, setGroups] = useState<Pokemon[][]>([[], []])
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([])
  const [winnerGroup, setWinnerGroup] = useState<Pokemon[] | null>(null)
  const [soloComparisonResult, setSoloComparisonResult] = useState<ComparisonResult[]>([])

  const fetchPokemon = async (nameOrId: string) => {
    try {
      setLoading(true)
      setError(null)

      // Use mock data instead of API call
      const foundPokemon = getPokemonById(nameOrId.toLowerCase())

      if (!foundPokemon) {
        throw new Error("Pokemon not found")
      }

      setPokemon(foundPokemon)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Pokemon")
    } finally {
      setLoading(false)
    }
  }

  const compareGroups = (group1: Pokemon[], group2: Pokemon[]) => {
    const statCategories = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"]
    const results: ComparisonResult[] = statCategories.map((statName) => {
      const group1Total = group1.reduce((acc, p) => acc + (p.stats.find((s) => s.name === statName)?.value || 0), 0)
      const group2Total = group2.reduce((acc, p) => acc + (p.stats.find((s) => s.name === statName)?.value || 0), 0)
      return { statName, group1Total, group2Total }
    })
    setComparisonResults(results)
    setWinnerGroup(
      results.reduce((acc, curr) => acc + curr.group1Total, 0) >
        results.reduce((acc, curr) => acc + curr.group2Total, 0)
        ? group1
        : group2,
    )
  }

  const compareSolo = (pokemon1: Pokemon, pokemon2: Pokemon) => {
    const statCategories = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"]
    const results: ComparisonResult[] = statCategories.map((statName) => {
      const group1Total = pokemon1.stats.find((s) => s.name === statName)?.value || 0
      const group2Total = pokemon2.stats.find((s) => s.name === statName)?.value || 0
      return { statName, group1Total, group2Total }
    })
    setSoloComparisonResult(results)
  }

  const handleDeletePokemon = (id: number, groupIndex?: number) => {
    if (groupIndex !== undefined) {
      const newGroups = [...groups]
      newGroups[groupIndex] = newGroups[groupIndex].filter((p) => p.id !== id)
      setGroups(newGroups)
    } else {
      setSelectedPokemon(selectedPokemon.filter((p) => p.id !== id))
    }
  }

  return {
    pokemon,
    loading,
    error,
    fetchPokemon,
    selectedPokemon,
    setSelectedPokemon,
    groups,
    setGroups,
    compareGroups,
    comparisonResults,
    handleDeletePokemon,
    winnerGroup,
    compareSolo,
    soloComparisonResult,
  }
}

