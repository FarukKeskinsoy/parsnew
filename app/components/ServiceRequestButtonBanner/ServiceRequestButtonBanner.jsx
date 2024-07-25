import React from 'react'
import Image from 'next/image'
import styles from './ServiceRequestButtonBanner.module.css';
import Link from 'next/link';

const ServiceRequestButtonBanner = () => {
  return (
    <section className={styles.bannerHome}>
      <Image
        src="/srb.png" // Path relative to the public directory
        layout="fill" // Use fill to make the image cover the container
        objectFit="cover" // Ensure the image covers the container
        alt="Background image"
        className={styles.bannerImageHome}
      />
      <div className="inner flex-col lg:flex-row justify-center lg:justify-between py-4 lg:py-0 !gap-2 !items-center h-full">
        
        <div className='flex flex-col flex-1'>
            <h2 className="text-gray-900 lg:text-2xl mb-4 z-10">Güvenli ve kesintisiz çalışma için bize ulaşın!</h2>
            <h2 className={"text-[#E30613] lg:text-lg"}>En iyi hizmet için buradayız! </h2>
        </div>
        <div className='flex items-center justify-end flex-1 '>
            <Link className="!bg-black uppercase !text-white px-4 py-4 lg:px-12 rounded z-20" href="/form?id=servis">
                Servis Talep Formu
            </Link>
        </div>
      </div>
      
      {/* Add other content here if needed */}
      {/* Add other content here if needed */}
    </section>
  )
}

export default ServiceRequestButtonBanner