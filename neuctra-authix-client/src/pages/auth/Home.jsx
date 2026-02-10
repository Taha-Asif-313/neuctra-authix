import NeuctraAuthixWorkflowSection from "../../components/landingpage/NeuctraAuthixWorkFlowSection";
import NeuctraAuthixHeroSection from "../../components/landingpage/NeuctraAuthixHeroSection";
import NeuctraAuthixFeaturesSection from "../../components/landingpage/NeuctraAuthixFeaturesSection";
import NeuctraAuthixPlatformFeaturesSection from "../../components/landingpage/NeuctraAuthixPlatformFeaturesSection";
import NeuctraAuthixTestimonialsSection from "../../components/landingpage/NeuctraAuthixTestimonialsSection";
import NeuctraAuthixCTASection from "../../components/landingpage/NeuctraAuthixCTASection";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-primary/10 text-white overflow-hidden">
      {/* Hero Section */}
      <NeuctraAuthixHeroSection />

      {/* Workflow Section */}
      <NeuctraAuthixWorkflowSection />

      {/* Features Showcase */}
      <NeuctraAuthixFeaturesSection />

      {/* Platform Features */}
      <NeuctraAuthixPlatformFeaturesSection />

      {/* Testimonials */}
      <NeuctraAuthixTestimonialsSection />

      {/* Final CTA */}
      <NeuctraAuthixCTASection />
    </div>
  );
};

export default Home;
