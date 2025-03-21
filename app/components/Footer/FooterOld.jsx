import { Contact, House, List } from 'lucide-react'
import React from 'react'
import LoginButton from './LoginButton'
import AuthContextProvider from '@/lib/contexts/AuthContext'
import Link from 'next/link'
import SectorsListView from '../SectorsListViews'
import BrandsListView from '../BrandsListViews'
import "./footer.scss"
const Footer = () => {
  return (
    <footer className='flex justify-between items-center px-7 py-3 border-b'>
        <div className="inner">
            
        </div>
        <Link href={"/"}>
            <img
                className="h-10" src='/pars.png'
            />
        </Link>
        {/* <ul className='flex gap-6 items-center'>
            <Link href="/" className='flex gap-2 items-center'>
            <House />
            Anasayfa
            </Link>
            <Link href="/" className='flex gap-2 items-center'>
            <List />
            Bloglar
            </Link>
            <Link href={"/iletisim"} className='flex gap-2 items-center'>
            <Contact />
            İletişim
            </Link>
            <Link href={"/sektorler"} className='flex gap-2 items-center'>
            <Contact />
            Sektörler
            </Link>
        </ul> */}
        {/* <BrandsListView/> */}
        <AuthContextProvider>
            <LoginButton/>
        </AuthContextProvider>
    </footer>
  )
}

export default Footer