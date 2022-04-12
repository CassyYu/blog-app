import { Modal, Form, Input, Button, AutoComplete, Message } from '@arco-design/web-react';
import axios from '../../api/axios';
import { useState } from 'react';
import ModalFooter from './modalFooter';

const { Option } = AutoComplete;

export default function Signup() {

	const [form] = Form.useForm();
	const [options, setOptions] = useState<string[]>();

	function getCode() {
		axios.post('/user/code', { email: form.getFieldValue('email') })
			.then(res => {
				const { code, message } = res.data;
				if (code === 0) {
					Message.info(message);
				} else if (code === 1) {
					Message.warning(message);
					setTimeout(() => window.location.href = window.location.href.replace('/signup', 'login'), 1000);
				} else if (code === 2) {
					Message.warning(message);
				}
			})
	}

	function handleSearch(inputValue: string) {
		let suffix = ['qq', 'sohu', '126', '163'];
		setOptions(
			inputValue ? new Array(suffix.length).fill(null).map((_, index) => `${inputValue}@${suffix[index]}.com`) : []
		);
	};

	return (
		<Modal
			title='注册'
			visible={true}
			onCancel={() => window.location.href = window.location.href.replace('/signup', '')}
			footer={ModalFooter({ form, name: 'signup' })}
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
							if (value.indexOf('@') === -1 || value.indexOf('.com') === -1) {
								valid = false;
							}
							return valid ? callback() : callback('请填写正确的邮箱格式');
						}
					}]}
				>
					<AutoComplete placeholder='请输入邮箱' onSearch={handleSearch} onSelect={() => setOptions([])}>
						{options && options.map((option) => (
							<Option key={option} value={option}>
								{option}
							</Option>
						))}
					</AutoComplete>
				</Form.Item>
				<div className='flex'>
					<Form.Item label='验证码' field='code'>
						<Input maxLength={6} />
					</Form.Item>
					<Button className='mr-20' type='outline'
						onClick={getCode}
					>点击获取</Button>
				</div>
				<Form.Item label='密码' field='password'
					rules={[{
						validator(value, callback) {
							if (!value) return callback();
							for (let i = 0; i < value.length; i++) {
								if ('0' <= value[i] && value[i] <= '9') continue;
								if ('a' <= value[i] && value[i] <= 'z') continue;
								if ('A' <= value[i] && value[i] <= 'Z') continue;
								return callback('密码只能是数字或者英文字母')
							}
							return callback();
						}
					}]}
				>
					<Input.Password defaultValue='password' />
				</Form.Item>
				<Form.Item label='再次输入密码' field='passwordAgain'>
					<Input.Password defaultValue='password' />
				</Form.Item>
			</Form>
		</Modal>
	);
}