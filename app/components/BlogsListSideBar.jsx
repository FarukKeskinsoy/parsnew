"use client"

import { useBlogs } from "@/lib/firebase/blog/read";
import { getCategory } from "@/lib/firebase/category/read_server";
import { HeadBlogSection } from "./HeadBlogSection";
import { BlogCard } from "./BlogCard";

export default function BlogsListSideBar(){

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
            <main 
            className="w-full flex-col lg:px-8  bg-white py-4 lg:py-12 px-4 gap-4 lg:gap-8"
            >
                <h1 className="text-black text-lg lg:font-bold lg:text-3xl  w-max" >Bloglar</h1>

                <div className="flex flex-col gap-8 mt-4">
                {data?.map((post,idx)=>{
                        return(
                            <BlogCard key={idx} post={post}/>
                        )
                    })}
                </div>
                
                    
            </main>
    )

}

