"use client";
import { Note, NoteComment, NoteLike } from "@repo/db";
import React, { Fragment, useState } from "react";
import { Row } from "@repo/ui/components";
import UserAvatar from "components/common/UserAvatar";
import NoteCard from "../../notes/_components/NoteCard";
import NoteCommentsCount from "./NoteCommentsCount";
import NoteLikeButton from "./NoteLikeButton";
import { useSession } from "next-auth/react";
import { Button } from "components/ui/button";
import { GetExplorePageNotesResponse } from "../../api/notes/explore/route";
import { useBoolean } from "hooks/useBoolean";
import { Loader2 } from "lucide-react";

export interface ExploreNotesGridProps {
   notes: (Note & { author: { name: string; image: string }, comments: NoteComment[], likes: NoteLike[] })[];
}

const ExploreNotesGrid = ({ notes }: ExploreNotesGridProps) => {
   const session = useSession();
   const [loading, setLoading] = useBoolean();
   const [currentNotes, setCurrentNotes] = useState(notes);
   const [hasMore, setHasMore] = useBoolean(true)

   function handleLoadMore() {
      const lastNoteTimestamp = notes.at(-1).createdAt.getTime();
      setLoading(true)
      fetch(`/api/notes/explore?timestamp=${lastNoteTimestamp}&limit=20`, {
         headers: {
            Accept: `application/json`,
         },
      }).then(res => res.json() as Promise<GetExplorePageNotesResponse>)
         .then(res => {
            if (res.success && res.notes?.length) {
               setCurrentNotes(n => [...n, ...res.notes]);
               setHasMore(res.notes?.length === 20)
            }
         })
         .catch(console.error).finally(() => setLoading(false));
   }

   return (
      <div className={`mt-4 grid grid-cols-3 gap-8`}>
         {currentNotes.map(({ author, ...note }, index) => (
            <div className={`flex flex-col items-start gap-4 min-w-[300px]`} key={note.id}>
               <Row className={`justify-start`}>
                  <UserAvatar alt={author.name} imageSrc={author.image} />
                  <span className={`text-muted-foreground`}>{author.name}</span>
               </Row>
               <NoteCard showComments className={`!w-full`} showButtons={false} note={note} />
               <div className={`flex items-center justify-end gap-4 w-full`}>
                  <NoteCommentsCount count={note.comments.length} />
                  <NoteLikeButton
                     note={note}
                     total={note.likes.length}
                     hasUserLiked={note.likes.some(l => l.userId === session?.data?.user?.id)} />
               </div>
            </div>
         ))}
         {hasMore && (
            <div className={`col-span-3 col-start-1 w-full flex items-center justify-center mt-8`}>
               <Button className={`items-center gap-2`} disabled={loading} onClick={handleLoadMore} variant={`default`}>
                  {loading ? (
                     <Fragment>
                        <Loader2 className={`animate-spin`} size={14} />
                        Loading ...
                     </Fragment>
                  ) : `Load more`}
               </Button>
            </div>
         )}
      </div>
   );
};

export default ExploreNotesGrid;