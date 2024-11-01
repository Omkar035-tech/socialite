import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { userDataSelect } from "@/lib/types"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import UserAvatar from "./UserAvatar"
import { Button } from "./ui/button"
import { unstable_cache } from "next/cache"
import { formatNumber } from "@/lib/utils"


const TrendsSidebar = () => {
    return (
        <div className="sticky top-[5.25rem] md:block hidden lg:w-80 w-72 h-fit flex-none space-y-5 ">
            <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
                <FollowSuggetions />
                <TrendingHashTags />
            </Suspense>
        </div>
    )
}

export default TrendsSidebar



export const FollowSuggetions = async () => {
    const { user } = await validateRequest();

    if (!user) return null;

    const followSuggest = await prisma.user.findMany({
        where: {
            NOT: {
                id: user.id
            }
        },
        select: userDataSelect,
        take: 5
    })

    return (
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="text-xl font-bold">
                You make like to follow
            </div>
            {followSuggest.map((user) => (
                <div key={user.id} className="flex items-center justify-between gap-3">
                    <Link href={`/users/${user.username}`}
                        className="flex items-center gap-3">
                        <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
                        <div>
                            <p className="line-clamp-1 break-all font-semibold hover:underline">
                                {user.displayName}
                            </p>
                            <p className="line-clamp-1 break-all text-muted-foreground">
                                @{user.username}
                            </p>
                        </div>
                    </Link>
                    <Button>Follow</Button>
                </div>
            ))}
        </div>
    )
}

const getTrendingTopics = unstable_cache(
    async () => {
        const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
        SELECT LOWER(unnest(regexp_matches(content,'#[[:alnum:]_]+','g'))) AS hashtag, COUNT(*) AS count
        FROM posts
        GROUP BY (hashtag)
        ORDER BY count DESC,hashtag ASC
        LIMIT 5
        `;

        return result.map(row => ({
            hashtag: row.hashtag,
            count: Number(row.count)
        }))
    },
    ['hashtag_topics'],
    {
        revalidate: 3 * 60 * 60,
    }
)


export const TrendingHashTags = async () => {

    const hashtagTopics = await getTrendingTopics();

    return (
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="text-xl font-bold">
                Trending Topics
            </div>
            {
                hashtagTopics.map(({ hashtag, count }) => {
                    const title = hashtag.split("#")[1];

                    return (
                        <Link key={title} href={`/hashtag/${title}`} className="block">
                            <p className="line-clamp-1 break-all font-semibold hover:underline">
                                {hashtag}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {formatNumber(count)} {count === 1 ? "post" : "posts"}
                            </p>
                        </Link>
                    )
                })
            }
        </div>
    )
}