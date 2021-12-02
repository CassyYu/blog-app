import { Modal, Form, Input, Button, AutoComplete } from '@arco-design/web-react';
import axios from '../../api/axios';
import { useState } from 'react';
import ModalFooter from './modalFooter';

const { Option } = AutoComplete;

export default function Signup(props: any) {

	const { visible, setVisible } = props;

	const [form] = Form.useForm();
	const [options, setOptions] = useState<string[]>();

	function getCode() {
		axios.post('/user/code', { email: form.getFieldValue('email') })
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
			visible={visible === 'signup'}
			onCancel={() => setVisible('')}
			footer={ModalFooter({ form, name: 'signup', setVisible })}
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
				<Form.Item label='密码' field='passward'
					rules={[{
						validator(value, cb) {
							if (!value) return cb();
							for (let i = 0; i < value.length; i++) {
								if ('0' <= value[i] && value[i] <= '9') continue;
								if ('a' <= value[i] && value[i] <= 'z') continue;
								if ('A' <= value[i] && value[i] <= 'Z') continue;
								return cb('密码只能是数字或者英文字母')
							}
							return cb();
						}
					}]}
				>
					<Input.Password defaultValue='password' />
				</Form.Item>
				<Form.Item label='再次输入密码' field='passwardAgain'>
					<Input.Password defaultValue='password' />
				</Form.Item>
			</Form>
		</Modal>
	);
}