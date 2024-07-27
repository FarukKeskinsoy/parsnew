"use client"
import React, { useEffect, useState } from 'react'

const BlogClientComponent = ({content}) => {
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
  return (
    <>
        {isClient&&<p dangerouslySetInnerHTML={{__html:content}}></p>}
    </>
  )
}

export default BlogClientComponent