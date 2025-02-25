import { NextResponse } from "next/server";

// Mythical Pokémon IDs (more than 10 examples)
// Note: In reality, mythical Pokémon are very limited. Here we simulate by using a custom list.
const mythicalIds = [151, 251, 386, 492, 493, 494, 495, 496, 497, 498, 499];

async function fetchPokemon(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon with id ${id}`);
  }
  const data = await res.json();
  return {
    name: data.name,
    id: data.id,
    types: data.types.map((t: any) => t.type.name),
    stats: data.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat
    })),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a: any) => a.ability.name),
    // Mark mythical Pokémon as legendary (or a special flag) if desired.
    isLegendary: true
  };
}

export async function GET() {
  try {
    const pokemons = await Promise.all(mythicalIds.map(id => fetchPokemon(id)));
    return NextResponse.json(pokemons);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

