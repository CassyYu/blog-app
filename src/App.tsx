import Page from './components/page/.'
import HomePage from './components/page/home/.';
import TagsPage from './components/page/tags/.';
import ArchivePage from './components/page/archive';
import ManagePage from './components/page/manage/.';
import SearchPage from './components/page/search/.';
import EditorPage from './components/editor';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Page404 from './components/page/404';
import PostPage from './components/post/.';
import axios from '../src/api/axios';
import { useRequest } from 'ahooks';
import { Message } from '@arco-design/web-react';

function getDataSource(): Promise<string> {
	return new Promise(resolve =>
		axios.get('/dataSource')
			.then(res => {
				if (res.data.code === 0) resolve(res.data.data)
				else Message.info(res.data.message);
			})
	)
}

export default function App() {

	const { data, error, loading } = useRequest(getDataSource);

	if (loading) return <div>loading</div>
	if (error) return <div>error</div>
	return (
		<Router>
			<Switch>
				<Route exact path="/"><Page><HomePage data={data} /></Page></Route>
				<Route path="/tags"><Page><TagsPage data={data} /></Page></Route>
				<Route path="/archive"><Page><ArchivePage data={data} /></Page></Route>
				<Route path="/manage"><Page><ManagePage data={data} /></Page></Route>
				<Route path="/search"><Page><SearchPage data={data} /></Page></Route>
				<Route path="/editor"><EditorPage /></Route>
				<Route path="/post"><Page><PostPage /></Page></Route>
				<Route path="/" component={Page404} />
			</Switch>
		</Router>
	)
}