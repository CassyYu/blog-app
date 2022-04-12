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
import { ErrorBoundary } from 'react-error-boundary';

export default function App() {

	function ErrorFallback({ error, resetErrorBoundary }: any) {
		return (
			<div role="alert">
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		)
	}

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Router>
				<Page>
					<Switch>
						<>
							<Route exact path="/" component={HomePage}></Route>
							<Route exact path="/login" component={HomePage}></Route>
							<Route path="/tags" component={TagsPage}></Route>
							<Route path="/archive" component={ArchivePage}></Route>
							<Route path="/manage" component={ManagePage}></Route>
							<Route path="/search" component={SearchPage}></Route>
							<Route path="/editor" component={EditorPage}></Route>
							<Route path="/post" component={PostPage}></Route>
						</>
						<Route path="/" component={Page404}></Route>
					</Switch>
				</Page>
			</Router>
		</ErrorBoundary>
	)
}