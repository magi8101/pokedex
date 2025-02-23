"use client"

import { useState } from "react"

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
}

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPokemon = async (nameOrId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`)
      if (!response.ok) {
        throw new Error("Pokemon not found")
      }
      const data = await response.json()
      setPokemon({
        name: data.name,
        id: data.id,
        types: data.types.map((t: any) => t.type.name),
        stats: data.stats.map((s: any) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((a: any) => a.ability.name),
        sprites: data.sprites,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Pokemon")
    } finally {
      setLoading(false)
    }
  }

  return { pokemon, loading, error, fetchPokemon }
}

