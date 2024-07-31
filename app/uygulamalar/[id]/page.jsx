import UygulamaDetayClient from './UygulamaDetayClient';
import { getOneApplicationServer } from '@/lib/firebase/application/read_server';

export default async function UygulamaDetay({params}){
  const { id } = params
  if (!id) {
    return <div>ID anlaşılmadı. &#129488;</div>;
  }

  const strArr = id.split("-");
  const docId = strArr[strArr.length - 1];
  const data = await getOneApplicationServer(docId);

  return (
    <main 
    className="w-full p-6 flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
  >
          <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1300px] m-auto" >{data?.title}</h1>
          <div className="inner flex-col gap-8 lg:gap-12 !items-start">

          <div className='relative flex flex-col lg:flex-row items-start gap-8'>
              {data?.images&&data?.images.length>0&&<img src={data?.images[0]} className='h-[400px] object-cover p-6 border rectangleImg' />}
              <p className='flex-1'>{data?.preface}</p>
          </div>

        <UygulamaDetayClient id={id} docId={docId} docData={data}/>
      </div>
    </main>
  )
}

