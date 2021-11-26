import { List, Button, Space } from '@arco-design/web-react';
import { IconAttachment, IconDelete, IconEdit, IconEye, IconHeart, IconMessage } from '@arco-design/web-react/icon';
import { ReactChild } from 'react';
import { Article } from '../../../api/types';

const render = (actions: ReactChild[], item: Article, index: number) => (
	<List.Item key={index} actions={actions}>
		<List.Item.Meta
			className='overflow-scroll'
			title={
				<div className='w-full flex justify-between items-center'>
					<span className='my-2 font-medium text-lg text-gray-700 cursor-pointer hover:text-blue-600'>{item.title}</span>
					<span className='ml-4' style={{ fontWeight: 400, color: '#aaa' }}>{item.p_date}</span>
				</div>
			}
			description={
				<div>
					{item.state === 'private' ? <small className='mr-2 px-2 py-1 rounded-md bg-gray-100'>{'私密'}</small> : <></>}
					{item.tags.split(' ').map((tag: string, idx: number) => <small key={idx} className='mr-2 px-2 py-1 rounded-md bg-gray-100'><IconAttachment />{tag}</small>)}
					<br />
					<Space size='medium' className='mt-2'>
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