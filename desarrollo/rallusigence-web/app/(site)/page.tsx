import HeroSection from '@/components/sections/HeroSection'
import PainSection from '@/components/sections/PainSection'
import PackagesSection from '@/components/sections/PackagesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import DiffSection from '@/components/sections/DiffSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import IntroOverlay from '@/components/sections/IntroOverlay'
import StickyCTA from '@/components/ui/StickyCTA'

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <main id="main">
        <HeroSection />
        <PainSection />
        <PackagesSection />
        <ProcessSection />
        <DiffSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <StickyCTA />
    </>
  )
}