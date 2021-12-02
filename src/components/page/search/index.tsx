import { Input } from '@arco-design/web-react';
import { useState, useEffect } from 'react';
import SearchList from './searchList';
import { getSortedArticles } from '../../../api/servers';
import { Article } from '../../../api/types';

const InputSearch = Input.Search;

export default function SearchPage() {

	const [value, setValue] = useState('');
	const [data, setData] = useState<Article[]>();

	useEffect(() => {
		(async () => {
			const res = await getSortedArticles('hot');
			setData(res.data)
		})()
	}, [])

	return (
		<div className='flex flex-col items-center'>
			<InputSearch
				allowClear
				placeholder='Enter keyword to search'
				style={{ width: 350 }}
				className='m-8'
				onChange={value => setValue(value)}
			/>
			{value ? <SearchList value={value} /> : <></>}
		</div>
	)
}