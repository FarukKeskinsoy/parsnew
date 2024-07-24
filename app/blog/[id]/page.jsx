import { getAuthor } from '@/lib/firebase/author/read_server'
import { getBlog } from '@/lib/firebase/blog/read_server'
import { getCategory } from '@/lib/firebase/category/read_server'
import React from 'react'

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
    <main className='p-10'>
      <CategoryCard categoryId={data?.category} />
            <h1 className='text-2xl font-bold'>{data?.title}</h1>
            <img src={data?.images[0]} />
            <div>
              <AuthorCard authorId={data?.userid}/>
              <h5 className="text-sm text-gray-500">{new Date(data?.createdAt?.seconds*1000)?.toLocaleDateString()}</h5>
            </div>
            <div dangerouslySetInnerHTML={{__html:data?.content}}></div>
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
      <div className="z-10 text-black" >
          {category?.title}
      </div>
  )
}