"use client"

import BrandsListViewBanner from "./components/BrandsListViewsBanner";
import EtkinlikListViewHome from "./components/EtkinlikViewListHome";
import Jumbotron from "./components/Jumbotron";
import JumbotronDynamic from "./components/JumbotronDynamic";
import ProductGroupCategoriesListView from "./components/ProductGroupCategoriesList";
import ProductsListView from "./components/ProductsListView";
import ProductsListViewBanner from "./components/ProductsListViewBanner";
import ButtonBanner from "./components/ServiceRequestButtonBanner/BannerButton";
import StaticBanner from "./components/StaticBanner";

export default function Home() {
  return (
    <main className="flex !flex-col">
      {/* <div className="hidden lg:flex" ><Jumbotron/></div> */}
      <JumbotronDynamic/>
      <ProductGroupCategoriesListView/>
      <BrandsListViewBanner route={"temsilcilikler"}/>
      <ProductsListViewBanner route={"urunler"}/>
      <StaticBanner/>
      <EtkinlikListViewHome/>
      <ButtonBanner/>
    </main>
  );
}
