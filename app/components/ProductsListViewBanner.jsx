"use client";

import { useProductsBannered, useVitrin } from "@/lib/firebase/product/read";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsListViewBanner({ route }) {
  const { data: vitrins, error: vitrinsError, isLoading: vitrinsLoading } = useVitrin();
  const [rproductIds, setRproductIds] = useState([]);
  
  useEffect(() => {
    if (vitrins && vitrins.length > 0) {
      setRproductIds(vitrins[0].rproduct || []);
    }
  }, [vitrins]);

  const { data: products, error: productsError, isLoading: productsLoading } = useProductsBannered(rproductIds);

  if (vitrinsLoading || productsLoading) {
    return <h1 className="h-00"></h1>;
  }
  if (vitrinsError || productsError) {
    return <h1>{vitrinsError || productsError}</h1>;
  }
  if (!products) {
    return <h1>&#129488;</h1>;
  }

  return (
    <section className="flex flex-col gap-4 lg:gap-16 !bg-white py-4 lg:py-16">
      <h2 className="inner text-gray-500 text-lg lg:text-2xl uppercase pl-4 lg:pl-0">Ürünler</h2>
      <div className="inner gap-4 flex-col lg:flex-row lg:gap-16">
        {products.map((item, idx) => (
          <Link
            className="flex-1 flex flex-col gap-4 p-4 lg:p-8 rounded border border-gray-100 shadow-sm bg-white hover:shadow-lg transition-all hover:border-gray-400"
            key={idx}
            href={`/${route}/${item?.url}-${item?.id}`}
          >
            <img src={item?.images[0]} className="w-[60%] m-auto" />
            <h1 className="font-bold text-lg lg:text-xl">{item?.title}</h1>
            <p className="text-gray-700">{(item?.description).substring(0, 80)}...</p>
          </Link>
        ))}
      </div>
      <div className="w-full flex items-center justify-center ">
        <Link className="bg-black !text-white rounded-full px-6 py-3" href={"/urunler"}>
          Tüm Ürünler
        </Link>
      </div>
    </section>
  );
}
