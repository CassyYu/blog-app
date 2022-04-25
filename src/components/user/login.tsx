import { Modal, Form, Input } from '@arco-design/web-react';
import ModalFooter from './modalFooter';
import { useHistory } from "react-router-dom";

export default function Login() {

	const [form] = Form.useForm();

	const history = useHistory();

	return (
		<Modal
			title='登录'
			visible={true}
			onCancel={() => history.push(window.location.pathname.replace('/login', ''))}
			footer={ModalFooter({ form: form, name: 'login' })}
		>
			<Form
				form={form}
				labelCol={{ style: { flexBasis: 100 } }}
				wrapperCol={{ style: { flexBasis: 'calc(100% - 180px)' } }}
			>
				<Form.Item label='邮箱' field='email'
					rules={[{
						validator(value, callback) {
							if (!value) return callback();
							let valid = true;
							if (value.indexOf('@') === -1 || value.indexOf('.com') === -1) valid = false;
							return valid ? callback() : callback('请填写正确的邮箱格式');
						}
					}]}
				>
					<Input />
				</Form.Item>
				<Form.Item label='密码' field='password'>
					<Input.Password defaultValue='password' />
				</Form.Item>
			</Form>
		</Modal>
	)
}