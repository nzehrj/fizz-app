'use client'

import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

interface SearchProps {
  categories: string[]
  translations: {
    all: string
    searchPlaceholder: string
  }
}

export default function Search({ categories, translations }: SearchProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      {/* Desktop Search Form - always visible on md+ screens */}
      <form
        action="/search"
        method="GET"
        className="hidden md:flex items-stretch h-8 md:w-96"
        onSubmit={() => {
          console.log('Desktop form submitted');
          // Let the form submit naturally
        }}
      >
        <Select name="category">
          <SelectTrigger className="w-20 h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none text-xs px-2">
            <SelectValue placeholder={translations.all} />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">{translations.all}</SelectItem>
            {categories.map((category: string) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className="flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-sm h-full px-2"
          placeholder={translations.searchPlaceholder}
          name="q"
          type="search"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-2"
        >
          <SearchIcon className="w-4 h-4" />
        </button>
      </form>

      {/* Mobile Search Icon - only visible on small screens */}
      <div className="md:hidden relative">
        <button
          type="button"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 text-white hover:bg-gray-700 rounded-md transition-colors"
          aria-label="Toggle search"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
        
        {/* Mobile Search Form Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-lg rounded-md border z-50">
            <div className="p-3">
              <div className="flex flex-col gap-2">
                {/* Simple mobile search - just search input */}
                <form 
                  action="/search" 
                  method="GET" 
                  className="flex gap-1"
                  onSubmit={() => {
                    console.log('Mobile form submitted');
                    setIsSearchOpen(false);
                  }}
                >
                  <input
                    type="hidden"
                    name="category"
                    value="all"
                  />
                  <Input
                    className="flex-1 dark:border-gray-200 bg-gray-100 text-black text-sm"
                    placeholder={translations.searchPlaceholder}
                    name="q"
                    type="search"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground text-black px-3 py-2 rounded-md hover:opacity-90"
                  >
                    <SearchIcon className="w-4 h-4" />
                  </button>
                </form>
                
                {/* Category selector as separate form for mobile */}
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-600 mb-1">Or browse by category:</p>
                  <div className="flex flex-wrap gap-1">
                    {categories.slice(0, 6).map((category: string) => (
                      <a
                        key={category}
                        href={`/search?category=${encodeURIComponent(category)}&q=all`}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-black"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Overlay to close search when clicking outside */}
        {isSearchOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsSearchOpen(false)}
          />
        )}
      </div>
    </>
  )
}