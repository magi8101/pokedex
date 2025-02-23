"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Shuffle } from "lucide-react"
import { motion } from "framer-motion"
import { usePokemon } from "@/hooks/use-pokemon"

export function PokemonSearch() {
  const [search, setSearch] = useState("")
  const { fetchPokemon, loading } = usePokemon()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      fetchPokemon(search.trim())
    }
  }

  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 898) + 1
    fetchPokemon(randomId.toString())
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading}>
          Search
        </Button>
        <Button type="button" variant="outline" onClick={handleRandom} disabled={loading} className="gap-2">
          <Shuffle className="h-4 w-4" />
          Random
        </Button>
      </form>
    </motion.div>
  )
}

