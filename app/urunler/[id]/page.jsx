import { getAuthor } from '@/lib/firebase/author/read_server'
import { getBlog } from '@/lib/firebase/blog/read_server'
import { getCategory } from '@/lib/firebase/category/read_server'
import { getOneProduct } from '@/lib/firebase/product/read_server'
import Link from 'next/link'
import React from 'react'
import ProductDetail from './ProductDetail'
import TopComponent from './TopComponent'

export async function generateMetadata({ params }) {
  // read route params
  const { id } = params
  const strArr=id?.split("-")

 const docId=id?.split("-")[strArr.length-1]
// fetch data
  
  const data =await getOneProduct(docId) 
  
  
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

  const data =await getOneProduct(docId)

  return (
    <main 
      className="w-full p-6 flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
    >      {/* <CategoryCard categoryId={data?.category} /> */}
      
      <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1300px] m-auto" >{data?.title}</h1>
          <div className="inner flex-col gap-8 lg:gap-12 !items-center">
              {/* <div className='relative flex flex-col lg:flex-row items-start gap-8'>
                <div className='flex-1 flex flex-col gap-8'>
                  <p className='flex-1'>{data?.description}</p>
                  <div className='flex gap-4'>
                  { data.images&&data?.images.length>1&&
                    data?.images?.slice(1).map((s,sdx)=>{
                      return(
                      <div key={sdx} className='border rounded p-4 overflow-hidden hover:overflow-visible'>
                        <img src={s} className='h-24 object-contain transition-transform duration-300 ease-in-out hover:scale-110' />
                      </div>)
                    })
                  }
                  </div>
                </div>
                <img src={data?.images[0]} className='flex-1 h-[400px] object-contain p-6 border' />
              </div> */}
            <div>
              
            </div>
            <TopComponent data={data}/>
            <div className='w-full flex'>
            <Link 
              className='text-xlg bg-[#E30613] rounded-full px-4 py-2 lg:px-12 lg:py-4 lg:text-xl !text-white' 
              //href={`/urunler/${data?.url}-${id}/form?id=${id?.split("-")[strArr.length-1]}`}
              href={`/form/${id?.split("-")[strArr.length-1]}?id=${id?.split("-")[strArr.length-1]}`}
              >
              Teklif Al
            </Link>
            </div>
            
            <ProductDetail data={data} docId={docId} />
            </div>
    </main>
  )
}
