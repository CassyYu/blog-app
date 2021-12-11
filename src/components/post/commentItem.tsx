import { Avatar, Comment } from "@arco-design/web-react";
import { IconHeart, IconHeartFill, IconMessage } from "@arco-design/web-react/icon";
import { useState } from "react";
import { CommentType } from "../../api/types";

export default function CommentItem({ comment, level, replyId, setReplyId }: { comment: CommentType, level: number, replyId: number | undefined, setReplyId: React.Dispatch<React.SetStateAction<number | undefined>> }) {

	const [like, setLike] = useState(false);

	const actions = [
		<span
			className='cursor-pointer'
			key='heart'
			onClick={() => setLike(!like)}
		>
			{like ? <IconHeartFill style={{ color: '#f53f3f' }} /> : <IconHeart />}
			{' '}{comment.like + (like ? 1 : 0)}
		</span>,
		level === 1 ?
			<span
				className='cursor-pointer'
				key='reply'
				onClick={() => {
					replyId === comment.id ? setReplyId(undefined) : setReplyId(comment.id)
				}}
			>
				<IconMessage /> Reply
			</span> : <></>

	];

	return (
		<Comment
			actions={actions}
			align='right'
			author={comment.email}
			avatar={
				<Avatar style={{ backgroundColor: '#3190ef' }}>{comment.email[0].toUpperCase()}</Avatar>
			}
			content={
				<div>{comment.content}</div>
			}
			datetime={comment.p_time}
		/>
	)
}