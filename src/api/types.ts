export type Article = {
	id: number,
	title: string,
	brief: string,
	content: string,
	tags: string,
	cover: string,
	state: number,
	view: number,
	like: number,
	comment: number,
	p_time: number,
	e_time: number
}

export type TagObj = {
	value: number,
	key: string
}

export type CommentType = {
	id: number,
	post_id: number,
	user_id: number,
	email: string,
	content: string,
	like: number,
	reply: number,
	p_time: number,
	level: number | null,
	reply_id: number | null,
	replies: Array<CommentType>
}
