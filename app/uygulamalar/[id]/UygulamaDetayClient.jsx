// src/app/temsilcilikler/[id]/TemsilciDetayClient.js
"use client";
import OneEventForm from '@/app/components/OneForm/OneApplicationForm';
import { useFormContext } from '@/lib/contexts/FormContext';
import Link from 'next/link';

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
    <div>
      <div>{docId}</div>
      <span>{docData?.title}</span>
      {isDoneAp ? (
        docData?.documents && (

          docData?.documents?.map((d,ddx)=>{
            return(
              <Link key={ddx} className='link btn' target="_blank" href={d?.url}>
                    {d?.filename}
                    <br></br>
                    Uygulama notunu indirebilirsiniz
            </Link>
            )
          })
        )
      ) : (
        <OneEventForm docData={docData} data={data} isLoading={isLoading} isDone={isDoneAp} error={error} onSubmit={handleCreateApplicationForm} handleData={handleData} route={"uygulamalar"} slug={docId}/>
      )}
      
    </div>
  );
}

export default UygulamaDetayClient;
