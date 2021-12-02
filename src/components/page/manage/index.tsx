import { Radio, Button, Empty } from '@arco-design/web-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Article } from '../../../api/types';
import ManageList from './manageList';
import { getArticlesByState } from '../../../api/servers';

export default function ManagePage() {

	const [state, setState] = useState(window.location.search ? parseInt(window.location.search.replace('?state=', '')) : 0);
	const [articles, setArticles] = useState<Article[]>();

	useEffect(() => {
		(async () => {
			const res = await getArticlesByState(1);
			setArticles(res.data)
		})()
	}, [])

	return (
		<div className='m-8 overflow-hidden'>
			<div className='flex justify-between'>
				<Radio.Group
					type='button'
					name='lang'
					defaultValue={state.toString()}
					style={{ marginRight: 20, marginBottom: 20 }}
					onChange={value => {
						setState(value);
						window.location.search = `state=${value}`;
					}}
				>
					<Radio value='0'>全部 {articles?.length}</Radio>
					<Radio value='1'>公开 {articles?.filter((article: Article) => article.state === 1).length}</Radio>
					<Radio value='2'>私密 {articles?.filter((article: Article) => article.state === 2).length}</Radio>
					<Radio value='3'>草稿 {articles?.filter((article: Article) => article.state === 3).length}</Radio>
				</Radio.Group>
				<Link to='/editor'>
					<Button type='primary'>写文章</Button>
				</Link>
			</div>
			{articles
				? <ManageList state={state} />
				: <Empty />}
		</div>
	)
}