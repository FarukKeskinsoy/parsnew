import React from 'react';
import Link from 'next/link';
import FooterPage from '../Page/FooterPage';
import { footerLinks } from '@/public/links/links';

const Footer = () => {
    return (
        <footer className='flex flex-col lg:flex-row justify-between pt-0 pb-10 border-t px-4 lg:px-0 bg-white'>
            <div className="inner flex flex-col lg:flex-row gap-6 !items-start">
                <FooterPage route={"Pages/iletisim"} />
                <Link className='pt-10 lg:px-10 border-r-2 border-l-2 h-[90%] w-full lg:w-auto flex items-center justify-center' href={"/"}>
                    <img className="h-10 lg:h-[130px]" src='/pars.png' alt='Logo' />
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
    );
};

export default Footer;
