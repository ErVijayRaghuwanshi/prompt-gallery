const QUALITY_OPTIONS = [
  { label: "HQ", value: 1024 },
  { label: "Medium", value: 512 },
  { label: "Small", value: 256 },
  { label: "Extra Small", value: 128 },
]

export default function QualityFilter({ value, onChange }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {QUALITY_OPTIONS.map(({ label, value: q }) => {
        const isActive = value === q

        return (
          <button
            key={q}
            onClick={() => onChange(q)}
            className={`
              px-4 py-1 rounded-full text-sm font-medium transition
              ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
