import { Empty, Radio } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { getTags } from '../../../api/servers';
import { Article, TagObj } from '../../../api/types';
import TagsList from './tagsList';

export default function TagsPage() {

	const [tags, setTags] = useState<TagObj[]>();
	const [selectedTag, setSelectedTag] = useState('all');
	const [data, setData] = useState<Article[]>();

	useEffect(() => {
		(async () => {
			const tagsArr = await getTags();
			setTags(tagsArr);
		})()
	}, [])

	return (
		<div className='m-8'>
			<div className='flex justify-between'>
				<Radio.Group
					type='button'
					defaultValue={window.location.search ? parseInt(window.location.search.replace('?tag=', '')) : 0}
					style={{ flex: 1 }}
					onChange={value => {
						setSelectedTag(value)
						window.location.search = `tag=${value}`;
					}}
				>
					{tags ?
						<>
							<Radio value={0}>全部 {data?.length}</Radio>
							{tags.map((tag, idx) =>
								<Radio key={tag.key} value={idx+1}>
									<span className='font-semibold'>{tag.key}</span> {tag.value}
								</Radio>)}
						</> : <Empty />}
				</Radio.Group>
			</div>
			<TagsList />
		</div>
	)
}