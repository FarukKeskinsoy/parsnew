'use client'

import { useAuth } from '@/lib/contexts/AuthContext'
import Link from 'next/link'
import React from 'react'

const LoginButton = () => {
const {
    user,
    isLoading,
    error,
    handleSignInWithGoogle,
    handleLogout
}=useAuth()

if(isLoading){
    return(
        <h5>Yükleniyor</h5>
    )
}
if(user){
    return(
        <div className='flex gap-4 items-center'>
            <button
                className='flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full'
                onClick={()=>{handleLogout()}}
            >
                Logout
            </button>
            <Link href="/admin">
                <div className='flex gap-4 rounded-xl bg-blue-100 px-3 py-2' >
                    <img className='object-cover h-12 w-12 rounded-full' src={user?.photoURL} alt='' />
                    <div>
                        <h1 className='font-semibold'>{user?.displayName}</h1>
                        <h1 className='text-sm text-gray-500'>{user?.email}</h1>
                    </div>
                </div>
            </Link>
        </div>
    )
}
  return (
    <section>
        <button 
            onClick={()=>{ handleSignInWithGoogle() }}
            className='flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full'
         >
            Giriş Yap
        </button>
    </section>
  )
}

export default LoginButton