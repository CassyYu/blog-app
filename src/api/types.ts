export type Article = {
	title: string,
	brief: string,
	content: string,
	tags: string,
	cover: string,
	state: string,
	p_date: string,
	e_date: string
}

export type TagObj = {
	value: number,
	key: string
}

export type Context = {
	value: string,
	setState: React.Dispatch<React.SetStateAction<string>>
}