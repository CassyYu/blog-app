import { Button, Form, Input } from "@arco-design/web-react"
import { Link } from "react-router-dom"
import PostDrawer from "./postDrawer"
import Toolbar from "./Toolbar"

export default function EditorPage() {

	const [form] = Form.useForm();

	return (
		<div className='px-4 lg:px-48 h-screen flex flex-col overflow-scroll'>
			<div className='mt-6'>
				<div className='flex justify-between'>
					<Link to='/manage'><Button type='outline'>返回</Button></Link>
					<div className='flex items-end'>
						<span className='mx-4 text-gray-400 text-right whitespace-nowrap'>文章将自动保存至草稿箱</span>
						<PostDrawer form={form} />
					</div>
				</div>
				<Toolbar />
			</div>
			<div className='font-mono h-full'>
				<Form form={form}>
					<Form.Item field='title'
						wrapperCol={{ span: 24 }}
						className='border-b-2 border-t-2'
						style={{ margin: 0 }}
					>
						<Input showWordLimit maxLength={30} placeholder='输入标题...' />
					</Form.Item>
					<Form.Item field='content'
						wrapperCol={{ span: 24 }}
					>
						<Input.TextArea
							placeholder='输入正文...'
							autoSize={{ minRows: 5 }}
							style={{ resize: 'none' }}
						/>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}