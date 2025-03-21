import {  useSectorById } from '@/lib/firebase/productGroups/read';
import React from 'react'
import LoadingPage from './Page/LoadingPage';
import { Tooltip } from '@mui/material';
import Link from 'next/link';

const SectorCardMini = ({id}) => {
    const { data, error, isLoading} = useSectorById(id);
    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>&#129488;</h1>
    }
  return (

    <Tooltip
        title={data?.title}
    >

        <Link href={`/sektorler/${data?.url}-${id}`} >
        <img src={data?.icon} className='w-10  object-contain z-50'/>
        </Link>
    </Tooltip>
  )
}

export default SectorCardMini