import { NextResponse } from "next/server"
import { getPokemonByType } from "@/lib/mock-data"

export async function GET() {
  try {
    const popularPokemon = getPokemonByType("popular")
    return NextResponse.json(popularPokemon)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

