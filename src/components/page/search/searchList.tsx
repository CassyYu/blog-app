import { List } from '@arco-design/web-react';
import DateTime from '../../../api/date.js';
import { Link } from 'react-router-dom';

function handleDate(p_date: string) {
	const date = new Date(parseInt(p_date));
	const Year = date.getFullYear();
	const Month = date.getMonth() + 1;
	const Day = date.getDate();
	const dateString = [Year, Month, Day].join('-');
	return dateString;
}

export default function SearchList({ value }: { value: string }) {
	return (
		<List
			bordered={false}
			wrapperStyle={{ width: 'auto' }}
			// dataSource={data.filter(item => item.title.indexOf(value) > 0 || item.brief.indexOf(value) > 0 || handleDate(item.p_date).indexOf(value) > 0)}
			render={(item, index) => (
				<Link to={'/post/' + item.id}>
					<List.Item key={index}>
						<List.Item.Meta
							title={
								<div className='text-lg hover:text-blue-600'>
									{item.title}
								</div>
							}
							description={
								<div className='flex flex-col'>
									<div className='my-1'>
										{item.brief}
									</div>
									<DateTime dateString={handleDate(item.p_date)} />
								</div>
							}
						/>
					</List.Item>
				</Link>
			)}
		/>
	)
}