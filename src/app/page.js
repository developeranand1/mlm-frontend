import Image from "next/image";
import styles from "./page.module.css";
import HomeBanner from "@/components/home/HomeBanner";
import CountryList from "@/components/home/CountryList";
import FeatureProduct from "@/components/home/FeatureProduct";
import JoinCommunity from "@/components/join-community/JoinCommunity";
import ProductList from "@/components/home/ProductList";
import Achievements from "@/components/Achievements/Achievements";
import FaqSection from "@/components/home/FaqSection";
import WhyChoose from "@/components/WhyChoose/WhyChoose";

export default function Home() {
  return (
    <>
      <HomeBanner></HomeBanner>
      <JoinCommunity />
      <CountryList></CountryList>

      {/* <FeatureProduct></FeatureProduct> */}
      <ProductList />
      <Achievements />
       <WhyChoose />
      <FaqSection/>
    </>
  );
}
