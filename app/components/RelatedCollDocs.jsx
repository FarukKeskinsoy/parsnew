"use client";

import useFirestoreData from "@/lib/firebase/faq/read";
import { ArrowCircleRight, ArrowForwardRounded } from "@mui/icons-material";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RelatedCollDocs = ({ coll, field, type, docId }) => {
  const { data, error, isLoading } = useFirestoreData(coll, field, type, docId);
  const [visibleContentId, setVisibleContentId] = useState(null);

  if (isLoading) {
    return <h1>...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!data || data.length === 0) {
    return <h1>Herhangi bir doküman bulunamamaktadır &#129488;</h1>;
  }

  const toggleContentVisibility = (id) => {
    setVisibleContentId(visibleContentId === id ? null : id);
  };

  return (
    <section className="py-4">

    {coll==="FAQs"&&
        <div className="flex flex-col gap-4">
            {data.map((item, idx) => (
            <div key={idx}>
                <div
                    onClick={() => toggleContentVisibility(item.id)}
                    className="cursor-pointer flex items-center"
                >
                    {visibleContentId === item.id ? (
                    <ChevronDownIcon className="h-5 w-5 mr-2" />
                    ) : (
                    <ChevronRightIcon className="h-5 w-5 mr-2" />
                    )}
                    <h2>{item?.title}</h2>
                </div>
            <div
                className={`transition-all duration-500 ease-in-out ${
                visibleContentId === item.id ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
                <p dangerouslySetInnerHTML={{ __html: item?.content }}></p>
            </div>
            </div>
            
            ))}
        </div>
    }
    {coll==="Applications"&&
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
            {data.map((item, idx) => (
            <a
            href={item?.documents?.[0]?.url}
            target="_blank"
            className="relative cursor-pointer flex items-center h-auto flex-col text-ellipsis bg-white max-w-[200px] gap-4 p-4 rounded hover:shadow border"
            key={idx}>
                <img src={item?.images[0]||"/pdf_bgg.jpg"} className="h-[180px] object-contain" />
            
                <div className="flex items-end justify-between w-full">
                    <h2 className="text-sm w-[90%]">{item?.title} </h2>
                    <ArrowCircleRight/>
                </div>
                
            
            </a>
            
            ))}
        </div>
    }
    {coll==="Products"&&
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 flex-wrap">
            {data?.map((item, idx) => (
            <Link
            href={`/urunler/${item?.url}-${item?.id}`}
            className="relative cursor-pointer flex items-center h-auto flex-col text-ellipsis bg-white max-w-[200px] gap-4 p-4 rounded hover:shadow border"
            key={idx}>
                <img src={item?.images[0]||"/pdf_bgg.jpg"} className="h-[180px] object-contain" />
            
                <div className="flex items-end justify-between w-full">
                    <h2 className="text-sm w-[90%]">{item?.title} </h2>
                    <ArrowCircleRight/>
                </div>
                
            
            </Link>
            
            ))}
        </div>
    }
    {coll==="Blogs"&&
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
            {data.map((item, idx) => (
            <Link
            href={`/blog/${item?.url}-${item?.id}`}
            className="relative cursor-pointer flex items-center h-auto flex-col text-ellipsis bg-white max-w-[200px] gap-4 p-4 rounded hover:shadow border"
            key={idx}>
                <img src={item?.images[0]||"/pdf_bgg.jpg"} className="h-[180px] object-contain" />
            
                <div className="flex items-end justify-between w-full">
                    <h2 className="text-sm w-[90%]">{item?.title} </h2>
                    <ArrowCircleRight/>
                </div>
                
            
            </Link>
            
            ))}
        </div>
    }
    </section>
  );
};

export default RelatedCollDocs;
