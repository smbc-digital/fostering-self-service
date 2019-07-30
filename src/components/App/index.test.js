import { React, mount, useContextMock } from 'helpers/SetupTest'
import { Router } from 'react-router'
import App from './index.js'
import { createBrowserHistory as createHistory } from 'history'
import moment from 'moment-timezone'
import { getPageRoute } from 'helpers/pagehelper'

describe('App', () => {
	beforeEach(() => {
		useContextMock.mockReturnValue({
			homeVisitDateTime: {
				value: moment().add(10, 'd').format('DD/MM/YYYY HH:mm')
			},
			statuses: {}
		})
	})

	it('should not render home visit routes', () => {
		// Arrange
		let history = createHistory()

		history.push(getPageRoute(2))

		useContextMock.mockReturnValue({
			homeVisitDateTime: {
				value: moment().format('DD/MM/YYYY HH:mm')
			},
			statuses: {}
		})

		// Act
		const wrapper = mount(<Router history={history} ><App /></Router>)

		// Assert
		expect(wrapper.find('KnownByAnotherName')).toHaveLength(0)
		expect(wrapper.find('Start')).toHaveLength(1)
	})

	it('should render home visit routes', () => {
		// Arrange
		let history = createHistory()

		history.push(getPageRoute(2))

		useContextMock.mockReturnValue({
			homeVisitDateTime: {
				value: moment().add(1, 'd').format('DD/MM/YYYY HH:mm')
			},
			statuses: {},
			firstApplicant: {
				everBeenKnownByAnotherName: {
					value: ''
				}, 
				firstName: {
					value: ''
				}, 
				lastName: {
					value: ''
				}, 
				anotherName: {
					value: ''
				}
			}
		})

		// Act
		const wrapper = mount(<Router history={history} ><App /></Router>)

		// Assert
		expect(wrapper.find('KnownByAnotherName')).toHaveLength(1)
		expect(wrapper.find('Start')).toHaveLength(0)
	})

	it('should render a Switch', () => {
		// Arrange
		let history = createHistory()

		history.push(getPageRoute(1))

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