import { useEffect, useRef, useState } from "react"
import data from "./data/image-prompts.json"
import Header from "./components/Header"
import Gallery from "./components/Gallery"
import FloatingQualityFilter from "./components/FloatingQualityFilter"

const ITEMS_PER_PAGE = 10

function getRecommendedQuality() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  if (!conn) return 1024

  if (conn.saveData) return 256
  if (["slow-2g", "2g"].includes(conn.effectiveType)) return 256
  if (conn.effectiveType === "3g") return 512

  return 1024
}


export default function App() {
  const [allPrompts, setAllPrompts] = useState([])
  const [filteredPrompts, setFilteredPrompts] = useState([])
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const [quality, setQuality] = useState(() => {
    const saved = localStorage.getItem("quality")
    return saved ? Number(saved) : getRecommendedQuality()
  })

  const preloaded = useRef(new Set())

  /* -------------------- utils -------------------- */

  const buildImageUrl = (item, q) =>
    `https://cdn.cp.adobe.io/content/2/rendition${item.img_url.replace(
      "/1024",
      `/${q}`
    )}`

  const preloadImages = (items, q) => {
    items.forEach((item) => {
      const src = buildImageUrl(item, q)
      if (preloaded.current.has(src)) return
      preloaded.current.add(src)

      const img = new Image()
      img.src = src
    })
  }

  /* -------------------- effects -------------------- */
  // auto-adjust quality based on network
  useEffect(() => {
    const conn = navigator.connection
    if (!conn) return

    const update = () => {
      if (!localStorage.getItem("quality")) {
        setQuality(getRecommendedQuality())
      }
    }

    conn.addEventListener("change", update)
    return () => conn.removeEventListener("change", update)
  }, [])


  // persist quality
  useEffect(() => {
    localStorage.setItem("quality", quality)
  }, [quality])

  // shuffle once
  useEffect(() => {
    const shuffled = [...data].sort(() => Math.random() - 0.5)
    setAllPrompts(shuffled)
    setFilteredPrompts(shuffled)

    // preload first page immediately
    preloadImages(shuffled.slice(0, ITEMS_PER_PAGE), quality)
  }, [])

  // infinite scroll with preload-ahead
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY <
        document.body.offsetHeight - 600
      )
        return

      const nextPage = page + 1
      const start = nextPage * ITEMS_PER_PAGE
      const end = start + ITEMS_PER_PAGE

      if (start >= filteredPrompts.length) return

      const nextItems = filteredPrompts.slice(start, end)

      // 🔥 preload before render
      preloadImages(nextItems, quality)

      setPage(nextPage)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [page, filteredPrompts, quality])

  /* -------------------- handlers -------------------- */

  const applyFilters = (query, q = quality) => {
    let result = allPrompts

    if (query) {
      result = result.filter(item =>
        item.prompt.toLowerCase().includes(query.toLowerCase())
      )
    }

    setFilteredPrompts(result)
    setPage(0)

    preloadImages(result.slice(0, ITEMS_PER_PAGE), q)
  }

  const handleSearch = (query) => {
    setSearchTerm(query)
    applyFilters(query)
  }

  const handleQualityChange = (value) => {
    setQuality(value)
    applyFilters(searchTerm, value)
  }

  /* -------------------- derived -------------------- */

  const visibleItems = filteredPrompts.slice(
    0,
    (page + 1) * ITEMS_PER_PAGE
  )

  /* -------------------- render -------------------- */

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
        onSearch={handleSearch}
      />
      <Gallery items={visibleItems} quality={quality} />
      <FloatingQualityFilter
        value={quality}
        onChange={handleQualityChange}
      />
    </div>
  )
}
