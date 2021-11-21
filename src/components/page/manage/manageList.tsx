import { List, Button, Space } from '@arco-design/web-react';
import { IconAttachment, IconDelete, IconEdit, IconEye, IconHeart, IconMessage } from '@arco-design/web-react/icon';
import { ReactChild } from 'react';
import { Article } from '../../../api/types';

const render = (actions: ReactChild[], item: Article, index: number) => (
	<List.Item key={index} actions={actions}>
		<List.Item.Meta
			className='overflow-scroll'
			title={
				<span className='my-2 font-medium text-lg text-gray-700 cursor-pointer hover:text-blue-600'>{item.title}</span>
			}
			description={
				<div>
					<Space size='small'>
						{item.tags.split(' ').map((tag: string, idx: number) => <small key={idx} className='px-2 py-1 rounded-md bg-gray-100 leading-10'><IconAttachment />{tag}</small>)}
					</Space>
					<br />
					<Space size='medium'>
						<Space size='mini'><IconEye />12</Space>
						<Space size='mini'><IconHeart />234</Space>
						<Space size='mini'><IconMessage />34</Space>
					</Space>
				</div>
			}
		/>
	</List.Item>
);

export default function ManageList({ data }: { data: Article[] }) {
	return (
		<List
			pagination={{ showTotal: true, simple: true, sizeCanChange: true }}
			dataSource={data}
			render={render.bind(null, [
				<Button shape='circle'><IconEye /></Button>,
				<Button shape='circle'><IconEdit /></Button>,
				<Button shape='circle'><IconDelete /></Button>,
			])}
		/>
	)
}