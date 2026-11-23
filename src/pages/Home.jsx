import { useEffect } from 'react'
import HeroSection from '../components/home/HeroSection.jsx'
import QuickAccessSection from '../components/home/QuickAccessSection.jsx'
import ServicesOverview from '../components/home/ServicesOverview.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import WhyChoose from '../components/home/WhyChoose.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import ContactPreview from '../components/home/ContactPreview.jsx'

export default function Home() {
  // Page-specific SEO metadata.
  useEffect(() => {
    document.title = 'Ultrafield Logistics Limited | Freight, Delivery & Logistics Services'
    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute(
        'content',
        'Ultrafield Logistics Limited — reliable freight, shipment handling, delivery coordination, and logistics services in Abeokuta, Ogun State, Nigeria. Book a shipment or track your parcel online.'
      )
    }
  }, [])

  return (
    <>
      {/* 1. Photographic hero */}
      <HeroSection />
      {/* 2. Shipment tracking & online payment quick access */}
      <QuickAccessSection />
      {/* 3. Services overview */}
      <ServicesOverview />
      {/* 4. How It Works */}
      <HowItWorks />
      {/* 5. Why Choose Ultrafield */}
      <WhyChoose />
      {/* 6. Customer reviews */}
      <Testimonials />
      {/* 7. Contact and location */}
      <ContactPreview />
    </>
  )
}
