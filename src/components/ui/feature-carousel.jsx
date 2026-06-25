import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

function useCarouselMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return mobile
}
import { useLanguage } from "../../i18n/LanguageContext";

const SUB_IMAGES = {
  "retail-supermarket-service":     "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1400",
  "cleaning-building-services":     "https://res.cloudinary.com/df7aiznm6/image/upload/v1782331386/Cleaning_and_Building_services_sktlvm.jpg",
  "driver-services-staffing":       "https://res.cloudinary.com/df7aiznm6/image/upload/v1782329210/Driver_Services_Staffing_xibcaw.png",
  "construction-trades":            "https://res.cloudinary.com/df7aiznm6/image/upload/v1782329210/Construction_Trades_p2wisz.png",
  "electrical-technical-services":  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400",
  "facility-management":            "https://res.cloudinary.com/df7aiznm6/image/upload/v1782329252/Facility_Management_cuor3m.png",
  "inventory-control":              "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1400",
  "garden-outdoor-services":        "https://res.cloudinary.com/df7aiznm6/image/upload/v1782329210/Garden_Outdoor_Services_gxgsrb.png",
  "assembly-disassembly":           "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400",
  "food-service-events":            "https://res.cloudinary.com/df7aiznm6/image/upload/v1782329210/Food_Service_Events_a2mryf.jpg",
  "staffing-services":              "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1400",
  "hotel-services":                 "https://res.cloudinary.com/df7aiznm6/image/upload/v1782329213/Hotel_Services_ur9iqp.jpg",
  "transportation-moving-services": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1400",
  "property-management-services":   "https://res.cloudinary.com/df7aiznm6/image/upload/v1782329212/Property_Management_Services_nlwmvv.jpg",
  "kitchen-dishwashing-services":   "https://res.cloudinary.com/df7aiznm6/image/upload/v1782329212/Kitchen_Dishwashing_Services_kmmv1f.jpg",
};

const FALLBACKS = [
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1400",
  "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1400",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1400",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1400",
];

const CAT_COLORS = ["#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C", "#C9A84C"];
const AUTO_MS = 3800;

function TabBar({ categories, catIdx, accent, isMobile, onSelect }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft]   = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateArrows()
    el.addEventListener("scroll", updateArrows, { passive: true })
    window.addEventListener("resize", updateArrows)
    return () => {
      el.removeEventListener("scroll", updateArrows)
      window.removeEventListener("resize", updateArrows)
    }
  }, [updateArrows])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 240, behavior: "smooth" })
  }

  const arrowStyle = (visible) => ({
    position: "absolute", top: 0, bottom: 0,
    width: 36, zIndex: 3,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(255,255,255,0.95)",
    border: "none", cursor: visible ? "pointer" : "default",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transition: "opacity 0.2s",
    fontSize: 16, fontWeight: 700, color: "#333",
  })

  return (
    <div style={{ position: "relative", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      {/* Left arrow */}
      <button style={{ ...arrowStyle(canScrollLeft), left: 0 }} onClick={() => scroll(-1)}>‹</button>

      {/* Scrollable tab strip */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          paddingLeft: canScrollLeft ? 36 : 0,
          paddingRight: canScrollRight ? 36 : 0,
          transition: "padding 0.2s",
        }}
      >
        {categories.map((c, i) => {
          const active = i === catIdx
          return (
            <button
              key={c.key}
              onClick={() => onSelect(i)}
              style={{
                flex: "0 0 auto",
                padding: isMobile ? "14px 16px" : "18px 20px",
                border: "none", background: "transparent",
                cursor: "pointer", position: "relative",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.03)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent" }}
            >
              <span style={{
                display: "block",
                fontSize: isMobile ? 11 : "clamp(10px, 1.1vw, 12px)",
                fontWeight: active ? 700 : 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: active ? "#0a0a0a" : "rgba(0,0,0,0.35)",
                transition: "color 0.2s",
              }}>
                {c.label}
              </span>
              {active && (
                <motion.div
                  layoutId="tab-underline"
                  style={{
                    position: "absolute", bottom: -1, left: 0, right: 0,
                    height: 3, background: accent, borderRadius: "3px 3px 0 0",
                    pointerEvents: "none",
                  }}
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Right arrow */}
      <button style={{ ...arrowStyle(canScrollRight), right: 0 }} onClick={() => scroll(1)}>›</button>
    </div>
  )
}

export function FeatureCarousel({ servicesList, openCategoryIndex }) {
  const { t } = useLanguage();

  const categories = (servicesList || []).map((s, i) => {
    const firstSlug = s.items?.[0]?.slug || "";
    return {
      key:      firstSlug || `cat-${i}`,
      label:    (s.category || s.name || "").replace("\n", " "),
      desc:     s.desc || "",
      color:    CAT_COLORS[i % CAT_COLORS.length],
      fallback: FALLBACKS[i % FALLBACKS.length],
      items:    (s.items || []).map(item => ({
        ...item,
        image: SUB_IMAGES[item.slug] || FALLBACKS[i % FALLBACKS.length],
      })),
    };
  });

  const isMobile = useCarouselMobile();
  const [catIdx, setCatIdx] = useState(() => typeof openCategoryIndex === "number" ? openCategoryIndex : 0);
  const [cur, setCur]       = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovItem, setHovItem] = useState(null);

  const cat   = categories[catIdx] || categories[0];
  const items = cat?.items || [];
  const len   = items.length;
  const accent = cat.color;
  const displayItem = hovItem !== null ? items[hovItem] : items[cur];

  useEffect(() => {
    if (typeof openCategoryIndex === "number") setCatIdx(openCategoryIndex);
  }, [openCategoryIndex]);

  useEffect(() => { setCur(0); setHovItem(null); }, [catIdx]);

  useEffect(() => {
    if (paused || len <= 1) return;
    const id = setInterval(() => setCur(c => (c + 1) % len), AUTO_MS);
    return () => clearInterval(id);
  }, [paused, len, catIdx]);

  return (
    <div
      style={{ padding: "0 clamp(16px, 3vw, 48px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); setHovItem(null); }}
    >
      {/* ── Category tab bar ── */}
      <TabBar
        categories={categories}
        catIdx={catIdx}
        accent={accent}
        isMobile={isMobile}
        onSelect={(i) => { setCatIdx(i); setPaused(false); }}
      />

      {/* ── Main stage ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={catIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            height: isMobile ? "auto" : 560,
          }}
        >
          {/* LEFT — big typography + image */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            background: "#0a0a0a",
            minHeight: isMobile ? 320 : "auto",
          }}>
            {/* BG image cross-fade */}
            <AnimatePresence mode="sync">
              <motion.div
                key={displayItem?.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${displayItem?.image || cat.fallback})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                }}
              />
            </AnimatePresence>

            {/* Strong gradient so text pops */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)",
            }} />

            {/* Giant category number */}
            <div style={{
              position: "absolute", top: 24, right: 28,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(80px, 10vw, 140px)",
              fontWeight: 900,
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: `1px ${accent}33`,
              letterSpacing: "-0.04em",
              userSelect: "none",
              pointerEvents: "none",
            }}>
              {String(catIdx + 1).padStart(2, "0")}
            </div>

            {/* Bottom content */}
            <div style={{
              position: "absolute", inset: "auto 0 0 0",
              padding: "clamp(24px, 3vw, 40px)",
            }}>
              {/* Accent tag */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: accent,
                borderRadius: 6, padding: "4px 12px",
                marginBottom: 14,
              }}>
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "#000",
                }}>
                  {cat.label}
                </span>
              </div>

              {/* Active service name */}
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`${catIdx}-${displayItem?.slug}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontSize: "clamp(22px, 2.8vw, 38px)",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    margin: "0 0 10px",
                  }}
                >
                  {displayItem?.name || cat.label}
                </motion.h2>
              </AnimatePresence>

              <p style={{
                fontSize: 12, color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6, margin: "0 0 20px",
                maxWidth: 340,
              }}>
                {cat.desc}
              </p>

              {/* Progress + count */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: accent, letterSpacing: "0.1em", fontFamily: "monospace",
                }}>
                  {String((hovItem ?? cur) + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
                </span>
                <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.12)", borderRadius: 2, overflow: "hidden" }}>
                  <motion.div
                    animate={{ width: `${((hovItem ?? cur) + 1) / len * 100}%` }}
                    transition={{ duration: 0.35 }}
                    style={{ height: "100%", background: accent, borderRadius: 2 }}
                  />
                </div>
                {displayItem?.slug && (
                  <Link
                    to={`/services/${displayItem.slug}`}
                    style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: accent,
                      textDecoration: "none", display: "flex", alignItems: "center", gap: 4,
                      flexShrink: 0,
                    }}
                  >
                    Explore →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — numbered list */}
          <div style={{
            background: "#fff",
            display: "flex", flexDirection: "column",
            overflow: isMobile ? "visible" : "hidden",
            height: isMobile ? "auto" : "100%",
          }}>
            <div style={{ flex: 1, overflowY: isMobile ? "visible" : "auto", display: "flex", flexDirection: "column" }}>
            {items.map((item, idx) => {
              const isActive = hovItem === idx || (hovItem === null && cur === idx);
              return (
                <MotionLink
                  key={item.slug}
                  to={`/services/${item.slug}`}
                  onMouseEnter={() => setHovItem(idx)}
                  onMouseLeave={() => setHovItem(null)}
                  style={{
                    display: "flex", alignItems: "center",
                    padding: isMobile ? "16px clamp(16px, 4vw, 24px)" : "0 clamp(20px, 3vw, 40px)",
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                    cursor: "pointer",
                    background: isActive ? accent : "transparent",
                    transition: "background 0.18s",
                    flex: isMobile ? "0 0 auto" : 1,
                    minHeight: isMobile ? 56 : 0,
                    gap: 16,
                    textDecoration: "none",
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(26px, 2.8vw, 40px)",
                    fontWeight: 900,
                    color: isActive ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.07)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    flexShrink: 0,
                    transition: "color 0.18s",
                    userSelect: "none",
                    minWidth: "clamp(36px, 3.5vw, 52px)",
                  }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Name */}
                  <span style={{
                    flex: 1,
                    fontSize: "clamp(13px, 1.3vw, 16px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: isActive ? "#000" : "#1a1a1a",
                    transition: "color 0.18s",
                  }}>
                    {item.name}
                  </span>

                  {/* Arrow */}
                  <motion.span
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : -6,
                    }}
                    transition={{ duration: 0.15 }}
                    style={{
                      fontSize: 16, color: "#000", fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    →
                  </motion.span>
                </MotionLink>
              );
            })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default FeatureCarousel;
