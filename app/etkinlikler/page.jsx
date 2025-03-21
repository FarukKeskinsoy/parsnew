import React from 'react'
import OnePage from '../components/Page/OnePage'
import ListComponent from './ListComponent'
import OnePageWhole from '../components/Page/OnePageWhole'

const Page = () => {
  return (
    <div className='pb-16'>
      <OnePageWhole route={"HomePages/etkinlikler"} />
      <ListComponent/>      
    </div>
  )
}

export default Page
