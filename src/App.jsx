import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useLenis, { getLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import LiquidButton from './components/ui/LiquidButton'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import ImprintPage from './pages/ImprintPage'
import DataProtectionPage from './pages/DataProtectionPage'
import HistoryFactsPage from './pages/HistoryFactsPage'
import ReferencesPage from './pages/ReferencesPage'
import QualityCertificatesPage from './pages/QualityCertificatesPage'
import CsrEsgPage from './pages/CsrEsgPage'
import PhilosophyCodePage from './pages/PhilosophyCodePage'
import ComplianceLksgPage from './pages/ComplianceLksgPage'
import SecurityAdvisoryBoardPage from './pages/SecurityAdvisoryBoardPage'
import AssociationWorkPage from './pages/AssociationWorkPage'
import OtherCompaniesPage from './pages/OtherCompaniesPage'
import GalleryPage from './pages/GalleryPage'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'

function PageTransition({ children }) {
  const location = useLocation()
  const el = useRef(null)
  const prevPath = useRef(null)

  useEffect(() => {
    if (!el.current) return

    // 1. Scroll to top immediately so getBoundingClientRect in child effects is correct
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)

    // 2. Fade-slide the page wrapper in
    gsap.fromTo(el.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'all' }
    )

    // 3. Refresh ScrollTrigger after children have mounted and registered their triggers
    const id = setTimeout(() => ScrollTrigger.refresh(), 150)

    prevPath.current = location.pathname
    return () => clearTimeout(id)
  }, [location.pathname])

  return <div ref={el} className="page-wrapper">{children}</div>
}

function AppRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/work"     element={<WorkPage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/gallery"  element={<GalleryPage />} />
        <Route path="/blog"     element={<BlogPage />} />
        <Route path="/contact"  element={<ContactPage />} />
        <Route path="/imprint"  element={<ImprintPage />} />
        <Route path="/data-protection"       element={<DataProtectionPage />} />
        <Route path="/about/history-facts"   element={<HistoryFactsPage />} />
        <Route path="/about/references"      element={<ReferencesPage />} />
        <Route path="/about/quality-certificates" element={<QualityCertificatesPage />} />
        <Route path="/about/csr-esg" element={<CsrEsgPage />} />
        <Route path="/about/philosophy-code" element={<PhilosophyCodePage />} />
        <Route path="/about/compliance-lksg" element={<ComplianceLksgPage />} />
        <Route path="/about/security-advisory-board" element={<SecurityAdvisoryBoardPage />} />
        <Route path="/about/association-work" element={<AssociationWorkPage />} />
        <Route path="/about/other-companies" element={<OtherCompaniesPage />} />
      </Routes>
    </PageTransition>
  )
}


function AppWithLenis() {
  useLenis()
  return (
    <>
      <Nav />
      <AppRoutes />
      <Footer />
      <CookieBanner />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppWithLenis />
      </BrowserRouter>
    </LanguageProvider>
  )
}
