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
import { useTheme } from "../../contexts/useTheme";

const Home = () => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-black" : "bg-[#faf9f7]"}`}>
      <Navbar />
      <Hero />
      <div className={`transition-colors duration-500 ${isDark ? "bg-black" : "bg-[#faf9f7]"}`}>
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
