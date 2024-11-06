"use client"

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer"
import Post from "@/components/posts/Post"
import PostLoadingSkeloton from "@/components/posts/PostLoadingSkeloton"
import kyInstance from "@/lib/ky"
import { PostPage } from "@/lib/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

const FollowingFeed = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["post-feed", "following"],
        //queryFn: kyInstance.get("/api/posts/selffeed").json<PostData[]>,
        queryFn: ({ pageParam }) => kyInstance.get(
            "/api/posts/following",
            pageParam ? { searchParams: { cursor: pageParam } } : {}
        ).json<PostPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastpage) => lastpage.nextCursor
    });
    const posts = data?.pages.flatMap(page => page.posts) || [];

    if (status === "pending") {
        return <PostLoadingSkeloton />
    }

    if (status === "success" && !posts.length && !hasNextPage) {
        return <p className="text-center text-muted-foreground">
            No posts found. Start following peoples to see posts
        </p>
    }

    if (status === "error") {
        return <p className="text-center text-destructive">
            An error occured while loading posts.
        </p>
    }

    return <InfiniteScrollContainer className="space-y-5"
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
        {posts.map((post) => (
            <Post key={post.id} post={post} />
        ))}
        {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}

    </InfiniteScrollContainer>
}

export default FollowingFeed