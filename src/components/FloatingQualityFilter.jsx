import { useState } from "react"

const OPTIONS = [
  { label: "HQ", value: 1024 },
  { label: "Med", value: 512 },
  { label: "Sm", value: 256 },
  { label: "XS", value: 128 },
]

export default function FloatingQualityFilter({
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false)
  const active = OPTIONS.find(o => o.value === value)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-white shadow-lg rounded-full px-3 py-2">

        {open && (
          <div className="flex gap-1">
            {OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className={`
                  px-2 py-1 rounded-full text-xs
                  ${value === o.value
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"}
                `}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="px-2 py-1 rounded-full bg-indigo-600 text-white text-xs"
        >
          {active?.label ?? "HQ"}
        </button>
      </div>
    </div>
  )
}
