import React from 'react'
import SectorsListView from '../components/SectorsListViews'
import OnePage from '../components/Page/OnePage'

const SectorsPage = () => {
  return (
    <div>
      <OnePage route={"HomePages/sektorler"} />
      <SectorsListView/>
    </div>
  )
}

export default SectorsPage