import { useBrandById } from '@/lib/firebase/productGroups/read';
import React from 'react'
import LoadingPage from './Page/LoadingPage';

const BrandCardMini = ({id}) => {
    const { data, error, isLoading} = useBrandById(id);
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
    <div
        className='absolute left-[4px] top-[4px]  !bg-white'
    >
        <img src={data?.images[0]} className='w-20 object-contain z-50 m-2'/>
    </div>
  )
}

export default BrandCardMini