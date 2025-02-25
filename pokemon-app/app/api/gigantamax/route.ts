import { NextResponse } from "next/server";

// Gigantamax Pokémon IDs (more than 10 examples)
// In this simulation, we fetch the Pokémon and modify the name to indicate Gigantamax.
const gigantamaxIds = [6, 9, 12, 15, 18, 21, 23, 27, 28, 29, 30];

async function fetchPokemon(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon with id ${id}`);
  }
  const data = await res.json();
  return {
    // Prepend "gigantamax-" to the name to simulate a Gigantamax variant.
    name: `gigantamax-${data.name}`,
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
    const pokemons = await Promise.all(gigantamaxIds.map(id => fetchPokemon(id)));
    return NextResponse.json(pokemons);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

