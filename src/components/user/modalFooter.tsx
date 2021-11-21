import { Button, Message, Space } from "@arco-design/web-react";
import axios from "../../api/axios";

export default function ModalFooter(props: any) {

	const { form, name, setVisible } = props;

	function handleSubmit(name: string) {
		if (name === 'login') {
			form.validate().then((res: any) => {
				const { email, password } = res;
				axios.post('/user/login', { email: email, password: password })
					.then(res => {
						const { success, msg } = res.data;
						if (success) {
							const { token } = res.data;
							localStorage.setItem('token', token);
							Message.success(msg);
							form.resetFields();
							setVisible('');
						} else if (!success && msg === '密码错误') {
							form.setFields({
								password: {
									value: '',
									error: { message: msg }
								}
							});
							setVisible('login');
						} else {
							form.setFields({
								email: {
									value: '',
									error: { message: msg }
								},
								password: { value: '' }
							});
							setVisible('login');
						}
					})
			});
		} else {
			form.validate().then((res: any) => {
				Message.success('登录成功');
				form.resetFields();
				setVisible('');
			})
		}
	}

	function handleCancle() {
		Message.info('取消登录');
		form.resetFields();
		setVisible('');
	}

	return (
		<div className='flex items-center'>
			<div className='flex-1 text-left'>
				{
					name === 'login'
						? <Button type='text' onClick={() => { setVisible('signup') }}>
							<span className='cursor-pointer hover:text-blue-700'>没有账号，立即注册</span>
						</Button>
						: <Button type='text' onClick={() => { setVisible('login') }}>
							<span className='cursor-pointer hover:text-blue-700'>已有账号，立即登录</span>
						</Button>
				}
			</div>
			<Space size='large'>
				<Button onClick={async () => {
					setVisible('');
					handleCancle();
				}}>取消</Button>
				<Button
					type='primary'
					onClick={async () => {
						setVisible('');
						handleSubmit(name);
					}}
				>确认</Button>
			</Space>
		</div>
	)
}