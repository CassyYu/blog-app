import axios from './axios'
import { Article, TagObj } from './types';

export async function getUser() {
	const res = await axios.get('/user/verify');
	const { code } = res.data;
	if (code === 0) {
		const { login, user } = res.data.data;
		return {
			code: 0,
			data: { login, user }
		}
	} else {
		return {
			code: 1,
			message: '请先登录'
		}
	}
}

export async function getSortedArticles(sortBy: string, limit = 10, offset = 0) {
	// sortedBy time or hot
	const res = await axios.post('/getSortedArticles', { sortBy, limit, offset });
	const { articles } = res.data.data;
	return {
		code: 0,
		data: articles
	};
}

export async function getArticlesByState(state: number, limit = 10, offset = 0) {
	const res = await axios.post('/getArticlesByState', { state, limit, offset });
	const { articles } = res.data.data;
	return {
		code: 0,
		data: articles
	};
}

export async function getArticlesByValue(value: string, limit: number, offset: number) {
	const res = await axios.post('/getArticlesByValue', { value, limit, offset });
	const { articles } = res.data.data;
	return {
		code: 0,
		data: articles
	};
}

export async function getArticlesByTag(tag: string, limit = 10, offset = 0) {
	const res = await axios.post('/getArticlesByTag', { tag, limit, offset });
	let { articles } = res.data.data;
	if (tag !== '0' && tag !== '') articles = articles.filter((e: any) => e.tags === tag);
	return {
		code: 0,
		data: articles
	};
}

export async function getArticleById(post_id: number) {
	const res = await axios.post('/getArticleById', { id: post_id });
	const { code } = res.data
	if (code === 0) {
		const { article } = res.data.data;
		return {
			code: 0,
			data: article
		};
	} else {
		return {
			code: 1,
			message: res.data.message
		}
	}
}

export async function getTags(limit = 10, offset = 0) {
	const res = await axios.post('/getArticles');
	const { articles } = res.data.data;
	let tagMap = new Map();
	articles?.forEach((article: Article) => {
		const tagArr = article.tags.split(' ');
		tagArr.forEach(tag => {
			let num = 0;
			if (tagMap.has(tag)) num = tagMap.get(tag);
			tagMap.set(tag, num + 1);
		})
	})
	let tagsArr: TagObj[] = [];
	tagMap.forEach((value, key) => tagsArr.push({ value: value, key: key }))
	tagsArr.sort((a: TagObj, b: TagObj) => b.value - a.value);
	return tagsArr;
}

export async function getCommentsByPostId(post_id: number) {
	const res = await axios.post('/getCommentsByPostId', { post_id })
	const { comments } = res.data.data;
	return {
		code: 0,
		data: comments
	}
}

export async function postComment(post_id: number, reply_id: number | undefined, content: string) {
	const p_time = Date.now();
	const level = reply_id ? null : 1;
	const res = await axios.post('/postComment', { post_id, reply_id, p_time, content, level })
	if (res.data.code === 0) return {
		code: 0,
		message: '评论成功'
	}
	else return {
		code: 1,
		message: '评论失败'
	}
}