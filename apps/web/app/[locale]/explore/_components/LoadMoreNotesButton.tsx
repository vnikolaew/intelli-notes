import { Button } from "@/components/ui/button";
import React, { Fragment } from "react";
import { Loader2 } from "lucide-react";

export const LoadMoreNotesButton = ({ loading, onLoadMore }: { loading: boolean; onLoadMore: () => void }) => (
   <div className={`col-span-3 col-start-1 w-full flex items-center justify-center mt-8`}>
      <Button className={`items-center gap-2`} disabled={loading} onClick={onLoadMore} variant={`default`}>
         {loading ? (
            <Fragment>
               <Loader2 className={`animate-spin`} size={14} />
               Loading ...
            </Fragment>
         ) : `Load more`}
      </Button>
   </div>
);