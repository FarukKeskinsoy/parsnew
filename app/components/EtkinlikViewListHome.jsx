"use client"

import { useBannerEvents } from "@/lib/firebase/etkinlik/read";
import Link from "next/link";

export default function EtkinlikListViewHome() {
    const { data, error, isLoading } = useBannerEvents();

    if (isLoading) {
        return <h1>Yükleniyor..</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }
    if (!data) {
        return <h1>Ürünler bulunamadı.</h1>
    }
    console.log(data);

    return (
        <section className="inner gap-6 flex flex-wrap border !justify-start !items-stretch">
            <div className="bg-gray-700">
                {data[0]?.title}
            </div>
            <div className="flex flex-col gap-3 w-full flex-1 border">
                <div className="w-full flex-1 bg-slate-500">
                {data?.slice(1).map((item, idx) => (
                    <div
                        key={idx}
                        
                    >
                        {item?.title}
                    </div>
                ))}
                </div>
            <div>
                <Link href={"/etkinlikler"}
                    className="bg-black !text-white rounded-full"
                >
                    Tümünü Gör
                </Link>
            </div>

            </div>
            
        </section>
    );
}
