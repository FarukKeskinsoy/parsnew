import { ArrowCircleRight } from '@mui/icons-material'
import React from 'react'

const RelatedDocuments = ({item}) => {
    if(item?.documents&&item?.documents.length<1){
        return(
            <h4>Bu ürünle ilgili doküman bulunmamaktadır.</h4>
        )
    }
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 py-4">
    {item?.documents?.map((docu, idx) => (
    <a
    href={docu?.url}
    target="_blank"
    className="relative cursor-pointer flex items-center h-auto flex-col text-ellipsis bg-white max-w-[200px] gap-4 p-4 rounded hover:shadow border"
    key={idx}>
        <img src={"/pdf_bgg.jpg"} className="h-[180px] object-contain" />
    
        <div className="flex items-end justify-between w-full">
            <h2 className="text-sm w-[90%]">{docu?.filename} </h2>
            <ArrowCircleRight/>
        </div>
        
    
    </a>
    
    ))}
    </div>
  )
}

export default RelatedDocuments