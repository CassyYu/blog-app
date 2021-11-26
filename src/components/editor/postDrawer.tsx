import { useState } from 'react';
import { Drawer, Button, Form, Input, Space, Radio, Message } from '@arco-design/web-react';
import { Upload, Progress } from '@arco-design/web-react';
import { IconPlus, IconEdit } from '@arco-design/web-react/icon';
import { Select } from '@arco-design/web-react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

const formItemLayout = {
	wrapperCol: {
		span: 24,
	},
};

const imageSrc = `https://picsum.photos/id/${Date.now() % 100}/1000/800`;

export default function PostDrawer({ form }: any) {

	const [visible, setVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const Option = Select.Option;
	const options: string[] = [];

	function handleSubmit() {
		const postData = {
			...form.getFieldsValue(),
			e_date: Date.now()
		}
		axios.post('/post', postData)
			.then((res) => {
				form.resetFields();
				if (res.data.code === 0) Message.success(res.data.message);
				else Message.warning('文章发送失败，已存至草稿箱');
			})
	}

	return (
		<div>
			<Button type='primary' onClick={() => { setVisible(true); }}>
				发布文章
			</Button>
			<Drawer
				width={380}
				title={<span>发布文章</span>}
				visible={visible}
				confirmLoading={confirmLoading}
				onOk={() => {
					form.validate().then((res: any) => {
						setConfirmLoading(true);
						setTimeout(() => {
							setVisible(false);
							setConfirmLoading(false);
						}, 1500)
					});
				}}
				onCancel={() => { setVisible(false); }}
				footer={
					<Space size='medium'>
						<Button type='outline' onClick={() => { setVisible(false) }}>取消</Button>
						<Link to='/'><Button type='primary' onClick={() => { setVisible(false); handleSubmit() }}>确定并发布</Button></Link>
					</Space>
				}
			>
				<Form {...formItemLayout} form={form} layout='vertical'>
					<Form.Item
						label='文章标题'
						field='title'
					>
						<Input showWordLimit maxLength={30} />
					</Form.Item>
					<Form.Item
						label='文章摘要'
						field='brief'
					>
						<Input.TextArea
							maxLength={50}
							showWordLimit
							autoSize={{ minRows: 2, maxRows: 6 }}
							style={{ width: 350, resize: 'none' }}
						/>
					</Form.Item>
					<Form.Item
						label='添加标签'
						field='tags'
					>
						<Select
							allowCreate
							mode='multiple'
							placeholder='Select or create an item'
							allowClear
							style={{ width: 345 }}
						>
							{options.map((option) => (
								<Option key={option} value={option}>{option}</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label='文章封面'
						field='cover'
					>
						<Radio.Group defaultValue='random' direction='vertical'>
							<Radio value={imageSrc}>随机</Radio>
							<Radio value='selected'><UploadImg /></Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						label='文章属性'
						field='state'
					>
						<Select defaultValue='public' style={{ width: 345 }}>
							{<Option key='public' value='public'>公开</Option>}
							{<Option key='private' value='private'>私密</Option>}
						</Select>
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
}

function UploadImg() {

	const [file, setFile] = useState<any>()
	const cs = `arco-upload-list-item${file && file === 'error' ? ' is-error' : ''}`;

	return (
		<Upload
			action='/'
			fileList={file ? [file] : []}
			showUploadList={false}
			onChange={(_, currentFile) => {
				setFile({
					...currentFile,
					url: URL.createObjectURL(currentFile.originFile),
				})
			}}
			onProgress={(currentFile) => { setFile(currentFile) }}
		>
			<div className={cs}>
				{file?.url ? (
					<div className='arco-upload-list-item-picture custom-upload-avatar'>
						<img src={file.url} alt='' />
						<div className='arco-upload-list-item-picture-mask'>
							<IconEdit />
						</div>
						{file.status === 'uploading' && file.percent < 100 && <Progress
							percent={file.percent}
							type='circle'
							size='mini'
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								transform: 'translateX(-50%) translateY(-50%)'
							}}
						/>
						}
					</div>
				) : (
					<div className='arco-upload-trigger-picture'>
						<div className='arco-upload-trigger-picture-text'>
							<IconPlus />
							<div style={{ marginTop: 10, fontWeight: 600 }}>Upload</div>
						</div>
					</div>
				)}
			</div>
		</Upload>
	);
}