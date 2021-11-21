import { Radio, Button } from '@arco-design/web-react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Article } from '../../../api/types';
import ManageList from './manageList';

export default function ManagePage({ data }: { data: Article[] }) {

	const [state, setState] = useState('all');

	return (
		<div className='m-8 overflow-hidden'>
			<div className='flex justify-between'>
				<Radio.Group
					type='button'
					name='lang'
					defaultValue='all'
					style={{ marginRight: 20, marginBottom: 20 }}
					onChange={value => setState(value)}
				>
					<Radio value='all'>全部 {data?.length}</Radio>
					<Radio value='public'>公开 {data?.filter((data: Article) => data.state === 'public').length}</Radio>
					<Radio value='private'>私密 {data?.filter((data: Article) => data.state === 'private').length}</Radio>
					<Radio value='draw'>草稿 0</Radio>
				</Radio.Group>
				<Link to='/editor'>
					<Button type='primary'>写文章</Button>
				</Link>
			</div>
			<ManageList data={data.filter(item => state === 'all' ? true : item.state === state)} />
		</div>
	)
}