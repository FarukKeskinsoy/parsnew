"use client";
import { ChevronDown, Contact, House, List, MenuIcon, Search, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import "./header.scss"
import Button from '@mui/material/Button';
import Menu  from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Drawer, IconButton, ListItemIcon } from '@mui/material';
import TemporaryDrawer from './Drawer';
import { ArrowBackIos, ArticleOutlined, CategoryOutlined, ChevronRight, ContactEmergencyOutlined, ContactMailOutlined, ContactsOutlined, ContactSupportOutlined, DashboardOutlined, EventAvailableOutlined, LiveHelpOutlined, PsychologyOutlined, RadioButtonCheckedOutlined, SellOutlined, SettingsOutlined, TaskOutlined, VerifiedUserOutlined, ViewCozyOutlined } from '@mui/icons-material';
import searchCollections from '@/lib/firebase/application/read_server';
import SearchComponent from './SearchComponent';
import SearchComponentAlt from './SearchComponentAlt';

const Header = () => {
  const [currentMenu, setCurrentMenu] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [routeChanged,setRouteChanged]=useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);
  const megaMenuRef2 = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openDrawer, setOpenDrawer] = useState(false);

const closeSearch=()=>{
  setSearchOpen(false)
}
const openSearch=()=>{
  setSearchOpen(true)
}

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const toggleMenu = (value) => {
    setCurrentMenu((oldValue) => (oldValue === value ? '' : value));
  };

  const handleClickOutside = (event) => {
    if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
      setCurrentMenu('');
    }
    if (megaMenuRef2.current && !megaMenuRef2.current.contains(event.target)) {
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



  const kurumsalLinks = [
    { id: "01", label: "Hakkımızda", route: "/hakkimizda",icon:<PsychologyOutlined/> },
    { id: "02", label: "İnsan Kaynakları", route: "/insan-kaynaklari",icon:<ContactEmergencyOutlined/> },
    { id: "03", label: "Satış", route: "/satis" , icon:<SellOutlined/>},
  ];

  const drawerMenu = [
    { id: "03", label: "Etkinlikler", route: "/etkinlikler" , icon:<DashboardOutlined/>},
    { id: "04", label: "Blog", route: "/blog" , icon:<TaskOutlined/>},
    { id: "08", label: "SSS (Sık Sorulan Sorular)", route: "/sss" , icon:<LiveHelpOutlined/>},
    // { id: "06", label: "İletişim", route: "/iletisim" , icon:<ContactsOutlined/>},


  ];

  const formList = [
    { id: "01", label: "Teklif Talebi", route: "/form?id=urunler",icon:<RadioButtonCheckedOutlined/> },
    { id: "02", label: "Servis Talebi", route: "/form?id=servis",icon:<SettingsOutlined/> },
    { id: "03", label: "Diğer", route: "/form?id=iletisim" , icon:<ContactMailOutlined/>}
  ];
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <nav
    id='nav'
    //className={`relative flex justify-between items-center px-2 py-2 lg:py-6  bg-white navbar border-b shadow `}
    className={`sticky top-0 z-1000 flex justify-between items-center px-2 py-2 lg:py-6 bg-white navbar border-b shadow z-[999]`}
    >
      <div className="inner items-center">
      <div className={`${searchOpen?"hidden lg:flex":"flex"} items-center justify-start max-w-20 lg:max-w-none`}>
        <Link href="/" className='max-w-max p-0 m-0'>
          <img className="h-16 object-contain" src='/pars.png' alt="Logo" />
        </Link>
      </div>

      <div className='flex gap-4 flex-1 items-center justify-end'>
      <TemporaryDrawer 
        open={openDrawer} 
        toggleDrawer={toggleDrawer}
        onClose={handleDrawerClose}
        setSearchFocused={setSearchFocused}
        setSearchOpen={setSearchOpen}
        searchFocused={searchFocused}
        searchOpen={searchOpen}
      />

      <ul className='hidden md:flex justify-center gap-6 items-center'>
        <div
          onClick={() => toggleMenu("kurumsal")}
          className='flex gap-2 items-center cursor-pointer text-gray-700 hover:text-blue-500'>
          Kurumsal
          {currentMenu==="kurumsal"?<ChevronDown/>:<ChevronRight/>}
        </div>
        <Link href="/temsilcilikler" className='flex gap-2 items-center text-gray-700 hover:text-blue-500'>
          Temsilcilikler
        </Link>
        <Link href="/urun-gruplari" className='flex gap-2 items-center cursor-pointer text-gray-700 hover:text-blue-500'>
          Ürünler
        </Link>
        <Link href="/sektorler" className='flex gap-2 items-center cursor-pointer text-gray-700 hover:text-blue-500'>
          Sektörler
        </Link>
        <Link href="/uygulamalar" className='flex gap-2 items-center cursor-pointer text-gray-700 hover:text-blue-500'>
          Uygulamalar
        </Link>
        <Link href="/servis" className='flex gap-2 items-center cursor-pointer text-gray-700 hover:text-blue-500'>
          Servis
        </Link>
        <Link href="/iletisim" className='flex gap-2 items-center cursor-pointer text-gray-700 hover:text-blue-500'>
          İletişim
        </Link>
        <div 
        onClick={() => toggleMenu("drawer")}
        onMouseEnter={() => toggleMenu("drawer")} 
        className='flex gap-2 items-center cursor-pointer text-gray-700 hover:text-blue-500'>
          <MenuIcon className="icon" />
        </div> 
      </ul>
      <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={`${searchOpen?"hidden lg:flex":"flex"} items-center justify-center hover:shadow w-min-300 border h-10 px-8 rounded border-gray-400 text-gray-600 hover:text-gray-800 text-sm lg:text-lg`}
      >
        Talep Oluştur
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button !mt-3',
        }}
      >
        {formList.map((f,fdx)=>{
          return(
            <MenuItem 
            key={fdx}
            className='mui-li p-3' 
            onClick={handleClose}
            
            >
            <Link
              href={f.route}
              className='flex items-center justify-between gap-2 text-gray-700 hover:text-blue-500'
            >
                {f.icon}
                {f.label}            
            </Link>
          </MenuItem>
          )
        })}
      </Menu>
      <div className="relative hidden md:flex h-10">

        <div>
      </div>
      </div>
      </div>

      <SearchComponentAlt closeSearch={closeSearch} openSearch={openSearch}/>

      <IconButton
      className="md:hidden flex items-center "
        onClick={toggleDrawer(true)}
        //style={{alignSelf:"flex-end"}}
        >
          <ArrowBackIos/>
        </IconButton>


      <div ref={megaMenuRef} 
      className={`mega-menu ${currentMenu === "kurumsal" ? 'open' : 'close'} py-10`}
      >
        <div 
        className="inner"
        >

        {currentMenu === "kurumsal" &&
          kurumsalLinks.map((link) => (
            <Link
            key={link.id} href={link.route} 
            className="py-1 text-gray-700 hover:text-blue-500 flex items-center justify-start gap-2"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div ref={megaMenuRef2} 
      className={`mega-menu ${currentMenu === "drawer" ? 'open2' : 'close'} py-10`}
      
      >
        <div className="inner flex-wrap">

        {currentMenu === "drawer" &&
          drawerMenu.map((link) => (
            <Link
            key={link.id} href={link.route} 
            className="py-1 text-gray-700 hover:text-blue-500 flex items-center justify-start gap-2"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          </div>
      </div>

      </div>

    </nav>
  );
};

export default Header;
