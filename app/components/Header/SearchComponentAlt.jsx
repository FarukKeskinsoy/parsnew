"use client"

import searchCollections from '@/lib/firebase/application/read_server';
import { Menu, MenuItem } from '@mui/material';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const SearchComponentAlt = ({}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


    const exam=[
        {title:"Ipsum is simply dummy text of the printing and typesetting industry.",link:"https://"},
        {title:"These passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",link:"https://"},
        {title:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",link:"https://"},
        {title:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form ",link:"https://"},
    ]
    const handleSearch = async (e) => {
        e.preventDefault();
        handleClick(e)
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
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button !mt-3',
        }}
      > 
      {searchResults&&searchResults.length<1&&
        <p className='p-4 text-gray-500'>Herhangi bir sonuç bulunamadı. &#129488;</p>
      }
        {searchResults.map((result, index) => (
          <MenuItem
          key={index}
          className='mui-li p-3 overflow-auto text-wrap hover:cursor-pointer' 
          onClick={handleClose}
          
          >
            <Link 
            key={index}
            className='flex gap-4 items-center relative'
            href={result.link}>
            {result?.images&&result?.images.length>0&&
            
            <img src={result?.images[0]} className='w-12 h-10 object-contain' />
            }

            <h3 className='text-sm' >{result.title}</h3>
            <div className=' bg-slate-600 text-[8px] p-1 rounded opacity-50 text-white top-0 left-0'>{result.tag}</div>

            </Link>
            </MenuItem>

        ))}
        </Menu>
        </div>

  )
}

export default SearchComponentAlt