"use client"

import React, { useState, useEffect, useRef } from 'react';
import { getRelatedProductGroups, getRelatedProductGroupsandBrands } from '@/lib/firebase/productGroups/read_server';
import "./cards.scss"
import { ArrowForward, ArrowForwardIos } from '@mui/icons-material';
import Link from 'next/link';
export default function CollapsibleCard({ item,imgSrc }) {
    const [relatedGroup, setRelatedGroup] = useState([]);

    const [hovered, setHovered] = useState(false);

    const cardRef = useRef(null);


    return (
        <Link
            href={`urun-gruplari/kategori?id=${item?.id}`}
            ref={cardRef}
            className={`border flex relative rounded min-h-[325px] flex-1 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer w-full bos !items-start !justify-start`}
            //onMouseEnter={handleMouseEnter}  // Fetch data on hover
            //onMouseLeave={handleMouseLeave}  // Hide results on mouse leave
        >
            <img src={imgSrc} className={`w-full h-full !object-cover absolute rounded ${relatedGroup.length>0&&hovered?"opacity-30":"opacity-100"} -z-10`}/>
            <h2 className="text-xl font-semibold py-4 px-4 text-center w-full">{item?.title}</h2>
            {/* {loading && <div className="absolute inset-0 bg-blue-100 opacity-50"></div>} */}
            {/* {error && <p>Error: {error.message}</p>} */}
           
        </Link>
    );
}
