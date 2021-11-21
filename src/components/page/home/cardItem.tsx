import { Article } from '../../../api/types';
import { Card, Typography, Space } from '@arco-design/web-react';
import { IconHeart, IconEye, IconClockCircle, IconMessage, IconAttachment } from '@arco-design/web-react/icon';
import { Link } from 'react-router-dom'
import DateTime from '../../../api/date.js';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

function handleDate(p_date: string) {
	const date = new Date(parseInt(p_date));
	const Year = date.getFullYear();
	const Month = date.getMonth() + 1;
	const Day = date.getDate();
	const dateString = [Year, Month, Day].join('-');
	return dateString;
}

export default function CardItem({ item }: { item: Article }) {
	return (
		<Link to={'/post/' + item.title}>
			<Card
				className='hover:shadow-md m-2'
				cover={
					<div
						style={{
							height: 204,
							backgroundColor: 'var(--color-neutral-1)',
							overflow: 'hidden',
							backgroundImage: `url(${item.cover})`,
							backgroundSize: 'cover'
						}}
					/>
				}
				actions={
					[
						<Space size='mini'>
							<IconEye />
							<span>12</span>
						</Space>,
						<Space size='mini'>
							<IconHeart />
							<span>4</span>
						</Space>,
						<Space size='mini'>
							<IconMessage />
							<span>2</span>
						</Space>
					]}
			>
				<Meta
					avatar={
						<div className='flex items-center' style={{ color: '#1D2129' }}>
							<Space size='mini'>
								<IconClockCircle />
								<DateTime dateString={handleDate(item.p_date)} />
							</Space>
						</div>
					}
					description={
						<>
							<Typography className='-mt-4'>
								<Title heading={5} className='hover:text-blue-600'>{item.title}</Title>
								<Paragraph ellipsis={{ rows: 3 }}>{item.brief}</Paragraph>
							</Typography>
							<div className='-mb-3'>
								{item.tags.split(' ').map((tag, idx) =>
									<span key={idx} className='bg-gray-200 px-2 py-0.5 mr-2 rounded-full'><IconAttachment />{tag} </span>
								)}
							</div>
						</>
					}
				/>
			</Card>
		</Link>
	)
}