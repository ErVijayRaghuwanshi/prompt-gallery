import GalleryItem from "./GalleryItem"

// export default function Gallery({ items, quality }) {
//   return (
//     <main className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
//       {items.map((item, idx) => (
//         <GalleryItem key={idx} item={item} quality={quality} />
//       ))}
//     </main>
//   )
// }
export default function Gallery({ items, quality }) {
  return (
    <main
      className="
        columns-2
        md:columns-3
        lg:columns-4
        gap-4
        px-6
      "
    >
      {items.map((item, idx) => (
        <div key={idx} className="mb-4 break-inside-avoid">
          <GalleryItem item={item} quality={quality} />
        </div>
      ))}
    </main>
  )
}
