"use client"

import { useBlogs } from "@/lib/firebase/blog/read";
import { getCategory } from "@/lib/firebase/category/read_server";
import { HeadBlogSection } from "./HeadBlogSection";
import { BlogCard } from "./BlogCard";
import LoadingPage from "./Page/LoadingPage";

export default function BlogsListView(){

    const { data, error, isLoading} = useBlogs();

    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>&#129488;</h1>
    }
    
    return(
            <main 
            className="w-full flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
            >
                <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1300px] m-auto" >Blog</h1>
            
                <div className="inner flex-col gap-4 lg:gap-8">
                    <HeadBlogSection post={data[0]}/>

                    {/* <SectorsListSelect/> */}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
                    {data.length>1&&data?.slice(1)?.map((post,idx)=>{
                        return(
                            <BlogCard key={idx} post={post}/>
                        )
                    })}
                    </div>
                </div>
            </main>
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