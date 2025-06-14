"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function Search({ onSearch, placeholder = "Search..." }: SearchProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, onSearch])

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          onClick={() => setQuery("")}
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  )
}
