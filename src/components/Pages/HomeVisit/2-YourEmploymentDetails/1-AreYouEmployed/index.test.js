import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import { act } from 'react-dom/test-utils'
import AreYouEmployed from './index'
import { Applicant } from 'constants'
import * as helpers from 'helpers'
import { EMPLOYMENT_DETAILS, ARE_YOU_EMPLOYED, LANGUAGES_SPOKEN_IN_YOUR_HOME, START_PAGE } from 'routes'

describe('AreYouEmployed', () => {

    const onChangeTargetMock = jest.fn()
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                YourEmploymentDetails: 0
            },
            firstApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'true',
                    isValid: true
                },
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
                    value: 'true',
                    isvalid: true
                }
            },
            secondApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'false',
                    isValid: true
                },
                firstName: {
                    value: 'second applicant first name',
                    isValid: true
                },
                lastName: {
                    value: 'second applicant last name',
                    isValid: true
                },
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
                    value: 'true',
                    isvalid: true
                }
            }
        })
    })

    it('should push to next page on submit, when first applicant', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<AreYouEmployed history={history} match={match}/>)

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

        const wrapper = mount(<AreYouEmployed history={history} match={match}/>)

        // Act
        wrapper.find('Button').at(0).simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(EMPLOYMENT_DETAILS + '/second-applicant')
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
                everBeenKnownByAnotherName: {
                    value: 'true',
                    isValid: true
                },
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
                    value: 'false',
                    isvalid: true
                }
            },
            secondApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'false',
                    isValid: true
                },
                firstName: {
                    value: 'second applicant first name',
                    isValid: true
                },
                lastName: {
                    value: 'second applicant last name',
                    isValid: true
                },
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
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

        const wrapper = mount(<AreYouEmployed history={history} match={match}/>)

        await act(async () => {
            await wrapper.find('Button').at(0).simulate('submit')
            await Promise.resolve()
        })

        expect(history.push).toHaveBeenCalledWith(ARE_YOU_EMPLOYED + '/second-applicant')
    })

    it('should push to EmploymentDetails, when user selects true', () => {
        //Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<AreYouEmployed history={history} match={match}/>)

        wrapper.find('Button').at(0).simulate('submit')

        expect(history.push).toHaveBeenCalledWith(EMPLOYMENT_DETAILS)
    })

    it('should push to page 6 when user selects false and there are no second applicant', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                YourEmploymentDetails: 0
            },
            firstApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'true',
                    isValid: true
                },
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
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

        const wrapper = mount(<AreYouEmployed history={history} match={match}/>)

        await act(async () => {
            await wrapper.find('Button').at(0).simulate('submit')
            await Promise.resolve()
        })

        expect(history.push).toHaveBeenCalledWith(LANGUAGES_SPOKEN_IN_YOUR_HOME)
    })

    it('should push to page 6 when second applicant selects false', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                YourEmploymentDetails: 0
            },
            firstApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'true',
                    isValid: true
                },
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
                    value: 'false',
                    isvalid: true
                }
            },
            secondApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'false',
                    isValid: true
                },
                firstName: {
                    value: 'second applicant first name',
                    isValid: true
                },
                lastName: {
                    value: 'second applicant last name',
                    isValid: true
                },
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
                    value: 'false',
                    isvalid: true
                }
            }
        })

        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AreYouEmployed history={history} match={match}/>)

        await act(async () => {
            await wrapper.find('Button').at(0).simulate('submit')
            await Promise.resolve()
        })

        expect(history.push).toHaveBeenCalledWith(LANGUAGES_SPOKEN_IN_YOUR_HOME)
    })

    it('should push to page 1 when applicant click save and go back', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                YourEmploymentDetails: 0
            },
            firstApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'true',
                    isValid: true
                },
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
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

        const wrapper = mount(<AreYouEmployed history={history} match={match}/>)

        await act(async () => {
            await wrapper.find('Button').at(1).simulate('click')
            await Promise.resolve()
        })

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

        const wrapper = mount(<AreYouEmployed history={history} match={match}/>)

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
        mount(<AreYouEmployed history={history} match={match}/>)
        await mockPromise

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalled()

    })

    it('should push to error page on updateForm error', async () => {
        // Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                YourEmploymentDetails: 0
            },
            firstApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'true',
                    isValid: true
                },
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
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
        const wrapper = mount(<AreYouEmployed history={history} match={match}/>)

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
                .create(<AreYouEmployed history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})