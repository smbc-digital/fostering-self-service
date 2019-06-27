import { React, mount, useContextMock } from '../../../helpers/SetupTest'
import LanguagesSpokenInYourHome from './index'
import * as helpers from '../../../helpers'

describe('LanguagesSpokenInYourHome', () => {
	const onChangeStatusMock = jest.fn()

	beforeEach(() => {
		useContextMock.mockReturnValue({
			onChangeStatus: onChangeStatusMock,
			primaryLanguage: {
				value: 'English',
				isValid: true
			},
			otherLanguages: {
				value: 'Welsh',
				isValid: true
			}
		})
	})

	it('should push to next page on submit', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('form').simulate('submit')
		await Promise.resolve()

		// Assert
		const pageRoute = helpers.getPageRoute(7)
		expect(history.push).toHaveBeenCalledWith(pageRoute)
	})

	it('should call updateForm on form submit', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('form').simulate('submit')
		await Promise.resolve()

		// Assert
		expect(helpers.updateForm).toHaveBeenCalled()
	})

	it('should call onChangeStatus on form submit', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('form').simulate('submit')
		await Promise.resolve()

		// Assert
		expect(onChangeStatusMock).toHaveBeenCalledWith('languagesSpokenInYourHomeStatus', 0)
	})

	it('should call updateForm on save and go back click', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('button').at(1).simulate('click')
		await Promise.resolve()

		// Assert
		expect(helpers.updateForm).toHaveBeenCalled()		
	})

	it('should push to tasklist page on save and go back click', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('button').at(1).simulate('click')
		await Promise.resolve()

		// Assert
		expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))		
	})

	it('should push to error page on updateForm error', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateForm = jest.fn().mockImplementation(() => { throw new Error() })

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('form').simulate('submit')

		// Assert
		expect(history.push).toHaveBeenCalledWith('/error')		
	})
})