import { cn, fetcher, GetUniqueById } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { AnimatePresence, motion } from "framer-motion";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import api from "@/constants/api";
import { Skeleton } from "@/components/ui/skeleton";
import CommentBlock from "./comment-block";
import updateCommentsLikes from "@/lib/comments/updateCommentsLikes";
import { useState, useEffect } from "react";
import { useStorage } from "@/hooks/contexts/session";
import NoContent from "../../no-content";

export default function CommentsBlock({
	inputFocus,
	setCommentsCount,
	commentsCount,
	className,
	id = "commentsScroll",
	comments,
	setComments,
	postId,
    isPostModal,
	setOpen,
	setSheetOpen,
	setClickedUser
}) {
	const [page, setPage] = useState(1);
	const urlKey = postId ? `${api.v1}/comment/get?post_id=${postId}&page=${page}` : null;
    const { token, store } = useStorage();

	const {
		data: commentsRequest,
		error: error,
		isLoading: isLoading,
	} = useCacheFetcher(urlKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => {
		if (commentsRequest?.success && !error) {
			setComments(prev => GetUniqueById([...prev, ...commentsRequest.success]));
			setCommentsCount(Number(commentsRequest?.count));
		}
	}, [commentsRequest, error]);

	return (
		<ul
			id={id}
			data-shadowed={inputFocus}
			className={cn(
				"w-full duration-200 !h-[31.5rem] overflow-y-auto ease-out data-[shadowed=true]:opacity-40 px-5 relative pb-[5.5rem] flex flex-col gap-5",
				className
			)}
		>
			{!isLoading ? (
				comments?.length > 0 ? (
<InfiniteScroll
					hasMore={comments?.length < Number(commentsCount)}
					dataLength={Number(commentsCount)}
					next={() => (comments?.length < Number(commentsCount) ? setPage(page + 1) : null)}
					scrollableTarget={id}
					className='flex flex-col gap-5'
				>
					<AnimatePresence>
						{comments?.map((comment, index) => (
							<motion.li
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								layout
                                data-postModal={isPostModal}
								className='flex origin-center data-[postModal=true]:bg-card data-[postModal=true]:rounded-[1.25rem] data-[postModal=true]:p-4 flex-col gap-2'
							>
								<CommentBlock
									id={comment.id}
									setOpen={(data) => {setOpen(data); setClickedUser(comment.author)}}
									setSheetOpen={setSheetOpen}
									user={comment.author}
									content={comment.text}
									likes={comment.likes}
									liked={comment.liked}
									date={comment.date}
									updateComment={async (id, likes, liked) => setComments(updateCommentsLikes(comments, id, likes, liked))}
								/>
							</motion.li>
						))}
					</AnimatePresence>
				</InfiniteScroll>
				) : (
					<NoContent title="No comments here yet" primary="Be the first to write a comment" className="h-full animate-[fadeIn_0.3s_ease-out]" image="comment.png"/>
				)
				
			) : (
				<>
					{Array.from({ length: 10 }, (_, i) => i).map(index => (
						<Skeleton key={index} className='w-full rounded-3xl min-h-32' />
					))}
				</>
			)}
		</ul>
	);
}
