import React from "react";
import Header from "../../components/Layout/Header";

import Footer from "../../components/Layout/Footer";
import HomeWidgets from "./HomeWidgets";
import HomeCategories from "./HomeCategories";
import ShopeeMall from "./ShopeeMall";
import TopSearching from "./TopSearching";
import FlashSale from "./FlashSale";
import DailyDiscover from "./DailyDiscover";

export default function Home() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen ">
        <Header />
        <HomeWidgets />
        <HomeCategories />
        <FlashSale />
        <ShopeeMall />
        <TopSearching />
        <DailyDiscover />
        <Footer />
      </div>
    </>
  );
}
