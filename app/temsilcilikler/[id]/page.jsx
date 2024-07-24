// src/app/temsilcilikler/[id]/page.js
import { getOneBrand } from '@/lib/firebase/brand/read_server';
import TemsilciDetayClient from './TemsilciDetayClient';



export default async function TemsilciDetay({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid ID</div>;
  }

  const strArr = id.split("-");
  const docId = strArr[strArr.length - 1];
  const data = await getOneBrand(docId);

  return <TemsilciDetayClient id={id} docId={docId} data={data} />;
 
}
