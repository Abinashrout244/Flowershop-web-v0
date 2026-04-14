import NavHeader from "./NavHeader";
import CategoryStrip from "./CategoryStrip";
import HeroCarousel from "./HeroCarousel";
import BestsellingBlooms from "./BestsellingBlooms";
import SummerBanner from "./SummerBanner";
import WorldwideDelivery from "./WorldwideDelivery";
import SoftSentiments from "./SoftSentiments";
import CuratedCollections from "./CuratedCollections";
import InTheSpotlight from "./InTheSpotlight";
import BrandStory from "./BrandStory";
import AsSeenOn from "./AsSeenOn";
import CustomerReviews from "./CustomerReviews";
import ContentSection from "./ContentSection";
import FlowerFooter from "./FlowerFooter";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* ── Navigation ── */}
      <NavHeader />

      {/* ── Category Strip ── */}
      <CategoryStrip />

      {/* ── Hero Carousel ── */}
      <HeroCarousel />

      {/* ── Bestselling Blooms ── */}
      <BestsellingBlooms />

      {/* ── Summer Blooms Banner ── */}
      <SummerBanner />

      {/* ── Worldwide Delivery ── */}
      <WorldwideDelivery />

      {/* ── Soft Sentiments ── */}
      <SoftSentiments />

      {/* ── Curated Collections ── */}
      <CuratedCollections />

      {/* ── In The Spotlight ── */}
      <InTheSpotlight />

      {/* ── Brand Story ── */}
      <BrandStory />

      {/* ── As Seen On ── */}
      <AsSeenOn />

      {/* ── Customer Reviews ── */}
      <CustomerReviews />

      {/* ── Content / SEO Text ── */}
      <ContentSection />

      {/* ── Footer ── */}
      <FlowerFooter />
    </div>
  );
};

export default HomePage;
