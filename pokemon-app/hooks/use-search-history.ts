"use client"

import { useState, useEffect } from "react"
import type { Pokemon, SearchHistory } from "@/lib/types"

const MAX_HISTORY_ITEMS = 5

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [userIp, setUserIp] = useState<string>("")

  useEffect(() => {
    // Load search history from localStorage
    const loadHistory = () => {
      const savedHistory = localStorage.getItem("pokemonSearchHistory")
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory))
      }
    }

    // Fetch user's IP
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json")
        const data = await response.json()
        setUserIp(data.ip)
      } catch (error) {
        console.error("Failed to fetch IP:", error)
      }
    }

    loadHistory()
    fetchIp()
  }, [])

  const addToHistory = (pokemon: Pokemon) => {
    const newEntry: SearchHistory = {
      pokemon,
      timestamp: Date.now(),
      userIp: userIp,
    }

    setSearchHistory((prev) => {
      // Filter out duplicate searches for the same Pokémon
      const filtered = prev.filter((item) => item.pokemon.id !== pokemon.id)
      // Add new entry at the beginning and limit to MAX_HISTORY_ITEMS
      const updated = [newEntry, ...filtered].slice(0, MAX_HISTORY_ITEMS)
      // Save to localStorage
      localStorage.setItem("pokemonSearchHistory", JSON.stringify(updated))
      return updated
    })
  }

  const getHistoryByIp = (ip: string) => {
    return searchHistory.filter((item) => item.userIp === ip)
  }

  return {
    searchHistory,
    userIp,
    addToHistory,
    getHistoryByIp,
  }
}

