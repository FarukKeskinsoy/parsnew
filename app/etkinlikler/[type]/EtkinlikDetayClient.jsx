"use client";
import OneEventForm from '@/app/components/OneForm/OneEventForm';
import { useFormContext } from '@/lib/contexts/FormContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function EtkinlikDetayClient({ id, docId, docdata }) {
  const [isExpired, setIsExpired] = useState(false);
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
    <div>
      <div>{docId}</div>
      <span>{docdata?.title}</span>
      {!isExpired ? (
        docdata?.mainSource && (
          <Link className='link btn' target="_blank" href={docdata?.mainSource}>
            Kayıt Olmak İçin Tıklayın
          </Link>
        )
      ) : (
        <OneEventForm docData={docdata} data={data} isLoading={isLoading} isDone={isDoneEv} error={error} onSubmit={handleCreateEventForm} handleData={handleData} route={"webinar"} slug={docId}/>
      )}
    </div>
  );
}

export default EtkinlikDetayClient;
