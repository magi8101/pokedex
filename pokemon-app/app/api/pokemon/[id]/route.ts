import { NextResponse } from "next/server"

// Hardcoded Pokemon data to avoid external API calls
const pokemonData = {
  "25": {
    name: "pikachu",
    id: 25,
    types: ["electric"],
    stats: [
      { name: "hp", value: 35 },
      { name: "attack", value: 55 },
      { name: "defense", value: 40 },
      { name: "special-attack", value: 50 },
      { name: "special-defense", value: 50 },
      { name: "speed", value: 90 },
    ],
    height: 4,
    weight: 60,
    abilities: ["static"],
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        },
      },
    },
    evolution: "raichu",
  },
  "1": {
    name: "bulbasaur",
    id: 1,
    types: ["grass", "poison"],
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 49 },
      { name: "defense", value: 49 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 45 },
    ],
    height: 7,
    weight: 69,
    abilities: ["overgrow"],
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      },
    },
    evolution: "ivysaur",
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if we have the Pokemon in our hardcoded data
    const pokemon = pokemonData[id] || pokemonData["25"] // Default to Pikachu if not found

    return NextResponse.json(pokemon, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error in Pokemon API route:", error)
    return NextResponse.json({ error: "Failed to fetch Pokemon" }, { status: 500 })
  }
}

