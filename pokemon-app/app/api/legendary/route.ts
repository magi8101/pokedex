import { NextResponse } from "next/server"

const legendaryIds = [144, 145, 146, 150] // Example Legendary Pokémon IDs

async function fetchPokemon(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch Pokemon ${id}`)
  const data = await res.json()
  return {
    name: data.name,
    id: data.id,
    types: data.types.map((t: any) => t.type.name),
    stats: data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a: any) => a.ability.name),
    sprites: data.sprites,
  }
}

export async function GET() {
  try {
    const pokemons = await Promise.all(legendaryIds.map(fetchPokemon))
    return NextResponse.json(pokemons)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

