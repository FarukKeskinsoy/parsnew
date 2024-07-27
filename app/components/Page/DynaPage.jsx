import "./page.scss"
export default function DynaPage({data, route}){
    return(
        <main className={`onepage py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8 `}>
            <h1 className="text-black text-lg lg:font-bold lg:text-3xl" >{data?.title}</h1>
        
            {data?.content&&<div className="lg:border lg:py-12 lg:px-8 rounded" dangerouslySetInnerHTML={{__html:data?.content}}></div>}

            
        </main>
    )
}