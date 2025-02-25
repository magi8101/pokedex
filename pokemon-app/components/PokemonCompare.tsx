"use client"

import React, { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

interface Pokemon {
  name: string
  id: number
  types: string[]
  stats: Array<{ name: string; value: number }>
  height: number
  weight: number
  abilities: string[]
  sprites?: {
    other: { "official-artwork": { front_default: string } }
  }
  evolution: string
}

interface ComparisonResult {
  statName: string
  group1Total: number
  group2Total: number
}

interface PokemonCompareProps {
  group1: Pokemon[]
  group2: Pokemon[]
  comparisonResults: ComparisonResult[]
  // Optional delete handler--group is 0 for group1 and 1 for group2.
  onDelete?: (pokemonId: number, group: number) => void
}

/*
  PokemonCompare is a component that displays two groups of Pokémon along with a stats comparison.
  It allows for deletion of a Pokémon from either group.
  
  If an onDelete function is provided via props, it will be called when a delete action is triggered.
  Otherwise, the component maintains its own local state to allow deletion.
  
  This component supports adding Pokémon externally (via props), and deletion from groups.
*/
export const PokemonCompare: React.FC<PokemonCompareProps> = ({
  group1,
  group2,
  comparisonResults,
  onDelete,
}) => {
  // Local state copies allow internal updates (i.e. deletion) if no onDelete prop is provided.
  const [localGroup1, setLocalGroup1] = useState<Pokemon[]>(group1)
  const [localGroup2, setLocalGroup2] = useState<Pokemon[]>(group2)

  // Update local state if props change.
  useEffect(() => {
    setLocalGroup1(group1)
  }, [group1])

  useEffect(() => {
    setLocalGroup2(group2)
  }, [group2])

  // Handle deletion for a Pokémon. If onDelete prop exists, delegate to parent; otherwise, update local state.
  const handleDelete = (pokemonId: number, group: number) => {
    if (onDelete) {
      onDelete(pokemonId, group)
    } else {
      if (group === 0) {
        setLocalGroup1((prev) => prev.filter((pokemon) => pokemon.id !== pokemonId))
      } else {
        setLocalGroup2((prev) => prev.filter((pokemon) => pokemon.id !== pokemonId))
      }
    }
  }

  // Compute overall scores for each group by summing up the stat totals.
  const [computedGroup1Overall, computedGroup2Overall] = comparisonResults.reduce(
    (acc, curr) => {
      acc[0] += curr.group1Total
      acc[1] += curr.group2Total
      return acc
    },
    [0, 0]
  )

  // Determine the winning group based on overall scores.
  const winningGroup: Pokemon[] =
    computedGroup1Overall > computedGroup2Overall ? localGroup1 : localGroup2

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <h3 className="text-xl font-semibold text-white mb-4">Group Comparison</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Display Group 1 */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Group 1</h4>
          {localGroup1.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-gray-700 rounded-lg p-2 mb-2 flex items-center justify-between"
            >
              <div className="flex items-center">
                {pokemon.sprites?.other["official-artwork"]?.front_default ? (
                  <img
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-500 flex items-center justify-center text-white">
                    N/A
                  </div>
                )}
                <div className="ml-2">
                  <p className="text-white font-bold">
                    {pokemon.name} <span className="text-gray-500">#{pokemon.id}</span>
                  </p>
                  <p className="text-gray-400">Type: {pokemon.types.join(", ")}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(pokemon.id, 0)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        {/* Display Group 2 */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Group 2</h4>
          {localGroup2.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-gray-700 rounded-lg p-2 mb-2 flex items-center justify-between"
            >
              <div className="flex items-center">
                {pokemon.sprites?.other["official-artwork"]?.front_default ? (
                  <img
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-500 flex items-center justify-center text-white">
                    N/A
                  </div>
                )}
                <div className="ml-2">
                  <p className="text-white font-bold">
                    {pokemon.name} <span className="text-gray-500">#{pokemon.id}</span>
                  </p>
                  <p className="text-gray-400">Type: {pokemon.types.join(", ")}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(pokemon.id, 1)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Display stat comparisons */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-white">Stats Comparison</h4>
        {comparisonResults.map((result) => (
          <div
            key={result.statName}
            className="flex flex-col sm:flex-row justify-between items-center mb-2"
          >
            <p className="text-white capitalize w-full sm:w-auto">{result.statName}</p>
            <div className="w-full sm:w-auto flex-1 mx-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                <div
                  className="bg-blue-500 h-2.5 rounded-full absolute"
                  style={{
                    width: `${Math.min(
                      (result.group1Total / (result.group1Total + result.group2Total)) * 100,
                      100
                    )}%`,
                  }}
                ></div>
                <div
                  className="bg-red-500 h-2.5 rounded-full absolute"
                  style={{
                    width: `${Math.min(
                      (result.group2Total / (result.group1Total + result.group2Total)) * 100,
                      100
                    )}%`,
                    left: `${Math.min(
                      (result.group1Total / (result.group1Total + result.group2Total)) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
            <p className="text-white w-full sm:w-auto text-right">
              {result.group1Total} vs {result.group2Total}
            </p>
          </div>
        ))}
      </div>
      {/* Display the entire winning group */}
      <div className="bg-yellow-500 p-4 rounded-lg mt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Winning Group</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {winningGroup.map((pokemon) => (
            <div key={pokemon.id} className="bg-gray-200 rounded-lg p-2 flex items-center">
              {pokemon.sprites?.other["official-artwork"]?.front_default ? (
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-500 flex items-center justify-center text-white">
                  N/A
                </div>
              )}
              <div className="ml-2">
                <p className="text-gray-800 font-bold">
                  {pokemon.name} <span className="text-gray-600">#{pokemon.id}</span>
                </p>
                <p className="text-gray-600">Type: {pokemon.types.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

