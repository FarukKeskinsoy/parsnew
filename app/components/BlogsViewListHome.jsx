"use client"

import { useBannerEvents, useBlogsForHome } from "@/lib/firebase/etkinlik/read";
import { ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";

export default function BlogsListViewHome() {
    const { data, error, isLoading } = useBlogsForHome();

    if (isLoading) {
        return <h1 className="h-0"  ></h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }
    if (!data) {
        return <h1>Ürünler bulunamadı.</h1>
    }

    return (
        <section className="flex flex-col bg-white w-full gap-4 lg:gap-16 py-4 lg:py-16" >
            <div className="flex">
                    <div className="inner text-gray-500 pl-4 lg:pl-0 !justify-start gap-4">
                        <h2 className="text-lg  lg:text-2xl uppercase  ">Bloglar
                            </h2> 
                        <Link href={"/blog"}
                            className="flex items-center pl-2 pt-3  pb-1 relative transition-all hover:px-4 hover:justify-between"
                        >
                            Tümünü Gör
                            <ArrowForwardIos/>
                        </Link>
                    </div>
                    
            </div>

        <div className="inner gap-6 flex flex-wrap !justify-start !items-stretch relative  p-4 lg:p-0 ">
            <div 
                className="flex flex-col gap-2 h-[400] w-[400px] bg-[#E3E3E3] rounded  p-4 relative"
            >
                <img src={data[0]?.images[0]} className="h-100 w-full max-w-[300px] m-auto object-contain !rounded" alt="--"/>

                {/* <p className="font-bold bg-[#E30613] p-2 max-w-max rounded text-white">{new Date(data[0]?.skt?.seconds*1000).toLocaleDateString()}</p> */}
                        <p className="text-left w-full">{data[0]?.title}</p>
                        <div className="w-full flex justify-end">
                            <Link href={`/blog/${data[0]?.url}-${data[0]?.id}`}
                                className="px-4 py-2 border rounded border-gray-700 bg-[#f5f5f5] text-gray-700" 
                            >
                                Devamını Oku
                            </Link>
                        </div>            
            </div>
            <div className="flex flex-col gap-3 w-full flex-1 relative">
                <div className="w-full flex flex-col lg:flex-row gap-6 flex-1 justify-center items-center lg:items-stretch lg:justify-between relative">
                {data?.slice(1)?.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col gap-2 lg:w-[30%] bg-[#E3E3E3]  border p-4 rounded "
                        
                    >
                        <img src={item?.images[0]} className="h-60 w-full max-w-[300px] object-contain !rounded" alt="--"/>
                        {/* <p className="font-bold bg-[#E30613] p-2 max-w-max rounded text-white">{new Date(item?.skt?.seconds*1000).toLocaleDateString()}</p> */}
                        <p className="text-left w-full">{item?.title}</p>
                        <div className="w-full flex justify-end">
                            <Link href={`/etkinlikler/${item?.event}/${item?.url}-${item?.id}`}
                                className="px-4 py-2 border rounded border-gray-700 bg-[#f5f5f5] text-gray-700" 
                            >
                                Devamını Oku
                            </Link>
                        </div>

                    </div>
                ))}
                </div>
            <div className="w-full flex flex-1 items-center justify-center px-6 mt-8">
                {/* <Link href={"/etkinlikler"}
                    className="bg-black !text-white rounded-full px-6 py-3"
                >
                    Tümünü Gör
                </Link> */}
            </div>

            </div>
            </div>
            
            
        </section>
    );
}
