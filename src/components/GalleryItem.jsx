import CopyButton from "./CopyButton"

export default function GalleryItem({ item, quality }) {
  const imageUrl = `https://cdn.cp.adobe.io/content/2/rendition${item.img_url.replace(
    "/1024",
    `/${quality}`
  )}`

  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-100">
      <img
        src={imageUrl}
        alt={item.prompt}
        loading="lazy"
        className="
          w-full
          h-auto
          object-contain
          block
        "
      />

      <div
        className="
          absolute inset-x-0 bottom-0
          bg-black/70 text-white p-3
          translate-y-full
          hover:translate-y-0
          transition-transform duration-300
        "
      >
        <p className="text-sm mb-2 line-clamp-3">
          {item.prompt}
        </p>
        <CopyButton text={item.prompt} />
      </div>
    </div>
  )
}
