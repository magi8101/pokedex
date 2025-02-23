export interface Pokemon {
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
  isLegendary?: boolean
}

export interface SearchHistory {
  pokemon: Pokemon
  timestamp: number
  userIp: string
}

