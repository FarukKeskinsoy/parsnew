import "./page.scss"
import ServisFormHolder from "./ServisFormHolder"
export default function DynaStaPageServis({data, route}){
    
    return(
        <main className={`onepage py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8 `}>
            <h1 className="text-black text-lg lg:font-bold lg:text-3xl" >{data?.title}</h1>
            <div className={`flex w-full relative flex-col lg:flex-row `+" justify-between items-center"}>
            {data?.images&&<img src={data?.images[0]} className="object-contain lg:w-1/2 !rounded squareImg" alt="" />}

            <div className="preface flex-1 bg-white lg:border lg:w-[60%] right-0 p-4 lg:p-12 rounded lg:absolute">
                {data?.preface}
            </div>

            </div>
            <ServisFormHolder/>

            {data?.content&&<div className="lg:border lg:py-12 lg:px-8 rounded" dangerouslySetInnerHTML={{__html:data?.content}}></div>}


            
        </main>
    )
}