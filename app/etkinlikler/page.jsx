import React from 'react'
import OnePage from '../components/Page/OnePage'
import ListComponent from './ListComponent'

const Page = () => {
  return (
    <div className='pb-16'>
      <OnePage route={"HomePages/etkinlikler"} />
      <ListComponent/>      
    </div>
  )
}

export default Page
