import { getRelatedgroups } from '@/lib/firebase/productGroups/read_server';
import ClientComponent from './ClientComponent';

export default async function Page({params}){
    const { id } = params;
    if (!id) {
      return <div>Invalid ID</div>;
    }
  
    const strArr = id.split("-");
    const docId = strArr[strArr.length - 1];

    const data =await getRelatedgroups(docId) 

    return(
      <main 
        className="w-full flex flex-col  bg-white pt-4 pb-0 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
        >
            <h1 className="text-black text-lg lg:font-bold lg:text-3xl  w-full max-w-[1300px] m-auto" >İlgili Ürün Grupları</h1>

            <ClientComponent id={id} docId={docId} data={data}/>
            
      </main>    
      )
}