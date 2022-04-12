import { Avatar, Message, Modal } from "@arco-design/web-react"
import { IconUser, IconExport, IconImport } from "@arco-design/web-react/icon";
import Login from "../user/login";
import Signup from "../user/signup";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Route } from "react-router-dom";

export default function User() {

	const [user, setUser] = useState('');

	useEffect(() => {
		axios.get('/user/verify').then(res => {
			const { code, data } = res.data;
			if (code === 0) setUser(data.user.userName);
		})
	}, []);

	return (
		<>
			<Avatar
				style={user ? { backgroundColor: '#4080FF' } : {}}
				size={34}
				shape='circle'
				triggerIcon={user ? <IconExport /> : <IconImport />}
				triggerType={'mask'}
				autoFixFontSize
				onClick={() => {
					if (user) {
						Modal.confirm({
							title: '确定要退出登录吗？',
							onOk: async () => {
								return new Promise((resolve, reject) => {
									localStorage.removeItem('token');
									resolve(setUser(''));
								}).catch((e) => {
									Message.error({ content: 'Error occurs!' });
									throw e;
								});
							}
						});
					} else {
						const href = window.location.href;
						window.location.href += href[href.length - 1] === '/' ? 'login' : '/login';
					}
				}}
			>{user ? user[0].toUpperCase() : <IconUser />}</Avatar>
			<Route path="*/login" component={Login} />
			<Route path="*/signup" component={Signup} />
		</>
	)
}