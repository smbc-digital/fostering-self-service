import { React, mount, useContextMock } from '../../../../helpers/SetupTest'
import AnyChildrenUnderSixteen from './index'
import { Applicant } from '../../../Provider'
import * as helpers from '../../../../helpers'

describe('AnyChildrenUnderSixteen', () => {
	const onChangeApplicantMock = jest.fn()
	const onChangeStatusMock = jest.fn()

	beforeEach(() => {
		useContextMock.mockReturnValue({
			currentApplicant: Applicant.FirstApplicant,
			onChangeApplicant: onChangeApplicantMock,
			onChangeStatus: onChangeStatusMock,
			statuses: {
				ChildrenLivingAwayFromHome: 0
			},
			firstApplicant: {
				firstName: {
					value: 'first name',
					isValid: true
				},
				lastName: {
					value: 'last name',
					isValid: true
				},
				anyChildrenUnderSixteen: {
					value: 'true',
					isValid: true
				}
			},
			secondApplicant: {
				firstName: {
					value: 'second first name',
					isValid: true
				},
				lastName: {
					value: 'second last name',
					isValid: true
				},
				anyChildrenUnderSixteen: {
					value: 'true',
					isValid: true
				}
			}
		})
	})

	it('should push to next page on submit when first applicant', () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const match = {
			params: undefined
		}

		const wrapper = mount(<AnyChildrenUnderSixteen history={history} match={match}/>)
		// Act
		wrapper.find('Button').at(0).simulate('submit')

		// Assert
		expect(history.push).toHaveBeenCalled()
	})

	it('should push to next page on submit, when second applicant', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        const wrapper = mount(<AnyChildrenUnderSixteen history={history} match={match}/>)

        // Act
        wrapper.find('Button').at(0).simulate('submit')

        // Assert
        const pageRoute = helpers.getPageRoute(18)
		expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
	})

	it('should push to second user on same page, when user selects false', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                YourEmploymentDetails: 0
            },
            firstApplicant: {
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                anyChildrenUnderSixteen:{
                    value: 'false',
                    isvalid: true
                }
            },
            secondApplicant: {
                firstName: {
                    value: 'second applicant first name',
                    isValid: true
                },
                lastName: {
                    value: 'second applicant last name',
                    isValid: true
                },
                anyChildrenUnderSixteen:{
                    value: 'true',
                    isvalid: true
                }
            }
        })

        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(4))

        const wrapper = mount(<AnyChildrenUnderSixteen history={history} match={match}/>)

		// Act
        await wrapper.find('Button').at(0).simulate('submit')
        await Promise.resolve()

        const pageRoute = helpers.getPageRoute(17)

		// Assert
        expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
	})
	
	it('should push to AboutChildrenUnderSixteen, when user selects true', () => {
        //Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<AnyChildrenUnderSixteen history={history} match={match}/>)

		// Act
        wrapper.find('Button').at(0).simulate('submit')

        const pageRoute = helpers.getPageRoute(18)

		// Assert
        expect(history.push).toHaveBeenCalledWith(pageRoute)
    })
})