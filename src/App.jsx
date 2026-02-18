import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroCanvas from './components/HeroCanvas';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import GenericPage from './components/GenericPage';
import TravelPage from './components/TravelPage';
import ServicePage from './components/ServicePage';
import HomePage from './components/HomePage';
import GalleryPage from './components/GalleryPage'; // Added GalleryPage import
import ContactPage from './components/ContactPage'; // Added ContactPage import
import JournalPage from './components/JournalPage'; // Added JournalPage import

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const lenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Router>
        <div className="bg-[#0c0c0c] min-h-screen text-white selection:bg-white selection:text-black font-sans">
          <Header />
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/journal" element={<JournalPage />} /> {/* Added JournalPage route */}
            <Route path="/about" element={<GenericPage title="About Us" subtitle="Our Story" image="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2670&auto=format&fit=crop" />} />
            <Route path="/dates" element={<GenericPage title="Availability" subtitle="Plan Your Visit" image="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop" />} />
            <Route path="/services" element={<TravelPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/ceramic-coating" element={
              <ServicePage
                title="Ceramic Coating"
                subtitle="Ultimate Protection"
                heroImage="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2670&auto=format&fit=crop"
                description="Shield your vehicle's paint with our premium ceramic coating packages. Experience unmatched gloss, hydrophobicity, and long-term protection against the elements."
                features={[
                  { title: "Hardness", desc: "9H+ Durability" },
                  { title: "Hydrophobic", desc: "Water Beading" },
                  { title: "Gloss", desc: "Deep Wet Look" },
                  { title: "Warranty", desc: "Multi-year Protection" }
                ]}
              />
            } />
            <Route path="/paint-correction" element={
              <ServicePage
                title="Paint Correction"
                subtitle="Flawless Finish"
                heroImage="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2574&auto=format&fit=crop"
                description="Remove swirls, scratches, and oxidation to reveal the true potential of your paintwork. Our multi-stage correction process restores clarity and depth to showroom standards."
                features={[
                  { title: "Restoration", desc: "Defect Removal" },
                  { title: "Clarity", desc: "Zero Haze" },
                  { title: "Depth", desc: "Mirror Finish" },
                  { title: "Precision", desc: "Machine Polished" }
                ]}
              />
            } />
            <Route path="/interior-detailing" element={
              <ServicePage
                title="Interior Detailing"
                subtitle="Cabin Comfort"
                heroImage="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2574&auto=format&fit=crop"
                description="Revitalize your vehicle's interior. We deep clean, condition, and protect every surface, from fine leather to carpets, ensuring a hygienic and luxurious driving environment."
                features={[
                  { title: "Deep Clean", desc: "Steam Extraction" },
                  { title: "Leather", desc: "Condition & Protect" },
                  { title: "Sanitize", desc: "Bacteria Removal" },
                  { title: "Odor", desc: "Ozone Treatment" }
                ]}
              />
            } />
            <Route path="/maintenance-wash" element={
              <ServicePage
                title="Maintenance Wash"
                subtitle="Regular Care"
                heroImage="https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=2670&auto=format&fit=crop"
                description="Keep your vehicle looking its best with our regular maintenance washes. Safe techniques and premium products prevent swirls and maintain your coating's performance."
                features={[
                  { title: "Safe Wash", desc: "Two-Bucket Method" },
                  { title: "Wheels", desc: "Deep Clean" },
                  { title: "Interior", desc: "Quick Spruce-Up" },
                  { title: "Protection", desc: "Spray Scalant" }
                ]}
              />
            } />
            <Route path="/contact" element={<ContactPage />} /> {/* Changed to ContactPage */}
            <Route path="/support" element={<GenericPage title="Support" subtitle="We're Here to Help" image="https://images.unsplash.com/photo-1557992260-ec58e38d363c?q=80&w=2574&auto=format&fit=crop" />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </ReactLenis>
  )
}

export default App
