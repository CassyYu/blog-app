import { Radio } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { Article, TagObj } from '../../../api/types';
import TagsList from './tagsList';

export default function TagsPage({ data }: { data: Article[] }) {

	const [tags, setTags] = useState<TagObj[]>();
	const [selectedTag, setSelectedTag] = useState('all');

	useEffect(() => {
		let tagMap = new Map();
		data.forEach(item => {
			const tagArr = item.tags.split(' ');
			tagArr.forEach(tag => {
				let num = 0;
				if (tagMap.has(tag)) num = tagMap.get(tag);
				tagMap.set(tag, num + 1);
			})
		})
		let tagsArr: TagObj[] = [];
		tagMap.forEach((value, key) => tagsArr.push({ value: value, key: key }))
		tagsArr.sort((a: TagObj, b: TagObj) => b.value - a.value);
		setTags(tagsArr);
	}, [data])

	return (
		<div className='m-8'>
			<div className='flex justify-between'>
				<Radio.Group
					type='button'
					name='lang'
					defaultValue='all'
					style={{ marginRight: 20, marginBottom: 20 }}
					onChange={value => setSelectedTag(value)}
				>
					<Radio value='all'>全部 {data?.length}</Radio>
					{tags?.map(tag =>
						<Radio
							key={tag.key}
							value={tag.key}
						>
							<span className='font-semibold'>{tag.key}</span> {tag.value}
						</Radio>)}
				</Radio.Group>
			</div>
			<TagsList data={data.filter(item => selectedTag === 'all' ? true : item.tags.indexOf(selectedTag) !== -1)} />
		</div>
	)
}