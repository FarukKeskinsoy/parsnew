"use client"

import React, { useState, useEffect, useRef } from 'react';
import { getRelatedProductGroups, getRelatedProductGroupsandBrands } from '@/lib/firebase/productGroups/read_server';
import "./cards.scss"
import { ArrowForward, ArrowForwardIos } from '@mui/icons-material';
import Link from 'next/link';
export default function CollapsibleCard({ item,imgSrc }) {
    const [relatedGroup, setRelatedGroup] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [hovered, setHovered] = useState(false);

    const cardRef = useRef(null);

    const fetchRelatedGroup = async () => {
        if (dataFetched) return; // Avoid fetching data multiple times
        console.log("relateg group tricked")
        try {
            setLoading(true);
            //const data = await getRelatedProductGroups(item?.id);
            const data = await getRelatedProductGroupsandBrands(item?.id);

            setRelatedGroup(data);
            setDataFetched(true); // Mark data as fetched
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMouseEnter = () => {
        setHovered(true);
        fetchRelatedGroup();
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setDataFetched(false); // Hide results on mouse leave
    };

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            setHovered(false);
            setDataFetched(false); // Hide results on click outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    console.log(relatedGroup)

    return (
        <div
            ref={cardRef}
            className={`flex relative rounded min-h-[325px] flex-1 hover:flex-[2] transition-all duration-300 ease-in-out cursor-pointer w-full ${loading ? 'loading-border' : ''} ${relatedGroup.length>0&&hovered?"dolu":"bos"} `}
            onMouseEnter={handleMouseEnter}  // Fetch data on hover
            onMouseLeave={handleMouseLeave}  // Hide results on mouse leave
        >
            <img src={imgSrc} className={`w-full h-full !object-cover absolute rounded ${relatedGroup.length>0&&hovered?"opacity-20":"opacity-50"} -z-10`}/>
            <h2 className="text-xl font-semibold py-4">{item?.title}</h2>
            {/* {loading && <div className="absolute inset-0 bg-blue-100 opacity-50"></div>} */}
            {/* {error && <p>Error: {error.message}</p>} */}
            {hovered && dataFetched && (
                <div
                    className='flex flex-col gap-4' 
                >


                    {relatedGroup.map((r, rdx) => (
                        <div 
                            key={rdx}
                            className='flex items-center gap-4 px-4'
                        >
                            <div>
                            {r?.rbrands?.map((rb,rbx)=>{
                                return(
                                    <div key={rbx} >
                                        <img src={rb?.images[0]} className='w-16 object-contain' />
                                        
                                    </div>
                                )
                            })}
                            </div>


                            <Link href={`/urun-gruplari/${r?.url}-${r?.id}`} >{r?.title}<ArrowForwardIos/></Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
