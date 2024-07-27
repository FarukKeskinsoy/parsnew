import { getAuthor } from '@/lib/firebase/author/read_server'
import { getBlog } from '@/lib/firebase/blog/read_server'
import { getCategory } from '@/lib/firebase/category/read_server'
import React from 'react'
import BlogClientComponent from './BlogClientComponent'
import BlogsListView from '@/app/components/BlogsListViews'
import BlogsListSideBar from '@/app/components/BlogsListSideBar'

export async function generateMetadata({ params }) {
  // read route params
  const { id } = params
  const strArr=id?.split("-")

 const docId=id?.split("-")[strArr.length-1]
// fetch data
  
  const data =await getBlog(docId) 
  
  
  return {
    title: data?.title,
    openGraph: {
      images: [data?.images[0]],
    },
  }
}

export default async function BlogDetay ({params}) {
  const router = params
  const { id } = router
  const strArr=id?.split("-")

 const docId=id?.split("-")[strArr.length-1]

  const data =await getBlog(docId)

  return (
    <main 
      className="w-full flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
    >    
        <div className="inner !items-stretch w-full flex-col lg:flex-row">
          <div className="blogContainer flex flex-col gap-4 lg:w-[70%]">
              <CategoryCard categoryId={data?.category} />
              <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1500px] m-auto" >{data?.title}</h1>
              <img src={data?.images[0]} className='!h-[400px] object-contain' />
              <div>
                  <AuthorCard authorId={data?.userid}/>
                  <h5 className="text-sm text-gray-500">{new Date(data?.createdAt?.seconds*1000)?.toLocaleDateString()}</h5>
              </div>
              <BlogClientComponent content={data?.content} />
            
          </div>
          <div className="w-full lg:w-[30%]">
            <BlogsListSideBar/>
          </div>
        </div>
    </main>
  )
}

async function AuthorCard({authorId}){
  const author=await getAuthor(authorId);
  return(
    <h4>{author?.uName}</h4>
  )
}
async function CategoryCard({categoryId}){
  const category= await getCategory(categoryId);
  return(
      <div className="z-10 text-gray-500 border rounded-full w-max px-4 py-2" >
          {category?.title}
      </div>
  )
}