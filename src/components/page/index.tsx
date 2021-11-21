import { Layout, Menu } from "@arco-design/web-react"
import { IconCopyright, IconHome, IconTags, IconClockCircle, IconFolder, IconSearch } from "@arco-design/web-react/icon";
import { ReactElement, useState } from "react";
import PageHead from './header';
import { Link } from 'react-router-dom'

const MenuItem = Menu.Item;
const { Sider, Footer, Content } = Layout;

export default function Page({ children }: { children: ReactElement }) {

	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout className='h-screen'>
			<PageHead />
			<Layout className='overflow-hidden'>
				<Sider className='h-full'
					collapsed={collapsed} width={160}
				>
					<Menu
						className='w-40 h-full'
						hasCollapseButton
						defaultSelectedKeys={['1']}
						onCollapseChange={() => { setCollapsed(!collapsed) }}
					>
						<Link to='/'>
							<MenuItem key='1'>
								<div><IconHome /> Home</div>
							</MenuItem>
						</Link>
						<Link to='/tags'>
							<MenuItem key='2'>
								<div><IconTags /> Tags</div>
							</MenuItem>
						</Link>
						<Link to='/archive'>
							<MenuItem key='3'>
								<div><IconClockCircle /> Archive</div>
							</MenuItem>
						</Link>
						<Link to='/manage'>
							<MenuItem key='4'>
								<div><IconFolder /> Manage</div>
							</MenuItem>
						</Link>
						<Link to='/search'>
							<MenuItem key='5'>
								<div><IconSearch /> Search</div>
							</MenuItem>
						</Link>
					</Menu>
				</Sider>
				<Layout className='overflow-scroll'>
					<Content>{children}</Content>
					<Footer className='text-center p-4 text-gray-600'>Copyright <IconCopyright /> by Cassy</Footer>
				</Layout>
			</Layout>
		</Layout>
	);
}