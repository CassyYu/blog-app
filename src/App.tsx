import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import axios from './api/axios';
import Loadable from './loadable';

const Page = Loadable(() => import('./components/page/.'));
const HomePage = Loadable(() => import('./components/page/home/.'));
const TagsPage = Loadable(() => import('./components/page/tags/.'));
const ArchivePage = Loadable(() => import('./components/page/archive'));
const ManagePage = Loadable(() => import('./components/page/manage/.'));
const SearchPage = Loadable(() => import('./components/page/search/.'));
const EditorPage = Loadable(() => import('./components/editor'));
const Page404 = Loadable(() => import('./components/page/404'));
const PostPage = Loadable(() => import('./components/post'));

function ErrorFallback({ error, resetErrorBoundary }: any) {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

interface UnameType {
	uname: string,
	setUname: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<UnameType>({
	uname: '',
	setUname: () => { }
})

export default function App() {

	const [uname, setUname] = useState('');

	useEffect(() => {
		axios.get('/user/verify').then(res => {
			const { code, data } = res.data;
			if (code === 0) setUname(data.user.userName);
		})
	}, []);

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Router>
				<UserContext.Provider value={{ uname, setUname }}>
					<Page>
						<Switch>
							<Route exact path="/(/|login|signup)?" component={HomePage}></Route>
							<Route path="/tags" component={TagsPage}></Route>
							<Route path="/archive" component={ArchivePage}></Route>
							<Route path="/manage" component={ManagePage}></Route>
							<Route path="/search" component={SearchPage}></Route>
							<Route path="/editor" component={EditorPage}></Route>
							<Route path="/post" component={PostPage}></Route>
							<Route path="/" component={Page404}></Route>
						</Switch>
					</Page>
				</UserContext.Provider>
			</Router>
		</ErrorBoundary >
	)
}