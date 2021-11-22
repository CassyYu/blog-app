import { Typography, Space, Tag, Divider, Message } from '@arco-design/web-react';
import axios from '../../api/axios';
import { Children } from 'react';
import { useRequest } from 'ahooks';
import Guestbook from './guestbook';
import { IconAttachment } from '@arco-design/web-react/icon';

function Layout(props: any) {
	return Children.map(props.children, (child, index) => {
		return <div key={index} style={{ marginBottom: 10 }}>{child}</div>;
	});
}

function getPost(): Promise<string> {
	const path = window.location.pathname;
	const postTitle = decodeURI(path.replace('/post/', ''));
	return new Promise((resolve) =>
		axios.post('/getPost', { title: postTitle })
			.then(res => {
				if (res.data.code === 0) resolve(res.data.data);
				else Message.info(res.data.message)
			})
	);
}

export default function PostPage() {

	const { data, error, loading } = useRequest(getPost);

	if (error) return <div>error</div>
	if (loading) return <div>loading</div>

	const { title, content, tags } = data.post;

	return (
		<div className='flex'>
			<div className='lg:mx-36 overflow-y-scroll w-full'>
				<Layout>
					<Typography.Title>
						<div id='Arco'>{title}</div>
					</Typography.Title>
					<Typography.Text type='secondary'>
						{content}
					</Typography.Text>
				</Layout>
				<Space className='mt-8'>
					{tags.split(' ').map((tag: string) => <Tag key={tag} style={{ color: '#666' }}><IconAttachment />{tag}</Tag>)}
				</Space>
				<Divider orientation='center'>评论区</Divider>
				<Guestbook />
			</div>
		</div>
	)
}