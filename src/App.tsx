import Page from './components/page/.'
import HomePage from './components/page/home/.';
import TagsPage from './components/page/tags/.';
import ArchivePage from './components/page/archive';
import ManagePage from './components/page/manage/.';
import SearchPage from './components/page/search/.';
import EditorPage from './components/editor';
import Page404 from './components/page/404';
import PostPage from './components/post';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/"><Page><HomePage /></Page></Route>
				<Route path="/tags"><Page><TagsPage /></Page></Route>
				<Route path="/archive"><Page><ArchivePage /></Page></Route>
				<Route path="/manage"><Page><ManagePage /></Page></Route>
				<Route path="/search"><Page><SearchPage /></Page></Route>
				<Route path="/editor"><EditorPage /></Route>
				<Route path="/post"><Page><PostPage /></Page></Route>
				<Route path="/" component={Page404} />
			</Switch>
		</Router>
	)
}