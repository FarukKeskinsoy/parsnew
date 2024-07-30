"use client"
import React, { useEffect, useState } from 'react'

const SectorContent = ({content}) => {
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
  return (
    <>
        {isClient&&<p className='content' dangerouslySetInnerHTML={{__html:content}}></p>}
    </>
  )
}

export default SectorContent