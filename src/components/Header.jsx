import SearchBar from "./SearchBar"
import SearchExamples from "./SearchExamples"

export default function Header({
  onSearch
}) {
  return (
    <header className="text-center my-6">
      <h1 className="text-2xl font-bold mb-4">
        Prompt Gallery – Interactive Image Search
      </h1>

      <SearchBar onSearch={onSearch} />
      <SearchExamples onSearch={onSearch} />
    </header>
  )
}
