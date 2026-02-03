const examples = [
  "Sunset",
  "Mountains",
  "Fantasy",
  "Forest",
  "Cyberpunk",
  "Retro",
  "Geometric",
]

export default function SearchExamples({ onSearch }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {examples.map((item) => (
        <button
          key={item}
          onClick={() => onSearch(item)}
          className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
        >
          {item}
        </button>
      ))}
    </div>
  )
}
