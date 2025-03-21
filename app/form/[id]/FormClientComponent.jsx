export default function FormClient({slug,yazilar}){


    const relatedYazi=yazilar?.find(y=>y?.slug===slug)
    return(
        <>
        {relatedYazi?.preface&&
            <section
            className="bg-white w-full max-w-[1200px] border border-gray-300 text-[grey] shadow p-2 lg:p-10 mt-6 lg:mt-12 rounded"
            >{relatedYazi?.preface}
            
            </section>
        }
        </>
    )
}