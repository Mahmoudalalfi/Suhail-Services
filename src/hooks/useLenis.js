import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function getLenis() {
  return lenisInstance
}

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 1.5,
    })

    lenisInstance = lenis

    // Tell ScrollTrigger to use Lenis's scroll position, not window.scrollY
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    })

    lenis.on('scroll', () => ScrollTrigger.update())

    const rafFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      ScrollTrigger.scrollerProxy(document.body, null)
      lenis.destroy()
      lenisInstance = null
      gsap.ticker.remove(rafFn)
    }
  }, [])
}
