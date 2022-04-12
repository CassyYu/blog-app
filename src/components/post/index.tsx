import { Space } from '@arco-design/web-react';
import Guestbook from './guestbook';
import { IconBackward, IconTags } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import { getArticleById } from '../../api/servers';
import { Article } from '../../api/types';
import Page404 from '../page/404';
import createDOMPurify from 'dompurify';

export default function PostPage() {

	const [article, setArticle] = useState<Article>();

	const DOMPurify = createDOMPurify(window);
	const clean = DOMPurify.sanitize(article ? article.content : '');

	useEffect(() => {
		(async () => {
			const path = window.location.pathname;
			const post_id = parseInt(path.replace('/post/', ''));
			const res = await getArticleById(post_id);
			if (res.code === 0) setArticle(res.data)
		})()
	}, [])

	if (article) return (
		<div className='flex'>
			<div className='m-4 lg:mx-36 overflow-y-scroll w-full'>
				<div className=''>
					<IconBackward className='cursor-pointer' onClick={() => { window.history.back() }} />
				</div>
				<div className='text-3xl font-bold my-4'>{article.title}</div>
				<article>
					<div id='write' dangerouslySetInnerHTML={{ __html: clean }} />
				</article>
				<Space className='mt-8 text-gray-500'>
					<IconTags />
					{article.tags.split(' ').map((tag: string) => <span key={tag} style={{ fontSize: '0.75rem' }}>{tag}</span>)}
				</Space>
				<Guestbook />
			</div>
		</div >
	)
	else return (
		<div>
			<Page404 />
		</div>
	)
}