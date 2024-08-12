import SectorCardMini from '@/app/components/SectorCardMini'
import { ArrowCircleRight } from '@mui/icons-material'
import React from 'react'

const RelatedSectors = ({item}) => {
    if(item?.rsector&&item?.rsector.length<1){
        return(
null        )
    }
  return (
    <div className="flex lg:flex-col items-start lg:items-start gap-4 lg:!sticky lg:!top-32">
    {item?.rsector?.map((docu, idx) => (
    <div
    key={idx}>
    
        <div className="flex justify-between w-full flex-wrap">
            <SectorCardMini id={docu} />
        </div>
        
    
    </div>
    
    ))}
    </div>
  )
}

export default RelatedSectors