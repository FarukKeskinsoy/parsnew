import React from 'react'
import BlogsListView from '../components/BlogsListViews'
import { useSectors } from '@/lib/firebase/sector/read'
import SectorsListSelect from '../components/SectorsListSelect'
import CountCard from '../components/Cards/CountCard'
import { StickyNote } from 'lucide-react'

const BlogsPage = () => {
  return (
    <div>
      {/* <CountCard icon={<StickyNote/>} name={"Blogs"} path={'Products'} /> */}
      <SectorsListSelect/>
      <BlogsListView/>
    </div>
  )
}

export default BlogsPage
