'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for &ldquo;{query}&rdquo;</h1>
      {/* Add your search results component here */}
    </div>
  )
} 