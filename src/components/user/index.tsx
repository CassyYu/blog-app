import { Avatar, Message, Modal } from "@arco-design/web-react"
import { IconUser, IconExport, IconImport } from "@arco-design/web-react/icon";
import Login from "../user/login";
import Signup from "../user/signup";
import { useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { UserContext } from "../../App";

export default function User() {

	const { uname, setUname } = useContext(UserContext);

	let history = useHistory();

	return (
		<>
			<Avatar
				style={uname.length ? { backgroundColor: '#4080FF' } : {}}
				size={34}
				shape='circle'
				triggerIcon={uname.length ? <IconExport /> : <IconImport />}
				triggerType={'mask'}
				autoFixFontSize
				onClick={() => {
					if (uname.length) {
						Modal.confirm({
							title: '确定要退出登录吗？',
							onOk: async () => {
								return new Promise((resolve, reject) => {
									localStorage.removeItem('token');
									resolve(setUname(''));
								}).catch((e) => {
									Message.error({ content: 'Error occurs!' });
									throw e;
								});
							}
						});
					} else {
						const path = window.location.pathname;
						history.push((path === '/' ? '' : path) + '/login');
					}
				}}
			>{uname.length ? uname[0].toUpperCase() : <IconUser />}</Avatar>
			<Route path="*/login" component={Login} />
			<Route path="*/signup" component={Signup} />
		</>
	)
}