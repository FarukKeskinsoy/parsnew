import { getAuthor } from '@/lib/firebase/author/read_server'
import { getBlog } from '@/lib/firebase/blog/read_server'
import { getCategory } from '@/lib/firebase/category/read_server'
import { getOneProduct, getOneProductGroup, getProductsAccordingToOneGroup } from '@/lib/firebase/product/read_server'
import Link from 'next/link'
import React from 'react'

export async function generateMetadata({ params }) {
  // read route params
  const { id } = params
  const strArr=id?.split("-")

 const docId=id?.split("-")[strArr.length-1]
// fetch data
  
  const data =await getOneProductGroup(docId) 
  
  
  return {
    title: data?.title,
    openGraph: {
      images: [data?.images[0]],
    },
  }
}
export default async function UrunDetay ({params}) {
  const router = params
  const { id } = router
  const strArr=id?.split("-")

 const docId=id?.split("-")[strArr.length-1]

  const data =await getOneProductGroup(docId)
  const dataProducts =await getProductsAccordingToOneGroup(docId)

  return (
    <main className='p-10'>
      {/* <CategoryCard categoryId={data?.category} /> */}
            <h1 className='text-2xl font-bold'>{data?.title}</h1>
            <img src={data?.images[0]} />
            <Link className='' href={`/urun-gruplari/form?id=${id?.split("-")[strArr.length-1]}`}>
            Teklif Al</Link>
            <div>
              {/* <h5 className="text-sm text-gray-500">{new Date(data?.createdAt?.seconds*1000)?.toLocaleDateString()}</h5> */}
            </div>
            {data?.content&&<div dangerouslySetInnerHTML={{__html:data?.content}}></div>}

            <h3>İlgili Ürünler</h3>
            <div>
              {dataProducts?.map((p,pdx)=>{
                return(
                  <div>
                    {p?.title}
                  </div>
                )
              })}
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
      <div className="z-10 text-black" >
          {category?.title}
      </div>
  )
}