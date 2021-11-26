import { Avatar, Message, Modal } from "@arco-design/web-react"
import { IconUser, IconExport, IconImport } from "@arco-design/web-react/icon";
import Login from "../user/login";
import Signup from "../user/signup";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

export default function User() {

	const [visible, setVisible] = useState('');
	const [user, setUser] = useState('');

	const token = localStorage.getItem('token');

	useEffect(() => {
		axios.get('/user/verify').then(res => {
			const { code, data } = res.data;
			if (code === 0) setUser(data.user.userName)
		})
	}, [token])


	if (user === '') {
		return (
			<>
				<Avatar
					size={34}
					shape='circle'
					triggerIcon={<IconImport />}
					triggerType={'mask'}
					onClick={() => {
						setVisible('login')
					}}
				><IconUser /></Avatar>
				<Login visible={visible} setVisible={setVisible} />
				<Signup visible={visible} setVisible={setVisible} />
			</>
		)
	}
	return (
		<>
			<Avatar
				style={{ backgroundColor: '#4080FF' }}
				size={34}
				shape='circle'
				triggerIcon={<IconExport />}
				triggerType={'mask'}
				autoFixFontSize
				onClick={() => {
					Modal.confirm({
						title: '确定要退出登录吗？',
						onOk: () => {
							return new Promise((resolve, reject) => {
								localStorage.removeItem('token');
								resolve(setUser(''));
							}).catch((e) => {
								Message.error({ content: 'Error occurs!' });
								throw e;
							});
						}
					});
				}
				}
			>{user[0].toUpperCase()}</Avatar>
		</>
	)
}