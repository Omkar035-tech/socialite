import PostEditor from '@/components/posts/editor/PostEditor'
import TrendsSidebar from '@/components/TrendsSidebar'
import React from 'react'
import ForYouFeed from './ForYouFeed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FollowingFeed from './FollowingFeed'

const Home = async () => {

  return (
    <main className='flex gap-5 w-full min-w-0'>
      <div className='w-full min-w-0 space-y-5'>
        <PostEditor />
        <Tabs defaultValue='for-you'>
          <TabsList>
            <TabsTrigger value='for-you'>For you</TabsTrigger>
            <TabsTrigger value='following'>Following</TabsTrigger>
          </TabsList>
          <TabsContent value='for-you'>
            <ForYouFeed />
          </TabsContent>
          <TabsContent value='following'>
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  )
}

export default Home