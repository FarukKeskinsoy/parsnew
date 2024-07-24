"use client"

import React, { useState, useEffect, useRef } from 'react';
import { getRelatedProductGroups } from '@/lib/firebase/productGroups/read_server';
import "./cards.scss"
export default function CollapsibleCard({ item }) {
    const [relatedSector, setRelatedSector] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [hovered, setHovered] = useState(false);

    const cardRef = useRef(null);

    const fetchRelatedSector = async () => {
        if (dataFetched) return; // Avoid fetching data multiple times
        try {
            setLoading(true);
            const data = await getRelatedProductGroups(item?.id);
            console.log(data);
            setRelatedSector(data);
            setDataFetched(true); // Mark data as fetched
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMouseEnter = () => {
        setHovered(true);
        fetchRelatedSector();
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

    return (
        <div
            ref={cardRef}
            className={`relative border h-[325px] border-black flex-1 hover:flex-[2] transition-all duration-300 ease-in-out p-4 cursor-pointer ${loading ? 'loading-border' : ''}`}
            onMouseEnter={handleMouseEnter}  // Fetch data on hover
            onMouseLeave={handleMouseLeave}  // Hide results on mouse leave
        >
            <h2 className="text-xl font-semibold">{item?.title}</h2>
            {loading && <div className="absolute inset-0 bg-blue-100 opacity-50"></div>}
            {error && <p>Error: {error.message}</p>}
            {hovered && dataFetched && (
                <div>
                    {relatedSector.map((r, rdx) => (
                        <div key={rdx}>
                            {r?.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
