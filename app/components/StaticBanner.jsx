import React from 'react';
import { ArticleOutlined, CategoryOutlined, ContactEmergencyOutlined, ContactsOutlined, ContactSupportOutlined, DashboardOutlined, LiveHelpOutlined, PsychologyOutlined, SellOutlined, TaskOutlined } from "@mui/icons-material";
import Link from 'next/link';

const StaticBanner = () => {

    const links = [
        { id: "09", label: "Uygulamalar", route: "/uygulamalar", source:"/appbox.png", icon: <TaskOutlined/>, desc: "Her türlü çalışmalarınıza uygun çözümler bulabileceğiniz aplikasyon notlarımız" },
        { id: "04", label: "Satış Sonrası Destek", route: "/satis-sonrasi-destek", source:"/support.jpg", icon: <ContactSupportOutlined/>, desc: "Tecrübeli kargomuz ile tüm Türkiye' de servis ve aplikasyon desteği.." },
        { id: "07", label: "Blog", route: "/blog", source:"/blogg.png", icon: <ArticleOutlined/>, desc: "Blog yazılarımız ile bilinmeyenleri keşfedin.." },
    ];

    return (
        <div className='inner flex-col lg:flex-row gap-4 lg:gap-0'>
            {links.map((l, ldx) => (
                <Link className='flex-1 relative h-[400px] items-end justify-end' key={ldx} href={l.route}>
                    <img src={l.source} className='w-full h-full object-cover absolute' style={{ opacity: 0.6,zIndex:-10 }} alt={l.label} />

                    <div className="link-container flex-1 h-full flex flex-col justify-end">
                        <div className='p-6 bg-slate-50 bg-opacity-30'>

                        <p className='font-bold'>{l.label}</p>
                        <p>{l.desc}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default StaticBanner;
