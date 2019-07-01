import { React, mount, useContextMock, renderer } from '../../../helpers/SetupTest'
import YourHealth from './index'
import { Applicant } from '../../Provider'
import * as helpers from '../../../helpers'

describe('Your Health', () => {

    const onChangeApplicantMock = jest.fn()
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
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
                registeredDisabled: {
                    value: 'true',
                    isValid: true
                },
                practitioner: {
                    value: 'true',
                    isValid: true
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
                registeredDisabled: {
                    value: 'true',
                    isValid: true
                },
                practitioner: {
                    value: 'true',
                    isValid: true
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

        const wrapper = mount(<YourHealth history={history} match={match}/>)

        // Act
        wrapper.find('Button').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalled()
    })

    // TO DO: Make it go to the next mini form and test that it does so
    // it('should push to next mini form page on submit, when second applicant', async () => {
    //     // Arrange
    //     const history = {
    //         push: jest.fn()
    //     }

    //     const match = {
    //         params: ['second-applicant']
    //     }

    //     helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

    //     const wrapper = mount(<YourHealth history={history} match={match}/>)

    //     // Act
    //     await wrapper.find('Button').at(0).simulate('submit')
    //     await Promise.resolve()

    //     // Assert
    //     const pageRoute = helpers.getPageRoute(6)
    //     expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
    // })

    it('should push to second user on same page, when user selects false', () => {

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
                registeredDisabled: {
                    value: 'false',
                    isValid: true
                },
                practitioner: {
                    value: 'false',
                    isValid: true
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
                registeredDisabled: {
                    value: 'false',
                    isValid: true
                },
                practitioner: {
                    value: 'false',
                    isValid: true
                }
            }
        })

        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<YourHealth history={history} match={match}/>)

        wrapper.find('Button').simulate('submit')

        const pageRoute = helpers.getPageRoute(6)

        expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
    })

   
    
    
    it('should call onChangeApplicant', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<YourHealth history={history} match={match}/>)

        // Act
        wrapper.find('input').first().simulate('change')

        // Assert
        expect(onChangeApplicantMock).toHaveBeenCalled()
    })

    it('should push to correct page on save and go back', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<YourHealth history={history} match={match}/>)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
    })
    // it('should update form status', async () => {
    //     // Arrange
    //     const history = {
    //         push: jest.fn()
    //     }

    //     const match = {
    //         params: undefined
    //     }

    //     const mockPromise = Promise.resolve()
    //     helpers.updateFormStatus = jest.fn().mockImplementation((form, status, setStatus) => {
    //         setStatus(status)
    //     })
    //     helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)

    //     // Act
    //     mount(<YourHealth history={history} match={match}/>)
    //     await mockPromise

    //     // Assert
    //     expect(onChangeStatusMock).toHaveBeenCalled()

    // })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const match = {
                params: undefined
            }

            const tree = renderer
                .create(<YourHealth history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})