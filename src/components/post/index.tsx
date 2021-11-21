import { Typography, Space, Tag, Divider } from '@arco-design/web-react';
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
			.then(res => { resolve(res.data?.post[0]); })
	);
}

export default function PostPage() {

	const { data, error, loading } = useRequest(getPost);

	if (error) return <div>error</div>
	if (loading) return <div>loading</div>
	return (
		<div className='flex'>
			<div className='md:ml-12 md:mr-36 overflow-y-scroll w-full'>
				<Layout>
					<Typography.Title>
						<div id='Arco'>{data.title}</div>
					</Typography.Title>
					<Typography.Text type='secondary'>
						{data.content}
					</Typography.Text>
				</Layout>
				<Space className='mt-8'>
					{data.tags?.split(' ').map((tag: string) => <Tag style={{color: '#666'}}><IconAttachment />{tag}</Tag>)}
				</Space>
				<Divider orientation='center'>评论区</Divider>
				<Guestbook />
			</div>
		</div>
	)
}