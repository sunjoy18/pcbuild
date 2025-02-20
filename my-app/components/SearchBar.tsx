'use client'

import { Search, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import './SearchBar.css'
import { useRouter } from 'next/navigation'

const MOCK_PRODUCTS = [
  'RTX 4090', 'RTX 4080', 'RTX 4070',
  'Gaming PC', 'Gaming Laptop', 'Gaming Monitor'
]

const SearchBar = () => {
  const [focused, setFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const router = useRouter()

  const handleCartClick = () => {
    router.push('/cart')
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.length > 0) {
      const filtered = MOCK_PRODUCTS.filter(product =>
        product.toLowerCase().includes(term.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setFocused(false)
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setFocused(false)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
  }

  return (
    <div className="search-container">
      <div className="search-layout">
        <div className={`search-wrapper ${focused ? 'focused' : ''}`}>
          <form onSubmit={handleSubmit} className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for products, brands and more..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </form>
          {focused && (suggestions.length > 0 || searchTerm.length === 0) && (
            <div className="search-suggestions">
              <div className="popular-searches">
                <h4>{searchTerm.length === 0 ? 'Popular Searches' : 'Suggestions'}</h4>
                <div className="suggestion-tags">
                  {searchTerm.length === 0 ? (
                    MOCK_PRODUCTS.map((product) => (
                      <button
                        key={product}
                        onClick={() => handleSuggestionClick(product)}
                      >
                        {product}
                      </button>
                    ))
                  ) : (
                    suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="cart-button" onClick={handleCartClick}>
          <ShoppingCart size={24} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar