export default function CopyButton({ text }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="w-full bg-green-500 hover:bg-green-600 text-white py-1 rounded"
    >
      Copy Prompt
    </button>
  )
}
