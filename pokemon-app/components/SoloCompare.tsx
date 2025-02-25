"use client"

import React from "react"

interface Pokemon {
  name: string
  id: number
  types: string[]
  stats: Array<{ name: string; value: number }>
  height: number
  weight: number
  abilities: string[]
  sprites?: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  evolution: string
}

interface ComparisonResult {
  group1Total: number
  group2Total: number
  statName: string
}

interface SoloCompareProps {
  selectedPokemon: Pokemon[]
  comparisonResults: ComparisonResult[]
}

export const SoloCompare: React.FC<SoloCompareProps> = ({ selectedPokemon, comparisonResults }) => {
  // Sum up the stats for both Pokémon
  const totalScores = comparisonResults.reduce(
    (acc, curr) => {
      acc[0] += curr.group1Total
      acc[1] += curr.group2Total
      return acc
    },
    [0, 0]
  )

  const winner = totalScores[0] > totalScores[1] ? selectedPokemon[0] : selectedPokemon[1]

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <h3 className="text-xl font-semibold text-white mb-4">Solo Comparison</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selectedPokemon.map((p) => (
          <div
            key={p.id}
            className="bg-gray-700 rounded-lg p-2 flex items-center"
          >
            {p.sprites?.other["official-artwork"]?.front_default ? (
              <img
                src={p.sprites.other["official-artwork"].front_default}
                alt={p.name}
                className="w-16 h-16"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-500 flex items-center justify-center text-white">
                N/A
              </div>
            )}
            <div className="ml-2">
              <p className="text-white font-bold">
                {p.name} <span className="text-gray-500">#{p.id}</span>
              </p>
              <p className="text-gray-400">Type: {p.types.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-white">Stats Comparison</h4>
        {comparisonResults.map((result) => (
          <div
            key={result.statName}
            className="flex flex-col sm:flex-row justify-between items-center mb-2"
          >
            <p className="text-white capitalize w-full sm:w-auto">
              {result.statName}
            </p>
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
      <div className="bg-yellow-500 p-4 rounded-lg mt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Winner</h3>
        <div className="bg-gray-200 rounded-lg p-2 flex items-center">
          {winner.sprites?.other["official-artwork"]?.front_default ? (
            <img
              src={winner.sprites.other["official-artwork"].front_default}
              alt={winner.name}
              className="w-16 h-16"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-500 flex items-center justify-center text-white">
              N/A
            </div>
          )}
          <div className="ml-2">
            <p className="text-gray-800 font-bold">
              {winner.name} <span className="text-gray-600">#{winner.id}</span>
            </p>
            <p className="text-gray-600">Type: {winner.types.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

