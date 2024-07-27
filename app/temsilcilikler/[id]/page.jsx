// src/app/temsilcilikler/[id]/page.js
import { getOneBrand } from '@/lib/firebase/brand/read_server';
import TemsilciDetayClient from './TemsilciDetayClient';
import BrandsListBar from '@/app/components/BrandsListBar';
import Link from 'next/link';
import RelatedComponent from './RelatedComponent';
import ClientComponent from './ClientComponent';
import { getRelatedgroupsBar } from '@/lib/firebase/productGroups/read_server';



export default async function TemsilciDetay({ params }) {

  const { id } = params;

  if (!id) {
    return <div>Invalid ID</div>;
  }

  const strArr = id.split("-");
  const docId = strArr[strArr.length - 1];
  const data = await getOneBrand(docId);
  const datagroup = await getRelatedgroupsBar(docId);

  return (
    <main className='bg-white pb-16'>
      {data&&<TemsilciDetayClient id={id} docId={docId} data={data} />}
      <BrandsListBar route={"temsilcilikler"} />
      <RelatedComponent id={id} docId={docId}/>
      <ClientComponent id={id} docId={docId} data={datagroup}/>
    </main>
    );
 
}
