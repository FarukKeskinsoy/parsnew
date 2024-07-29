import React from 'react';
import Link from 'next/link';
import FooterPage from '../Page/FooterPage';
import { footerLinks } from '@/public/links/links';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import XIcon from '@mui/icons-material/X';
import FooterPageObjected from '../Page/FooterPageObjected';

const Footer = () => {
    return (
        <>
        <footer className='flex flex-col lg:flex-row justify-between pt-0 pb-10 border-t px-4 lg:px-0 bg-[#f5f5f5]'>
            <div className="inner flex flex-col lg:flex-row gap-6 !items-start">
                <FooterPageObjected route={"Pages/iletisim"} />
                <Link className='pt-10 lg:px-10 border-r-2 border-l-2 h-[90%] w-full lg:w-auto flex items-center justify-center' href={"/"}>
                    <img className="h-10 lg:h-[130px] max-w-[150px] object-contain" src='/pars.png' alt='Logo' />
                </Link>
                <div className="flex-1 footer-right justify-between flex flex-wrap gap-2 relative pt-3 lg:pt-16">
                    {footerLinks.map((l, ldx) => (
                        <Link key={ldx} href={l.route} className='flex gap-2 items-center w-full sm:w-1/2 lg:w-1/3 min-w-[200px] mt-2 text-gray-700 hover:text-blue-500'>
                            {l.icon}
                            {l.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
        <footer className='py-4 lg:py-6 border-t  bg-[#e3e3e3]'>
            <div className="inner flex-col lg:flex-row gap-4">
            <div className="left flex-1 flex items-start justify-between lg:justify-start gap-4 lg:gap-8">
                    <Link
                        target='_blank'
                        className='hover:text-[#0765FF]'
                        href={"https://www.facebook.com/parsanalitik"}
                    >
                        <Facebook/>
                    </Link>
                    <Link
                        target='_blank'
                        className='hover:text-[#F56040]'
                        href={"https://www.instagram.com/parsanalitik"}
                    >
                        <Instagram/>
                    </Link>
                    <Link
                        target='_blank'
                        className='hover:text-[#000]'
                        href={"https://www.x.com/parsanalitik"}
                    >
                        <XIcon/>
                    </Link>
                    <Link
                        target='_blank'
                        className='hover:text-[#0B65C2]'
                        href={"https://www.linkedin.com/company/pars-analitik/"}
                    >
                        <LinkedIn/>
                    </Link>
                    

            </div>
                <div className="right flex-1 flex items-center justify-end">
                    <p className='text-sm'>© 2024 CodeAd,  Pars Analitik Tüm Hakları Saklıdır.</p>
                </div>
            </div>
        </footer>
        </>
    );
};

export default Footer;
