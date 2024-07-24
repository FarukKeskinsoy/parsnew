"use client"

import { useBlogs } from "@/lib/firebase/blog/read";
import { getCategory } from "@/lib/firebase/category/read_server";
import Link from "next/link";

export default function BlogsListView(){

    const { data, error, isLoading} = useBlogs();
    if(isLoading){
        return <h1>Yükleniyor..</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Sektörler bulunamadı.</h1>
    }
    return(
        <section className="p-10">
            <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-5">
            {data?.map((post,idx)=>{
                return(
                    <BlogCard key={idx} post={post}/>
                )
            })}
            </div>
        </section>
    )

}

function BlogCard({post}){
    return(
        <Link href={`/blog/${post?.url}-${post?.id}`} className="p-5 rounded bg-blue-50 block">

            <div className="flex flex-col gap-2">
                {/* <div className="relative">
                    <CategoryCard categoryId={post?.category}/>
                </div> */}
                <img src={post?.images[0]} className="h-[200px] w-full object-cover" />
                <h1 className="font-bold">{post?.title}</h1>
                <h5 className="text-sm text-gray-500">{new Date(post?.createdAt?.seconds*1000)?.toLocaleDateString()}</h5>
                <p>{post?.content&&post?.content?.substring(0,50)}..</p>
            </div>
        </Link>
    )
}

 function CategoryCard({categoryId}){
    const category= getCategory(categoryId);
    return(
        <div className="z-10 text-black" >
            {category?.title}
        </div>
    )
}