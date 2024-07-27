"use client";
import OneEventForm from '@/app/components/OneForm/OneEventForm';
import LoadingPage from '@/app/components/Page/LoadingPage';
import { useFormContext } from '@/lib/contexts/FormContext';
import { ArrowForwardIos } from '@mui/icons-material';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

function EtkinlikDetayClient({ id, docId, docdata }) {
  const [isExpired, setIsExpired] = useState(false);
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  const {
    data,
    isLoading,
    error,
    isDoneEv,
    handleCreateEventForm,
    handleData
} = useFormContext()

  useEffect(() => {
    if (docdata?.skt) {
      const currentDate = new Date();
      const sktDate = new Date(docdata.skt.seconds * 1000); // Convert Firebase timestamp to JavaScript Date
      setIsExpired(sktDate <= currentDate);
    }
  }, [docdata]);

  return (
    <section>
      <div className='max-w-[1500px] m-auto p-4 lg:p-0'>
        <div className="flex flex-col gap-4 lg:gap-12 py-4 lg:py-12">

          <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1500px] m-auto">
            {docdata?.title || ''}
          </h1>
          <div className='flex flex-col lg:flex-row gap-4 lg:gap-16 items-start justify-end'>
            
            {isClient&&<div className='flex-[1.5]'>
              <p dangerouslySetInnerHTML={{ __html: docdata?.content || '<p></p>' }}></p>
            </div>}
            
            <div className='flex flex-col gap-4 lg:gap-14 flex-1'>
              <img src={docdata?.images[0] || '/default.jpg'} alt="Image" />
            </div>
          </div>       
          {!isExpired && docdata?.event==="webinar" ? (
            docdata?.mainSource && (
              <Link 
              className='link-button bg-black !text-white px-4 py-2 lg:px-16 lg:py-6  rounded-full w-max' 
              target="_blank" href={docdata?.mainSource}>
                Kayıt Olmak İçin Tıklayın
              </Link>
        )
      ) : (
        docdata?.event!=="kongre-fuar"&&
        <Suspense fallback={<LoadingPage/>}>

          <OneEventForm 
            docData={docdata}
            data={data}
            isLoading={isLoading}
            isDone={isDoneEv}
            error={error}
            onSubmit={handleCreateEventForm}
            handleData={handleData}
            route={docdata?.event}
            slug={docId}
          />
        </Suspense>
      )}
      {docdata?.event==="kongre-fuar"&&<Link 
              className='link-button w-max' 
              target="_blank" href={docdata?.mainSource}>
                Kongre-Fuar Detayı İçin Tıklayın
                <ArrowForwardIos/>
              </Link>}
      </div>
      </div>
    </section>
  );
}

export default EtkinlikDetayClient;
