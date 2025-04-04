import Image from "next/image"
import DefaultAvatar from '@/assets/avatar.webp'
import { cn } from "@/lib/utils"


interface UserAvatarProps {
    avatarUrl: string | null | undefined
    size?: number
    className?: string
}


const UserAvatar = ({ avatarUrl, size, className }: UserAvatarProps) => {
    return (
        <Image
            src={avatarUrl || DefaultAvatar}
            alt='User avatar'
            width={size ?? 48}
            height={size ?? 48} 
            className={cn("aspect-square h-fit flex-none rounded-full bg-secondary object-cover",className)}/>
    )
}

export default UserAvatar