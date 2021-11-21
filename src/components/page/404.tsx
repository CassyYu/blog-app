import { Result, Button } from '@arco-design/web-react';
import { Link } from 'react-router-dom'

export default function Page404() {
	return (
		<div className='h-screen flex items-center'>
			<Result
				status='404'
				subTitle='页面未找到'
				extra={[
					<Button key='again' style={{ marginRight: 16 }}>重试</Button>,
					<Link to='/'><Button key='back' type='primary'>返回主页</Button></Link>,
				]}
			>
			</Result>
		</div>
	)
}