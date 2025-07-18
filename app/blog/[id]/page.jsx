import { getAuthor } from '@/lib/firebase/author/read_server'
import { getBlog } from '@/lib/firebase/blog/read_server'
import { getCategory } from '@/lib/firebase/category/read_server'
import React from 'react'
import BlogClientComponent from './BlogClientComponent'
import BlogsListView from '@/app/components/BlogsListViews'
import BlogsListSideBar from '@/app/components/BlogsListSideBar'
import Image from 'next/image'
import { normalizeKeywords } from '@/utils/helpers'

export async function generateMetadata({ params }) {
  const { id } = params;
  const strArr = id?.split("-");
  const docId = strArr?.[strArr.length - 1];

  try {
    if (!docId) {
      throw new Error("Geçersiz blog ID");
    }

    const data = await getBlog(docId);

    if (!data) {
      return {
        title: "Blog Bulunamadı | Pars Analitik",
        description: "Aradığınız blog içeriği sistemde bulunamadı.",
        openGraph: {
          title: "Blog Bulunamadı | Pars Analitik",
          description: "Aradığınız içerik kaldırılmış olabilir.",
        },
        robots: "noindex, nofollow",
      };
    }

    const fullUrl = `https://www.parsanalitik.com/blog/${data?.url || id}-${data?.id}`;

    return {
      title: `${data.title} | Pars Analitik`,
      description: data.description || data.title,
      keywords: normalizeKeywords(data.keyword),
      openGraph: {
        title: data.title,
        description: data.description || data.title,
        images: data.images?.length ? [data.images[0]] : undefined,
        url: fullUrl,
      },
      alternates: {
        canonical: fullUrl,
      },
      robots: "index, follow",
    };
  } catch (error) {
    console.error("Metadata alınırken hata:", error);
    return {
      title: "Hata Oluştu",
      description: "Blog sayfası için meta bilgiler alınamadı.",
      robots: "noindex, nofollow",
    };
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
          <div className="blogContainer flex flex-col gap-4 lg:w-[65%]">
              <CategoryCard categoryId={data?.category} />
              <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1300px]" >{data?.title}</h1>
              <Image
                  src={data.images[0]}
                  alt={data.title}
                  width={800}
                  height={400}
                  className='w-full object-contain rectangleImg'
                  placeholder="blur"
                  blurDataURL="/placeholder_image.jpg" // Optional: Path to a low-res placeholder image
              />
              <div>
                  <AuthorCard authorId={data?.userid}/>
                  <h5 className="text-sm text-gray-500">{new Date(data?.createdAt?.seconds*1000)?.toLocaleDateString()}</h5>
              </div>
              <BlogClientComponent content={data?.content} />
            
          </div>
          <div className="w-full lg:w-[35%]">
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