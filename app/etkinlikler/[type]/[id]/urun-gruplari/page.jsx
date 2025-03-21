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
      <div>
            <h1>Ürün Grupları</h1>
            <p>Dynamic Segment: {docId}</p>

            <ClientComponent id={id} docId={docId} data={data}/>
            
      </div>    
      )
}