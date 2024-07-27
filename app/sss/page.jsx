import React from 'react'
import FAQListView from '../components/FAQListView'

const BlogsPage = () => {
  return (
    <main
      id='page-root'
      className="w-full p-6 flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
    >
      {/* <CountCard icon={<StickyNote/>} name={"Blogs"} path={'Products'} /> */}
      <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1500px] m-auto" >Sık Sorulan Sorular</h1>
      <div className="inner">
        <FAQListView route={"sss"}/>
      </div>
    </main>
  )
}

export default BlogsPage
