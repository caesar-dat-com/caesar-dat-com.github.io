import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative bg-bg-500/55 border border-primary-600 notch-clip p-2 overflow-hidden">
      <span className="absolute -right-1.5 bottom-[5px] w-[22.6px] h-[3px] -rotate-45 bg-primary-600" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="python, power bi, QA, ..."
        autoComplete="off"
        className="w-full border-0 outline-none bg-transparent text-primary-200 font-[var(--font-primary)] text-base tracking-wider min-w-0"
        autoFocus
      />
    </form>
  )
}