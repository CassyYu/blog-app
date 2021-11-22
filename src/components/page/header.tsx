import { Layout, Space, PageHeader, Popover, Image, Button } from "@arco-design/web-react"
import { IconWechatpay, IconAlipayCircle, IconGithub, IconSunFill } from "@arco-design/web-react/icon";
import User from "../user";

const { Header } = Layout;

export default function PageHead() {

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
						<User />
					</Space>
				}
			/>
		</Header>
	)
}