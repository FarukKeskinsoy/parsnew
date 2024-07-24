import React from 'react'
import Image from 'next/image'
import styles from './ServiceRequestButtonBanner.module.css';
import Link from 'next/link';

const ServiceRequestButtonBanner = () => {
  return (
    <section className={styles.banner}>
      <Image
        src="/srb.png" // Path relative to the public directory
        layout="fill" // Use fill to make the image cover the container
        objectFit="cover" // Ensure the image covers the container
        alt="Background image"
        className={styles.bannerImage}
      />
      <div className='p-10 flex w-full h-full items-center justify-center'>
        <div className='flex flex-col flex-1'>
            <h2 className={styles.bannerTextPrimary}>Güvenli ve kesintisiz çalışma için bize ulaşın!</h2>
      <h2 className={"text-red-500"}>En iyi hizmet için buradayız !</h2>
      </div>
        <div className='flex items-end flex-1'>
            <Link className={styles.link} href="satis-sonrasi-destek/form">
                SERVİS TALEP FORMU
            </Link>
        </div>
      </div>
      
      {/* Add other content here if needed */}
      {/* Add other content here if needed */}
    </section>
  )
}

export default ServiceRequestButtonBanner