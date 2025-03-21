// src/app/temsilcilikler/[id]/page.js
import { getEventsBytype } from '@/lib/firebase/etkinlik/read_server';
import EtkinliklerListViews from '@/app/components/EtkinliklerListViews';



export default async function EtkinlikTypeList({params}) {

  const {type}=params;
  const data = await getEventsBytype(type);
  data&&data.sort((a, b) => (a.index || 0) - (b.index || 0));

  return (
        <div>
          <EtkinliklerListViews data={data} type={type} route={`etkinlikler/${type}`}/>
        </div>
);
 
}
