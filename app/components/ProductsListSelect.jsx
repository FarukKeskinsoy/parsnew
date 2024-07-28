"use client";

import { useProductGroupsForList, useProductsForList } from "@/lib/firebase/productGroups/read";
import { useEffect, useState } from "react";

export default function ProductsListSelect({ filterData, handleData, related }) {

  const { data, error, isLoading } = useProductsForList(related);

  return (
    <select
      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      name="rproduct"
      id="product"
      onChange={(e) => {
        handleData("rproduct", e.target.value);
      }}
      value={filterData?.rproduct || ""}
    >
      <option value="" disabled hidden>Ürün Seçiniz</option>
      {data?.map((item, idx) => {
        return (
          <option key={idx} value={item?.id}>
            {item?.title}
          </option>
        );
      })}
    </select>
  );
}
