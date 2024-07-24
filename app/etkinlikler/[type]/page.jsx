// src/app/temsilcilikler/[id]/page.js
import { getEventsBytype } from '@/lib/firebase/etkinlik/read_server';
import EtkinliklerListViews from '@/app/components/EtkinliklerListViews';



export default async function EtkinlikTypeList({params}) {

  const {type}=params;
  const data = await getEventsBytype(type);
  console.log(data)

  return (
        <div>
          <EtkinliklerListViews data={data} type={type} route={`etkinlikler/${type}`}/>
        </div>
);
 
}
