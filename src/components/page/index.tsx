import { Layout, Menu } from "@arco-design/web-react"
import { IconCopyright, IconHome, IconTags, IconClockCircle, IconFolder, IconSearch } from "@arco-design/web-react/icon";
import { ReactElement, useState } from "react";
import PageHead from './header';
import { Link } from 'react-router-dom'

const MenuItem = Menu.Item;
const { Sider, Footer, Content } = Layout;

export default function Page({ children }: { children: ReactElement }) {

	const [collapsed, setCollapsed] = useState(false);

	const pathName = window.location.pathname.substring(1)
	const menuItem = ['', 'tags', 'archive', 'manage', 'search'];
	const defaultKey = menuItem.indexOf(pathName).toString();
	
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
						defaultSelectedKeys={[defaultKey]}
						onCollapseChange={() => { setCollapsed(!collapsed) }}
					>
						<Link to='/'>
							<MenuItem key='0'>
								<div><IconHome /> Home</div>
							</MenuItem>
						</Link>
						<Link to='/tags'>
							<MenuItem key='1'>
								<div><IconTags /> Tags</div>
							</MenuItem>
						</Link>
						<Link to='/archive'>
							<MenuItem key='2'>
								<div><IconClockCircle /> Archive</div>
							</MenuItem>
						</Link>
						<Link to='/manage'>
							<MenuItem key='3'>
								<div><IconFolder /> Manage</div>
							</MenuItem>
						</Link>
						<Link to='/search'>
							<MenuItem key='4'>
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