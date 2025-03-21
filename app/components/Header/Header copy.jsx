"use client";
import { Contact, House, List, Menu, Search } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import "./header.scss";

const Header = () => {
  const [currentMenu, setCurrentMenu] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);

  const toggleMenu = (value) => {
    setCurrentMenu((oldValue) => (oldValue === value ? '' : value));
  };

  const handleClickOutside = (event) => {
    if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
      setCurrentMenu('');
      
    }
  };

  useEffect(() => {
    if (currentMenu) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [currentMenu]);

  useEffect(()=>{
    
  },[])

  const kurumsalLinks = [
    { id: "01", label: "Hakkımızda", route: "/hakkimizda" },
    { id: "02", label: "İnsan Kaynakları", route: "/insan-kaynaklari" },
    { id: "03", label: "Satış", route: "/satis" },
    { id: "04", label: "Satış Sonrası Destek", route: "/satis-sonrasi-destek" },
  ];

  const drawerMenu = [
    { id: "01", label: "Ürünler", route: "/urunler" },
    { id: "02", label: "Sektörler", route: "/sektorler" },
    { id: "03", label: "Uygulamalar", route: "/uygulamalar" },
    { id: "04", label: "İletişim", route: "/iletisim" },
  ];

  return (
    <nav className='relative flex justify-between items-center px-7 py-3 border-b bg-white shadow navbar'>
      
      <div className="inner">
      <Link className="logo-link"  href={"/"}>
        <img className="h-16" src='/pars.png' />
      </Link>

      <ul className='hidden md:flex flex-1 justify-center gap-6 items-center'>
        <div
          onClick={() => toggleMenu("kurumsal")}
          className='flex gap-2 items-center hover:cursor-pointer likeButton'>
          Kurumsal
        </div>
        <Link href="/temsilcilikler" className='flex gap-2 items-center likeButton'>
          Temsilcilikler
        </Link>
        <Link href={"/etkinlikler"} className='flex gap-2 items-center hover:cursor-pointer likeButton'>
          Etkinlikler
        </Link>
        <Link href={"/blog"} className='flex gap-2 items-center likeButton'>
          Blog
        </Link>
        <div onClick={() => toggleMenu("drawer")} className='flex gap-2 items-center hover:cursor-pointer likeButton'>
          <Menu className="icon" />
        </div> 
        
      </ul>

      <div className="relative hidden md:flex">
        <div
          className={`search-container ${searchOpen || searchFocused ? 'open' : ''}`}
          onMouseEnter={() => setSearchOpen(true)}
          onMouseLeave={() => setSearchOpen(false)}
        >
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="ara..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <Menu onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='cursor-pointer' />
      </div>
      <div ref={megaMenuRef} 
      
      className={`mega-menu ${currentMenu === "kurumsal" ? 'open' : ''}`}
      >
        {currentMenu === "kurumsal" &&
          kurumsalLinks.map((link) => (
            <Link key={link.id} href={link.route} className="mega-menu-link">
              {link.label}
            </Link>
          ))}
      </div>
      <div ref={megaMenuRef} 
      className={`mega-menu ${currentMenu === "drawer" ? 'open' : ''}`}
      >
        {currentMenu === "drawer" &&
          drawerMenu.map((link) => (
            <Link key={link.id} href={link.route} className="mega-menu-link">
              {link.label}
            </Link>
          ))}
      </div>
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 z-50 transition-all duration-300">
          <div
            onClick={() => toggleMenu("kurumsal")}
            className='flex gap-2 items-center hover:cursor-pointer likeButton'>
            <House className="icon" />
            Kurumsal
          </div>
          <Link href="/temsilcilikler" className='flex gap-2 items-center likeButton'>
            <Contact className="icon" />
            Temsilcilikler
          </Link>
          <Link href="/etkinlikler" className='flex gap-2 items-center likeButton'>
            <List className="icon" />
            Etkinlikler
          </Link>
          <Link href={"/blog"} className='flex gap-2 items-center likeButton'>
            <Menu className="icon" />
            Blog
          </Link>
          <div onClick={() => toggleMenu("drawer")} className='flex gap-2 items-center hover:cursor-pointer likeButton'>
          <Menu className="icon" />
        </div>
          <div
            className={`search-container ${searchOpen || searchFocused ? 'open' : ''}`}
            onMouseEnter={() => setSearchOpen(true)}
            onMouseLeave={() => setSearchOpen(false)}
          >
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="ara..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
      )}
      </div>
      
    </nav>
  );
};

export default Header;

