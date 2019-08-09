import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import LanguagesSpokenInYourHome from './index'
import * as helpers from 'helpers'
import { START_PAGE, PARTNERSHIP_STATUS, FOSTERING_HISTORY } from 'routes'

describe('LanguagesSpokenInYourHome', () => {
	const onChangeStatusMock = jest.fn()

	beforeEach(() => {
		useContextMock.mockReturnValue({
			onChangeStatus: onChangeStatusMock,
			statuses: {
                languageSpokenInYourHomeStatus: 0
            },
			primaryLanguage: {
				value: 'English',
				isValid: true
			},
			otherLanguages: {
				value: 'Welsh',
				isValid: true
			},
			withPartner: {
				value: 'Yes',
				isValid: true
			}
		})
	})

	it('should push to next page on submit for multiple applicants', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('form').simulate('submit')
		await Promise.resolve()

		// Assert
		expect(history.push).toHaveBeenCalledWith(PARTNERSHIP_STATUS)
	})

	it('should push to next page on submit for single applicants', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		useContextMock.mockReturnValue({
			onChangeStatus: onChangeStatusMock,
			statuses: {
                languageSpokenInYourHomeStatus: 0
            },
			primaryLanguage: {
				value: 'English',
				isValid: true
			},
			otherLanguages: {
				value: 'Welsh',
				isValid: true
			},
			withPartner: {
				value: 'No',
				isValid: true
			}
		})

		helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('form').simulate('submit')
		await Promise.resolve()

		// Assert
		expect(history.push).toHaveBeenCalledWith(FOSTERING_HISTORY)
	})

	it('should call updateHomeVisitForm on form submit', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('form').simulate('submit')
		await Promise.resolve()

		// Assert
		expect(helpers.updateHomeVisitForm).toHaveBeenCalled()
	})

	it('should call onChangeStatus on form submit', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('form').simulate('submit')
		await Promise.resolve()

		// Assert
		expect(onChangeStatusMock).toHaveBeenCalledWith('languageSpokenInYourHomeStatus', 0)
	})

	it('should call updateHomeVisitForm on save and go back click', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('button').at(1).simulate('click')
		await Promise.resolve()

		// Assert
		expect(helpers.updateHomeVisitForm).toHaveBeenCalled()		
	})

	it('should push to tasklist page on save and go back click', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('button').at(1).simulate('click')
		await Promise.resolve()

		// Assert
		expect(history.push).toHaveBeenCalledWith(START_PAGE)		
	})

	it('should push to error page on updateHomeVisitForm error', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })

		const wrapper = mount(<LanguagesSpokenInYourHome history={history} />)
		
		// Act
		await wrapper.find('form').simulate('submit')

		// Assert
		expect(history.push).toHaveBeenCalledWith('/error')		
	})

	describe('snapshot', () => {
		it('renders correctly', () => {
			const tree = renderer
			.create(<LanguagesSpokenInYourHome history={{}}/>)
			.toJSON()

			expect(tree).toMatchSnapshot()
		})
	})
})