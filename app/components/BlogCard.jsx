import { ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";

export function BlogCard({post}){
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
    return(
        <Link href={`/blog/${post?.url}-${post?.id}`} className="p-4 lg:p-8 rounded block lg:border w-full">

            <div className="flex flex-col gap-2">
                {/* <div className="relative">
                    <CategoryCard categoryId={post?.category}/>
                </div> */}
                <img src={post?.images[0]} className="h-[200px] w-full object-cover" />
                <h1 className="font-bold">{post?.title}</h1>
                <h5 className="text-sm text-gray-500">{new Date(post?.createdAt?.seconds*1000)?.toLocaleDateString()}</h5>
                {isClient&&<p className="!h-32 overflow-hidden" dangerouslySetInnerHTML={{__html:post?.content}}></p>}
                <div
                    className="px-4 py-2 rounded bg-[#F6F6F6] w-max flex gap-4 hover:shadow-sm"
                    >
                        Devamını Oku
                        <ArrowForwardIos/>
                    </div>
                </div>
        </Link>
    )
}
