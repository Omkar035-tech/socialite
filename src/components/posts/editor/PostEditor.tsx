"use client"

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import UserAvatar from '@/components/UserAvatar'
import { useSession } from '@/app/(main)/SessionProvider'
import './styles.css'
import useSubmitPostMutation from './mutations'
import LoadingButton from '@/components/LoadingButtion'

const PostEditor = () => {

    const { user } = useSession();

    const mutation = useSubmitPostMutation();


    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            Placeholder.configure({
                placeholder: "Start Typing about this Post"
            })
        ],
    });

    const input = editor?.getText({
        blockSeparator: "\n",
    }) || "";

    const onSubmit = async () => {
        mutation.mutate(input, {
            onSuccess: () => {
                editor?.commands.clearContent();
            }
        })
        editor?.commands.clearContent();

    }

    return (
        <div className='flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm'>
            <div className='flex gap-5'>
                <UserAvatar avatarUrl={user.avatarUrl} className='hidden sm:inline' />
                <EditorContent
                    editor={editor}
                    className='w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3 outline-none' />
            </div>
            <div className='flex justify-end'>
                <LoadingButton
                    onClick={onSubmit}
                    loading={mutation.isPending}
                    disabled={!input.trim()}
                    className='min-w-20'>
                    Post
                </LoadingButton>
            </div>
        </div>
    )
}

export default PostEditor