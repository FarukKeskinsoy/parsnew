"use client"

import EtkinlikListViewHome from "./components/EtkinlikViewListHome";
import Jumbotron from "./components/Jumbotron";
import ProductGroupCategoriesListView from "./components/ProductGroupCategoriesList";
import ButtonBanner from "./components/ServiceRequestButtonBanner/BannerButton";

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <div className="hidden lg:flex" ><Jumbotron/></div>
      <ProductGroupCategoriesListView/>
      <EtkinlikListViewHome/>
      <ButtonBanner/>
    </main>
  );
}
