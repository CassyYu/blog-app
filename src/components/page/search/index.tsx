import { Input } from '@arco-design/web-react';
import { useState } from 'react';
import { Article } from '../../../api/types';
import SearchList from './searchList';

const InputSearch = Input.Search;

export default function SearchPage({ data }: { data: Article[] }) {

	const [value, setValue] = useState('');

	return (
		<div className='flex flex-col items-center'>
			<InputSearch
				allowClear
				placeholder='Enter keyword to search'
				style={{ width: 350 }}
				className='m-8'
				onChange={value => setValue(value)}
			/>
			{value ? <SearchList value={value} data={data} /> : <></>}
		</div>
	)
}