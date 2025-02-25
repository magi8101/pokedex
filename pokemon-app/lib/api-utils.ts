// Add retry logic and better error handling for API calls
export async function fetchWithRetry(url: string, maxRetries = 3, delay = 1000) {
  let lastError

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
      }

      return await response.json()
    } catch (error) {
      lastError = error

      // Only delay if we're going to retry
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)))
      }
    }
  }

  throw lastError
}

// Cache responses to avoid hitting rate limits
const cache = new Map()

export async function fetchPokemonWithCache(id: number) {
  const cacheKey = `pokemon-${id}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  try {
    const data = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = {
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
      isLegendary: false,
    }

    cache.set(cacheKey, pokemon)
    return pokemon
  } catch (error) {
    console.error(`Failed to fetch Pokemon ${id}:`, error)
    throw error
  }
}

