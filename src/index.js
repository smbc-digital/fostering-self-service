import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Provider from './components/Provider'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import ScrollToTop from './components/ScrollToTop'

let history = createBrowserHistory()

ReactDOM.render(
	<Provider>
		<Router history={history}>
			<ScrollToTop>
				<App />
			</ScrollToTop>
		</Router>
	</Provider>,
	document.getElementById('root')
)
