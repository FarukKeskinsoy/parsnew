import { getOneSector } from "@/lib/firebase/sector/read_server";
import SectorDetayClient from "./SectorDetayClient";


export default async function SektorDetay({params}){
  const { id } = params
  if (!id) {
    return <div>Invalid ID</div>;
  }

  const strArr = id.split("-");
  const docId = strArr[strArr.length - 1];
  const data = await getOneSector(docId);

  return (
    <div>
        <SectorDetayClient id={id} docId={docId} data={data}/>
    </div>
  )
}
