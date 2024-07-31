"use client"

import React, { useState } from 'react';

const TopComponent = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(data?.images[0]);
  const [viewImage, setViewedImage] = useState(false);
  
  const toggleViewer = () => {
    setViewedImage(pre => !pre);
  }

  return (
    <>
      {viewImage &&
        <div 
          onClick={toggleViewer}
          className='fixed inset-0 flex items-center justify-center transition-all duration-300 ease-in-out z-50'
        >
          <img src={selectedImage} className='max-w-full max-h-full object-contain p-6 transition-transform duration-300 ease-in-out border-2 shadow bg-slate-50 squareImg'  />
        </div>
      }
      <div className='flex flex-col lg:flex-row items-start gap-8'>
        <div className='flex-1 flex flex-col gap-8'>
          <p className='flex-1'>{data?.description}</p>
          <div className='flex gap-4'>
            {data.images && data?.images.length > 1 && 
              data?.images?.map((s, sdx) => (
                <div 
                  key={sdx} 
                  className={`border rounded p-4 overflow-hidden hover:overflow-visible ${selectedImage === s ? "shadow" : ""}`}
                  onClick={() => setSelectedImage(s)}
                >
                  <img src={s} className='h-24 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer squareImg' />
                </div>
              ))
            }
          </div>
        </div>
        <img 
          onClick={toggleViewer}
          src={selectedImage} 
          className='lg:h-[600px] p-4 border transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer squareImg' 
        />
      </div>
    </>
  );
}

export default TopComponent;
