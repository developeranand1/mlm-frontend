import AboutCard from "@/components/about-us/AboutCard";
import AboutDetail from "@/components/about-us/AboutDetail";
import WhyChooseCard from "@/components/about-us/WhyChooseCard";
import HomeBanner from "@/components/home/HomeBanner";
export const metadata = {
  title: "About Us | Old As Gold",
  description:
    "Old As Gold is your trusted destination for premium-quality wellness products like alkaline water bottles. Learn about our mission, values, and business model.",
  keywords: ["Old As Gold", "alkaline water bottle", "wellness", "network marketing", "affiliate"],
  openGraph: {
    title: "About Us | Old As Gold",
    description:
      "Premium-quality wellness products designed to enhance lifestyle and well-being. Explore our mission and business model.",
    type: "website",
  },
};

export default function AboutUS() {
  return (
    <>
      <HomeBanner></HomeBanner>
      <AboutDetail />
      <AboutCard></AboutCard>
      <WhyChooseCard/>
    </>
  );
}
