import { List, Space } from '@arco-design/web-react';
import { IconClockCircle, IconEye, IconHeart, IconMessage } from '@arco-design/web-react/icon';
import DateTime from '../../../api/date.js';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticlesByTag, getTags } from '../../../api/servers';

function handleDate(p_time: number) {
	const date = new Date(p_time);
	const Year = date.getFullYear();
	const Month = date.getMonth() + 1;
	const Day = date.getDate();
	const dateString = [Year, Month, Day].join('-');
	return dateString;
}

export default function TagsList() {

	const [data, setData] = useState();

	useEffect(() => {
		(async () => {
			const query = window.location.search;
			const tagsArr = await getTags();
			let tag = query ? query.replace('?tag=', '') : '';
			if (tag !== '0' && tag !== '') tag = tagsArr[parseInt(tag)-1].key;
			const res1 = await getArticlesByTag(tag);
			setData(res1.data);
		})()
	}, [])

	return (
		<List
			bordered={true}
			pagination={{
				pageSize: 5,
				showJumper: true
			}}
			dataSource={data}
			render={(item, index) => (
				<Link to={'/post/' + item.id} key={index}>
					<List.Item
						style={{ padding: '20px', borderBottom: '1px solid var(--color-fill-3)' }}
						actionLayout='vertical'
						actions={[
							<Space size='mini' key={1}>
								<IconEye />{item.view}
							</Space>,
							<Space size='mini' key={2}>
								<IconHeart />{item.like}
							</Space>,
							<Space size='mini' key={3}>
								<IconMessage />{item.comment}
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
										<IconClockCircle /><DateTime dateString={handleDate(item.p_time)} />
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