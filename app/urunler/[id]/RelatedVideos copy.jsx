"use client"
import { addDataGeneral } from '@/lib/firebase/product/read';
import { ArrowCircleRight } from '@mui/icons-material'
import React, { useRef } from 'react'

const RelatedVideos = ({item}) => {
    const videoRefs = useRef([]);

    if(item?.videos&&item?.videos.length<1){
        return(
            <h4>Bu ürünle ilgili video bulunmamaktadır.</h4>
        )
    }

    const extractYouTubeID = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
      };
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 py-4 flex-wrap">
    
    {item?.videos?.map((docu, idx) => {
                const youtubeId = docu?.url ? extractYouTubeID(docu.url) : null;

        return(
            <div
                className="relative z-50 cursor-pointer flex items-center h-auto flex-col text-ellipsis bg-white max-w-[400px] gap-4 p-4 rounded hover:shadow border"
                key={idx}
                onClick={()=>addDataGeneral("Products","Ürün","viewed",item.id,`Ürün videosu izlendi (${item.title},${youtubeId})`)}
                >
                    <iframe
                                ref={(el) => videoRefs.current[idx] = el}
                                height="auto"
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="YouTube Video"
                                className='w-full lg:max-w-[400px] z-0'
                                ></iframe>
                    
    
            </div>
        )
    
    
})}
    </div>
  )
}

export default RelatedVideos