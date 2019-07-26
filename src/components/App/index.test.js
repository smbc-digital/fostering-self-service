import { React, mount, useContextMock} from 'helpers/SetupTest'
import { Router } from 'react-router'
import App from './index.js'
import { createBrowserHistory as createHistory } from 'history'
import moment from 'moment'

describe('App', () => {
	beforeEach(() => {

        useContextMock.mockReturnValue({
            homeVisitDateTime: {
                value: moment().add(10, 'd').format('DD/MM/YYYY HH:mm')
            },
            statuses: {}
        })
	})
	
	it('should render a Switch', () => {
		// Arrange
		let history = createHistory()
		
		// Act
		const enzymeWrapper = mount(
			<Router history={history}>
				<App />
			</Router>
		)

		// Assert
		expect(enzymeWrapper.find('Switch').exists()).toBe(true)
	})
})