import { Button, Form, Input } from "@arco-design/web-react"
import { Link } from "react-router-dom"
import PostDrawer from "./postDrawer"
import Toolbar from "./Toolbar"

export default function EditorPage() {

	const [form] = Form.useForm();

	// function EditArea(props: any) {
	// 	return (
	// 		<textarea id='editor'
	// 			className=' bg-red-50 m-2 flex-1 leading-7 text-base resize-none'
	// 			placeholder='输入正文...'
	// 		/>
	// 	)
	// }

	return (
		<div className='px-4 lg:px-48 h-screen flex flex-col overflow-hidden'>
			<div className='mt-6 flex justify-between'>
				<Link to='/manage'><Button type='outline'>返回</Button></Link>
				<div className='flex items-end'>
					<span className='mx-4 text-gray-400 text-right whitespace-nowrap'>文章将自动保存至草稿箱</span>
					<PostDrawer form={form} />
				</div>
			</div>
			<div className='flex-1 flex flex-col font-mono'>
				<Toolbar />
				<Form form={form}>
					<Form.Item field='content'>
						{/* <EditArea /> */}
						<Input.TextArea
							placeholder='输入正文...'
							className='m-2'
							autoSize={{ minRows: 30, maxRows: 30 }}
							style={{ width: '800px' }}
						/>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}