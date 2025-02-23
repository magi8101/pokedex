"use client"

import Link from "next/link"
import { Book, Home, Swords, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Pokédex</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/pokedex"
              className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2"
            >
              <Book className="h-4 w-4" />
              Pokédex
            </Link>
            <Link
              href="/abilities"
              className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Abilities
            </Link>
            <Link
              href="/types"
              className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2"
            >
              <Swords className="h-4 w-4" />
              Type Matchups
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

