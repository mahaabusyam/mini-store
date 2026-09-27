import Hero from '../components/Hero';
import ProductsSection from '../components/ProductsSection';
import TrendingSection from '../components/TrendingSection';
import StandardBanner from '../components/StandardBanner';
import TrustFeatures from '../components/TrustFeatures';

function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <TrendingSection />
      <StandardBanner />
      <TrustFeatures />
    </>
  );
}

export default Home;