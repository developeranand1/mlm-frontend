import Image from "next/image";
import styles from "./page.module.css";
import HomeBanner from "@/components/home/HomeBanner";
import CountryList from "@/components/home/CountryList";
import FeatureProduct from "@/components/home/FeatureProduct";

export default function Home() {
  return (
    <>
      <HomeBanner></HomeBanner>
      <CountryList></CountryList>
      <FeatureProduct></FeatureProduct>
    </>
  );
}
