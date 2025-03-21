import React from 'react'
import OnePage from '../components/Page/OnePage'
import Trapezoid from '../components/Trapezoid'
import OnePageWhole from '../components/Page/OnePageWhole'
import MissionVision from '../components/MissionVision'

const Page = () => {
  return (
    <div>
        <OnePageWhole route={"Pages/hakkimizda"}/>
        <MissionVision/>
        {/* <Trapezoid/> */}
    </div>
  )
}

export default Page
