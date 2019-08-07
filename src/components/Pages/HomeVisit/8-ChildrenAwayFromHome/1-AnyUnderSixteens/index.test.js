import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import AnyChildrenUnderSixteen from './index'
import { Applicant } from 'components/Provider'
import * as helpers from 'helpers'
import { ABOUT_CHILDREN_UNDER_SIXTEEN_LIVING_AWAY, CHILDREN_UNDER_SIXTEEN_LIVING_AWAY, START_PAGE } from 'routes'

describe('AnyChildrenUnderSixteen', () => {
	const onChangeTargetMock = jest.fn()
	const onChangeStatusMock = jest.fn()

	beforeEach(() => {
		useContextMock.mockReturnValue({
			currentApplicant: Applicant.FirstApplicant,
			onChangeTarget: onChangeTargetMock,
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
					value: true,
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
		expect(history.push).toHaveBeenCalledWith(ABOUT_CHILDREN_UNDER_SIXTEEN_LIVING_AWAY + '/second-applicant')
	})

	it('should push to second user on same page, when user selects false', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
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

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(4))

        const wrapper = mount(<AnyChildrenUnderSixteen history={history} match={match}/>)

		// Act
        await wrapper.find('Button').at(0).simulate('submit')
        await Promise.resolve()

		// Assert
        expect(history.push).toHaveBeenCalledWith(CHILDREN_UNDER_SIXTEEN_LIVING_AWAY + '/second-applicant')
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

		// Assert
        expect(history.push).toHaveBeenCalledWith(ABOUT_CHILDREN_UNDER_SIXTEEN_LIVING_AWAY)
    })

    it('should push to page 1 when click save and go back', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
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
            }
        })

        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AnyChildrenUnderSixteen history={history} match={match}/>)

        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    it('should call onChangeTarget', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<AnyChildrenUnderSixteen history={history} match={match}/>)

        // Act
        wrapper.find('input').first().simulate('change')

        // Assert
        expect(onChangeTargetMock).toHaveBeenCalled()
    })
    
    it('should update form status', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const mockPromise = Promise.resolve()
        helpers.updateHomeVisitFormStatus = jest.fn().mockImplementation((form, status, setStatus) => {
            setStatus(status)
        })
        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)

        // Act
        mount(<AnyChildrenUnderSixteen history={history} match={match}/>)
        await mockPromise

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalled()
    })

    it('should push to error page on updateHomeVisitForm error', async () => {
        // Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
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
            }
        })

        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<AnyChildrenUnderSixteen history={history} match={match}/>)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const match = {
                params: undefined
            }

            const tree = renderer
                .create(<AnyChildrenUnderSixteen history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})