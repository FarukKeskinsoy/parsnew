import React from 'react'
import OnePage from '../components/Page/OnePage'
import ListComponent from './ListComponent'

const Page = () => {
  return (
    <div>
      <OnePage route={"HomePages/etkinlikler"} />
      <ListComponent/>      
    </div>
  )
}

export default Page
