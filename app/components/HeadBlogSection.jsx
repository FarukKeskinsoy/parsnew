import { ArrowForwardIos } from "@mui/icons-material"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeadBlogSection({post}){
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])

    return(

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 w-full ">
                {/* <div className="relative">
                    <CategoryCard categoryId={post?.category}/>
                </div> */}
                <div className="flex flex-1 border !justify-start">
                    <img src={post?.images[0]} className="w-full object-contain" />
                </div>
                <div className="flex flex-col flex-[1.5] gap-4">
                    <div>
                        <h1 className="font-bold">{post?.title}</h1>
                        <h5 className="text-sm text-gray-500">{new Date(post?.createdAt?.seconds*1000)?.toLocaleDateString()}</h5>
                    </div>
                    {isClient&&<p className="!h-32 overflow-hidden content" dangerouslySetInnerHTML={{__html:post?.content}}></p>}
                    <Link
                    href={`/blog/${post?.url}-${post?.id}`} 
                    className="px-4 py-2 rounded bg-[#F6F6F6] w-max flex gap-4 hover:shadow-sm"
                    >
                        Devamını Oku
                        <ArrowForwardIos/>
                    </Link>
                </div>
            </div>
    )
}