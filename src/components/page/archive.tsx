import { Timeline, Grid } from '@arco-design/web-react';
import { IconAttachment } from '@arco-design/web-react/icon';
import { Link } from 'react-router-dom';
import { Article } from '../../api/types';

const TimelineItem = Timeline.Item;
const { Row } = Grid;

function handleDate(p_date: string) {
	const date = new Date(parseInt(p_date));
	const Year = date.getFullYear();
	const Month = date.getMonth() + 1;
	const Day = date.getDate();
	const dateString = [Year, Month, Day].join('-');
	return dateString;
}

export default function ArchivePage({ data }: { data: Article[] }) {
	return (
		<div className='m-8'>
			<Timeline mode='left' labelPosition='relative' reverse>
				{
					data.map((item, index) =>
						<TimelineItem key={index} label={handleDate(item.p_date)}>
							<Row style={{ display: 'inline-flex', alignItems: 'center' }}>
								<Link to={'/post/' + item.title}>
									<div className='mb-8'>
										<div className='text-lg font-medium'>{item.title}</div>
										<div className='text-md text-gray-600 my-2'>{item.brief}</div>
										{item.tags.split(' ').map(tag =>
											<small className='bg-gray-100 px-2 py-0.5 mr-2 rounded-full'><IconAttachment />{tag} </small>)}
									</div>
								</Link>
							</Row>
						</TimelineItem>
					)
				}
			</Timeline>
		</div>
	)
}