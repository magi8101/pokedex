export const mockPokemonData = {
  legendary: [
    {
      name: "articuno",
      id: 144,
      types: ["ice", "flying"],
      stats: [
        { name: "hp", value: 90 },
        { name: "attack", value: 85 },
        { name: "defense", value: 100 },
        { name: "special-attack", value: 95 },
        { name: "special-defense", value: 125 },
        { name: "speed", value: 85 },
      ],
      height: 17,
      weight: 554,
      abilities: ["pressure"],
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png",
          },
        },
      },
      evolution: "unknown",
    },
    {
      name: "zapdos",
      id: 145,
      types: ["electric", "flying"],
      stats: [
        { name: "hp", value: 90 },
        { name: "attack", value: 90 },
        { name: "defense", value: 85 },
        { name: "special-attack", value: 125 },
        { name: "special-defense", value: 90 },
        { name: "speed", value: 100 },
      ],
      height: 16,
      weight: 526,
      abilities: ["pressure"],
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png",
          },
        },
      },
      evolution: "unknown",
    },
  ],
  popular: [
    {
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
    {
      name: "charizard",
      id: 6,
      types: ["fire", "flying"],
      stats: [
        { name: "hp", value: 78 },
        { name: "attack", value: 84 },
        { name: "defense", value: 78 },
        { name: "special-attack", value: 109 },
        { name: "special-defense", value: 85 },
        { name: "speed", value: 100 },
      ],
      height: 17,
      weight: 905,
      abilities: ["blaze"],
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
          },
        },
      },
      evolution: "charizard",
    },
  ],
  starters: [
    {
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
  ],
}

export const getPokemonById = (id: string) => {
  for (const key in mockPokemonData) {
    const pokemonList = mockPokemonData[key as keyof typeof mockPokemonData]
    const foundPokemon = pokemonList?.find((pokemon) => String(pokemon.id) === id || pokemon.name === id)
    if (foundPokemon) {
      return foundPokemon
    }
  }
  return null
}

export const getPokemonByType = (type: string) => {
  return mockPokemonData[type as keyof typeof mockPokemonData] || []
}

