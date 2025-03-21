"use client"

import searchCollections from '@/lib/firebase/application/read_server';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const SearchComponent = ({}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);


    const exam=[
        {title:"Ipsum is simply dummy text of the printing and typesetting industry.",link:"https://"},
        {title:"These passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",link:"https://"},
        {title:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",link:"https://"},
        {title:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form ",link:"https://"},
    ]
    const handleSearch = async (e) => {
        e.preventDefault();
      if (!searchTerm) return;
  
      const results = await searchCollections(searchTerm);
      setSearchResults(results);
    };
  return (
    <div className='relative flex flex-col gap-4 items-end ml-1'>
    <form 
    onSubmit={handleSearch}>
        <div
          className={`flex items-center border ${searchOpen || searchFocused ? 'border-blue-500 gap-3' : 'border-gray-300'} rounded px-2 py-1 transition-all h-10`}
          onMouseEnter={() => setSearchOpen(true)}
          //onMouseLeave={() => setSearchOpen(false)}
        >
        <Search className="text-blue-500" />

        <input
            type="text"
            placeholder="ara..."
            className={`w-0 ${searchOpen ? 'w-40' : 'w-0'} transition-all duration-300 search-input`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
        
        />
        </div>


    </form>
    <div className='transition-all absolute top-[120%] w-[83vw] lg:max-w-[400px]  border-gray-600 z-[99999] bg-white  flex flex-col gap-4 shadow-lg rounded max-h-[40vh] overflow-auto no-scrollbar'>
        
        {exam.map((result, index) => (
            <Link 
            key={index}
            className='px-4 py-2 text-sm hover:bg-slate-200'
            href={result.link}>
            {result.title}
            </Link>
          
        ))}
        </div>
        </div>

  )
}

export default SearchComponent