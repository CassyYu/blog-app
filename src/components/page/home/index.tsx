import { List } from '@arco-design/web-react';
import CardItem from './cardItem';
import { Article } from '../../../api/types';

export default function HomePage({ data }: { data: Article[] }) {
	return (
		<List
			className='my-2'
			grid={{
				sm: 24,
				md: 12,
				xl: 8,
			}}
			header={<span className='-mx-2'>热门文章</span>}
			wrapperClassName='flex-grow sm:mx-8'
			size='small'
			bordered={false}
		>
			{data?.map((item: Article, index: number) =>
				<List.Item
					key={index}
					style={{ padding: 0 }}
				>
					<CardItem item={item} />
				</List.Item>
			)}
		</List>
	)
}