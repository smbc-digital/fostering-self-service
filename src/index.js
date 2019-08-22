import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Provider from './components/Provider'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import ScrollToTop from './components/ScrollToTop'
import moment from 'moment-timezone'
import { START_PAGE } from 'routes'

let history = createBrowserHistory()

moment.tz.setDefault('Europe/London')

ReactDOM.render(
	<Provider>
		<Router history={history}>
			<ScrollToTop ignoredPaths={[START_PAGE]}>
				<App />
			</ScrollToTop>
		</Router>
	</Provider>,
	document.getElementById('root')
)
