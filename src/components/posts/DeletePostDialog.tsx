import { PostData } from "@/lib/types"
import { useDeletePostMutation } from "./mutation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import LoadingButton from "../LoadingButtion";
import { Button } from "../ui/button";


interface DeletePostDialogProp {
    post: PostData,
    open: boolean,
    onClose: () => void;
}

const DeletePostDialog = ({
    post,
    open,
    onClose
}: DeletePostDialogProp) => {
    const mutation = useDeletePostMutation();

    function handleOpenChange(open: boolean) {
        if (!open || !mutation.isPending) {
            onClose();
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Post?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <LoadingButton variant='destructive' onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
                        loading={mutation.isPending}>
                        Delete
                    </LoadingButton>
                    <Button variant='outline' onClick={onClose} disabled={mutation.isPending}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default DeletePostDialog