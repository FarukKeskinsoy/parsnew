import React from 'react'
import SectorsListView from '../components/SectorsListViews'
import ServiceRequestButtonBanner from '../components/ServiceRequestButtonBanner/ServiceRequestButtonBanner'
import SatisSonrasiDestekPage from '../components/Page/SatisSonrasiDestekPage'
import OnePage from '../components/Page/OnePage'
import OnePageWhole from '../components/Page/OnePageWhole'
import OnePageWholeServis from '../components/Page/OnePageWholeServis'

const Page = () => {
  return (
    <div>
        <OnePageWholeServis route={"Pages/servis"}/>
        <ServiceRequestButtonBanner/>
    </div>
  )
}

export default Page