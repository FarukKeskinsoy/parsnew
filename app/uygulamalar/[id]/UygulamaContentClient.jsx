"use client"

import React, { useEffect, useState } from 'react'

const UygulamaContentClient = ({data}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(()=>{
    setIsClient(true);

  },[])
  return (
      <>
      {isClient&&data?.content&&<div className="lg:px-8 rounded" dangerouslySetInnerHTML={{__html:data?.content}}></div>}
      </>
  )
}

export default UygulamaContentClient