import { MainLayout } from "@/components/main-layout"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainLayout>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </MainLayout>
      <Footer />
    </div>
  )
}
