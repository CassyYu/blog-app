import { Modal, Form, Input } from '@arco-design/web-react';
import ModalFooter from './modalFooter';

export default function Login(props: any) {

	const { visible, setVisible } = props;

	const [form] = Form.useForm();

	return (
		<Modal
			title='登录'
			visible={visible === 'login'}
			onCancel={() => setVisible('')}
			footer={ModalFooter({ form: form, name: 'login', setVisible: setVisible })}
		>
			<Form
				form={form}
				labelCol={{ style: { flexBasis: 100 } }}
				wrapperCol={{ style: { flexBasis: 'calc(100% - 180px)' } }}
			>
				<Form.Item label='邮箱' field='email'
					rules={[{
						validator(value, cb) {
							if (!value) return cb();
							let valid = true;
							if (value.indexOf('@') === -1 || value.indexOf('.com') === -1) {
								valid = false;
							}
							return valid ? cb() : cb('请填写正确的邮箱格式');
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