import { List, Space } from '@arco-design/web-react';
import { IconClockCircle, IconEye, IconHeart, IconMessage } from '@arco-design/web-react/icon';
import { Article } from '../../../api/types';
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

export default function TagsList({ data }: { data: Article[] }) {
	return (
		<List
			bordered={true}
			pagination={{
				pageSize: 5,
				showJumper: true
			}}
			dataSource={data}
			render={(item, index) => (
				<Link to={'/post/' + item.title}>
					<List.Item
						key={index}
						style={{ padding: '20px', borderBottom: '1px solid var(--color-fill-3)' }}
						actionLayout='vertical'
						actions={[
							<Space size='mini' key={1}>
								<IconEye />{83}
							</Space>,
							<Space size='mini' key={2}>
								<IconHeart />{83}
							</Space>,
							<Space size='mini' key={3}>
								<IconMessage />{1}
							</Space>,
						]}
						extra={
							<img alt='cover' src={item.cover} className='h-32 rounded-sm bg-cover' />
						}
					>
						<List.Item.Meta
							title={
								<div className='text-xl flex-1'>
									{item.title}
								</div>
							}
							description={
								<>
									<div className='my-2 text-gray-800'>
										{item.brief}
									</div>
									<div className='mt-2'>
										<IconClockCircle /><DateTime dateString={handleDate(item.p_date)} />
									</div>
								</>
							}
						/>
					</ List.Item>
				</Link>
			)}
		/>
	)
}