import { Layout, Space, PageHeader, Popover, Image, Button, Avatar } from "@arco-design/web-react"
import { IconWechatpay, IconAlipayCircle, IconGithub, IconUser, IconSunFill } from "@arco-design/web-react/icon";
import { useState } from "react";
import Login from "../user/login";
import Signup from "../user/signup";

const { Header } = Layout;

export default function PageHead() {

	const [visible, setVisible] = useState('');

	return (
		<Header className='border-b'>
			<PageHeader
				title={<div className='text-2xl font-black text-gray-700'>BLOG.</div>}
				subTitle='Welcome!'
				extra={
					<Space size='large' className='text-xl text-gray-700'>
						<Popover
							trigger='hover'
							content={
								<Image
									width={100}
									height={100}
									src='https://picsum.photos/20'
									loader={true}
								/>
							}
						>
							<IconWechatpay />
						</Popover>
						<Popover
							trigger='hover'
							content={
								<Image
									width={100}
									height={100}
									src='https://picsum.photos/20'
									loader={true}
								/>
							}
						>
							<IconAlipayCircle />
						</Popover>
						<a href='https://github.com/CassyYu' target='_blank' rel="noreferrer">
							<Popover
								trigger='hover'
								content={<span>CassyYu</span>}
							>
								<IconGithub />
							</Popover>
						</a>
						<Button className='mb-1' shape='circle' size='small' icon={<IconSunFill />} />
						<div className='whitespace-nowrap overflow-hidden'>
							<Avatar
								size={34}
								shape='circle'
								triggerIcon={<IconUser />}
								triggerType={'mask'}
								onClick={() => {
									setVisible('login')
								}}
								autoFixFontSize={true}
							>{'未登录'}</Avatar>
						</div>
					</Space>
				}
			/>
			<Login visible={visible} setVisible={setVisible} />
			<Signup visible={visible} setVisible={setVisible} />
		</Header>
	)
}