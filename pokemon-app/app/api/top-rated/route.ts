import { NextResponse } from "next/server";

// Top Rated Pokémon IDs (more than 10 examples)
const topRatedIds = [445, 248, 373, 448, 449, 450, 451, 452, 453, 454, 455];

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
    isLegendary: false
  };
}

export async function GET() {
  try {
    const pokemons = await Promise.all(topRatedIds.map(id => fetchPokemon(id)));
    return NextResponse.json(pokemons);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

