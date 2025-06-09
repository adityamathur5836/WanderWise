import CallToAction from "./components/CallToAction/calltoaction";
import FeaturedDestinations from "./components/FeaturedDestination/featureddestination";
import Footer from "./components/Footer/footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/navbar";
import TestimonialsSection from "./components/Testimonials/testimonials";
import WhyChooseUs from "./components/WhyChooseUs/whychooseus";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedDestinations />
      <WhyChooseUs />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
