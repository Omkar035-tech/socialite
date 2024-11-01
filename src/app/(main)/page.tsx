import PostEditor from '@/components/posts/editor/PostEditor'
import TrendsSidebar from '@/components/TrendsSidebar'
import React from 'react'
import ForYouFeed from './ForYouFeed'

const Home = async () => {

  return (
    <main className='flex gap-5 w-full min-w-0'>
      <div className='w-full min-w-0 space-y-5'>
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  )
}

export default Home