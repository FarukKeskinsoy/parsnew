// src/app/temsilcilikler/[id]/page.js
import { getOneEvent } from '@/lib/firebase/etkinlik/read_server';
import EtkinlikDetayClient from './EtkinlikDetayClient';



export default async function TemsilciDetay({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid ID</div>;
  }

  const strArr = id.split("-");
  const docId = strArr[strArr.length - 1];
  const data = await getOneEvent(docId);

  return <EtkinlikDetayClient id={id} docId={docId} docdata={data} />;
 
}
