import { NextResponse } from "next/server"
import { getPokemonByType } from "@/lib/mock-data"

export async function GET() {
  try {
    const starterPokemon = getPokemonByType("starters")
    return NextResponse.json(starterPokemon)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

