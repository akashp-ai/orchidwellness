import AnnouncementBar  from "./components/AnnouncementBar";
import Navigation       from "./components/Navigation";
import Hero             from "./components/Hero";
import IntroBanner      from "./components/IntroBanner";
import OffersSection    from "./components/OffersSection";
import ServicesSection  from "./components/ServicesSection";
import CtaBanner        from "./components/CtaBanner";
import Testimonials     from "./components/Testimonials";
import FounderSection   from "./components/FounderSection";
import GallerySection   from "./components/GallerySection";
import ContactSection   from "./components/ContactSection";
import Footer           from "./components/Footer";
import MobileCTA        from "./components/MobileCTA";
import InquiryWidget    from "./components/InquiryWidget";

export default function Home() {
  return (
    <>
      {/* Announcement bar sits above the sticky nav */}
      <AnnouncementBar />

      <Navigation />

      <main>
        <Hero />
        <IntroBanner />
        <OffersSection />
        <ServicesSection />
        <CtaBanner />
        <Testimonials />
        <FounderSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />

      {/* Sticky mobile bottom bar — hidden on md+ */}
      <MobileCTA />

      {/* Floating inquiry widget */}
      <InquiryWidget />

      {/* Bottom padding on mobile so content isn't hidden behind the CTA bar */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
