import React from 'react'
import ProductGroupsListView from '../components/ProductGroupsListView'

const ProductGroupsPage = () => {
  return (
    <div>
      {/* <CountCard icon={<StickyNote/>} name={"Blogs"} path={'Products'} /> */}
      <ProductGroupsListView route={"urun-gruplari"}/>
    </div>
  )
}

export default ProductGroupsPage
