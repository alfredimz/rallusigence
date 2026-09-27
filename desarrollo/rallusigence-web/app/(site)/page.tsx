import HeroSection from '@/components/sections/HeroSection'
import GarantiasStrip from '@/components/sections/GarantiasStrip'
import PainSection from '@/components/sections/PainSection'
import PackagesSection from '@/components/sections/PackagesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ComparativaSection from '@/components/sections/ComparativaSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import DemosTeaser from '@/components/sections/DemosTeaser'
import ContactSection from '@/components/sections/ContactSection'
import IntroOverlay from '@/components/sections/IntroOverlay'
import StickyCTA from '@/components/ui/StickyCTA'

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <main id="main">
        <HeroSection />
        <GarantiasStrip />
        <PainSection />
        <PackagesSection />
        <ProcessSection />
        <ComparativaSection />
        <TestimonialsSection />
        <DemosTeaser />
        <ContactSection />
      </main>
      <StickyCTA />
    </>
  )
}
