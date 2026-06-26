import Navbar from './landing/Navbar';
import HeroSection from './landing/HeroSection';
import AboutSection from './landing/AboutSection';
import ActivitiesSection from './landing/ActivitiesSection';
import StatsAndEvents from './landing/StatsAndEvents';
import GalleryAndTestimonials from './landing/GalleryAndTestimonials';
import ContactAndFooter from './landing/ContactAndFooter';

const LandingPage = () => (
  <div className="font-sans overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ActivitiesSection />
    <StatsAndEvents />
    <GalleryAndTestimonials />
    <ContactAndFooter />
  </div>
);

export default LandingPage;
