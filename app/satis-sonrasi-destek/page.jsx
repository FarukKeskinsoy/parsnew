import React from 'react'
import SectorsListView from '../components/SectorsListViews'
import ServiceRequestButtonBanner from '../components/ServiceRequestButtonBanner/ServiceRequestButtonBanner'
import SatisSonrasiDestekPage from '../components/Page/SatisSonrasiDestekPage'
import OnePage from '../components/Page/OnePage'

const Page = () => {
  return (
    <div>
        <OnePage route={"Pages/satis-sonrasi-destek"}/>
        <ServiceRequestButtonBanner/>
    </div>
  )
}

export default Page