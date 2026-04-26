import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/home/landing/Hero";
import CategoryStrip from "../../components/home/CategoryStrip/CategoryStrip";
import BestsellingBlooms from "../../components/home/BestsellingBlooms/BestsellingBlooms";
import SummerBanner from "../../components/home/SummerBanner/SummerBanner";
import WorldwideDelivery from "../../components/home/WorldwideDelivery/WorldwideDelivery";
import SoftSentiments from "../../components/home/SoftSentiments/SoftSentiments";
import CuratedCollections from "../../components/home/CuratedCollections/CuratedCollections";
import InTheSpotlight from "../../components/home/InTheSpotlight/InTheSpotlight";
import BrandStory from "../../components/home/BrandStory/BrandStory";
import AsSeenOn from "../../components/home/AsSeenOn/AsSeenOn";
import CustomerReviews from "../../components/home/CustomerReviews/CustomerReviews";
import ContentSection from "../../components/home/ContentSection/ContentSection";
import Footer from "../../components/layout/Footer/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/*
        Navbar is route-aware:
        - on "/" → floating glass pill (renders over dark hero, no spacer needed)
        - on other pages → classic white header with spacer
      */}
      <Navbar />

      {/* Full-viewport cinematic hero with its own glass nav inside */}
      <Hero />

      {/* Shop sections — start immediately after hero */}
      <div className="bg-[#faf9f7]">
        <CategoryStrip />
        <BestsellingBlooms />
        <SummerBanner />
        <WorldwideDelivery />
        <SoftSentiments />
        <CuratedCollections />
        <InTheSpotlight />
        <BrandStory />
        <AsSeenOn />
        <CustomerReviews />
        <ContentSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
