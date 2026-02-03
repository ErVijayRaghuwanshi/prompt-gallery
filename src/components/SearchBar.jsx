export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
      className="
        w-80 px-4 py-2 rounded-lg
        shadow-inner outline-none
        focus:ring-2 focus:ring-indigo-400
      "
    />
  )
}
