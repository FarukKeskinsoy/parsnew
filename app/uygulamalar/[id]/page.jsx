import UygulamaDetayClient from './UygulamaDetayClient';
import { getOneApplicationServer } from '@/lib/firebase/application/read_server';

export default async function UygulamaDetay({params}){
  const { id } = params
  if (!id) {
    return <div>Invalid ID</div>;
  }

  const strArr = id.split("-");
  const docId = strArr[strArr.length - 1];
  const data = await getOneApplicationServer(docId);

  return (
    <div>
        <UygulamaDetayClient id={id} docId={docId} docData={data}/>
      </div>
  )
}

