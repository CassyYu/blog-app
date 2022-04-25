import { Button, Message, Space } from "@arco-design/web-react";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";

export default function ModalFooter(props: any) {

	const { form, name } = props;

	const history = useHistory();
	const { setUname } = useContext(UserContext);

	function handleSubmit(name: string) {
		if (name === 'login') {
			form.validate().then((res: any) => {
				const { email, password } = res;
				axios.post('/user/login', { email, password })
					.then(res => {
						const { code, message, data } = res.data;
						if (code === 0) {
							const { token } = data;
							localStorage.setItem('token', token);
							Message.success(message);
							form.resetFields();
							setUname(email);
							history.push(window.location.pathname.replace('/login', ''));
						} else {
							Message.warning(message);
							form.resetFields();
						}
					})
			});
		} else {
			const { email, password, code } = form.getFieldsValue();
			axios.post('/user/signup', { email, password, code })
				.then(res => {
					const { code, message } = res.data;
					if (code === 0) {
						Message.success(message);
						form.resetFields();
						history.push(window.location.pathname.replace('/signup', ''));
					} else {
						Message.warning(message);
						form.resetFields();
					}
				})
		}
	}

	return (
		<div className='flex items-center'>
			<div className='flex-1 text-left'>
				{
					name === 'login'
						? <Button type='text' onClick={() => {
							history.replace(window.location.pathname.replace('login', 'signup'));
						}}>
							<span className='cursor-pointer hover:text-blue-700'>没有账号，立即注册</span>
						</Button>
						: <Button type='text' onClick={() => {
							history.replace(window.location.pathname.replace('signup', 'login'));
						}}>
							<span className='cursor-pointer hover:text-blue-700'>已有账号，立即登录</span>
						</Button>
				}
			</div>
			<Space size='large'>
				<Button onClick={async () => {
					Message.info('取消登录');
					form.resetFields();
					history.push(window.location.pathname.replace('/login', '').replace('/signup', ''));
				}}>取消</Button>
				<Button
					type='primary'
					onClick={async () => {
						handleSubmit(name);
					}}
				>确认</Button>
			</Space>
		</div>
	)
}