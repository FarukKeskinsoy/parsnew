// src/app/temsilcilikler/[id]/TemsilciDetayClient.js
"use client";
import OneEventForm from '@/app/components/OneForm/OneApplicationForm';
import { useFormContext } from '@/lib/contexts/FormContext';
import { Download } from '@mui/icons-material';
import Link from 'next/link';
import { Suspense } from 'react';

function UygulamaDetayClient({ id, docId, docData }) {
  const {
    data,
    isLoading,
    error,
    isDoneAp,
    handleCreateApplicationForm,
    handleData
} = useFormContext()

  return (
    <Suspense fallback={<div>...</div>}>

<main 
            className="w-full flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
        >    {isDoneAp && <h3 className="text-green-500 mb-4">Form Başarıyla Gönderildi !</h3>}

      {isDoneAp ? (
        docData?.documents && (

          docData?.documents?.map((d,ddx)=>{
            return(
              <Link 
                key={ddx} 
                className='bg-blue-500 !text-white flex max-w-[300px] items-center gap-4  rounded-md px-4 py-2 text-sm hover:shadow-md' 
                target="_blank" 
                href={d?.url}
              >
                  <div className='flex flex-col gap-2'>
                    <p className='text-center'>{d?.filename}</p> 
                    <p>Uygulama notunu indirebilirsiniz</p>
                  </div>
                    <Download/>
              </Link>
            )
          })
        )
      ) : (
        <OneEventForm docData={docData} data={data} isLoading={isLoading} isDone={isDoneAp} error={error} onSubmit={handleCreateApplicationForm} handleData={handleData} route={"uygulamalar"} slug={docId}/>
      )}
      
    </main>
    </Suspense>
  );
}

export default UygulamaDetayClient;
