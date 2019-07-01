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
<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
            firstApplicant: {
=======
            firstApplicant: {              
>>>>>>> feature(YourHealth): added your health page and tests
=======
            firstApplicant: {
>>>>>>> test(YourHealth): fixed test wip
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
=======
>>>>>>> test(YourHealth): fixed test wip
                registeredDisabled: {
                    value: 'true',
                    isValid: true
                },
                practitioner: {
                    value: 'true',
                    isValid: true
                }
<<<<<<< refs/remotes/origin/master
=======
>>>>>>> feature(YourHealth): added your health page and tests
=======
>>>>>>> test(YourHealth): fixed test wip
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
<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
                registeredDisabled: {
                    value: 'true',
                    isValid: true
                },
                practitioner: {
                    value: 'true',
                    isValid: true
                }
=======
                anotherName: {
                    value: 'last name',
=======
                registeredDisabled: {
                    value: 'true',
>>>>>>> test(YourHealth): fixed test wip
                    isValid: true
                },
                practitioner: {
                    value: 'true',
<<<<<<< refs/remotes/origin/master
                    isvalid: true
                },
>>>>>>> feature(YourHealth): added your health page and tests
=======
                    isValid: true
                }
>>>>>>> test(YourHealth): fixed test wip
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

<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
    it('should push to error page on updateForm error', async () => {
        // Arrange
        const match = {
            params: [
                'second-applicant'
            ]
        }
=======
    it('should push to next page on submit, when second applicant', () => {
        // Arrange
>>>>>>> feature(YourHealth): added your health page and tests
        const history = {
            push: jest.fn()
        }

<<<<<<< refs/remotes/origin/master
        helpers.updateForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<YourHealth history={history} match={match} />)

        // Act
        await wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
=======
        const match = {
            params: ['second-applicant']
        }
=======
    // TO DO: Make it go to the next mini form and test that it does so
    // it('should push to next mini form page on submit, when second applicant', async () => {
    //     // Arrange
    //     const history = {
    //         push: jest.fn()
    //     }

    //     const match = {
    //         params: ['second-applicant']
    //     }
>>>>>>> test(YourHealth): fixed test wip

    //     helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

    //     const wrapper = mount(<YourHealth history={history} match={match}/>)

<<<<<<< refs/remotes/origin/master
        // Assert
        const pageRoute = helpers.getPageRoute(5)
        expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
>>>>>>> feature(YourHealth): added your health page and tests
    })
=======
    //     // Act
    //     await wrapper.find('Button').at(0).simulate('submit')
    //     await Promise.resolve()

    //     // Assert
    //     const pageRoute = helpers.getPageRoute(6)
    //     expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
    // })
>>>>>>> test(YourHealth): fixed test wip

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
<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
=======
                everBeenKnownByAnotherName: {
                    value: 'true',
                    isValid: true
                },
>>>>>>> feature(YourHealth): added your health page and tests
=======
>>>>>>> test(YourHealth): fixed test wip
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
                registeredDisabled: {
                    value: 'false',
                    isValid: true
                },
                practitioner: {
                    value: 'false',
                    isValid: true
=======
                anotherName: {
                    value: 'last name',
=======
                registeredDisabled: {
                    value: 'false',
>>>>>>> test(YourHealth): fixed test wip
                    isValid: true
                },
                practitioner: {
                    value: 'false',
<<<<<<< refs/remotes/origin/master
                    isvalid: true
>>>>>>> feature(YourHealth): added your health page and tests
=======
                    isValid: true
>>>>>>> test(YourHealth): fixed test wip
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
<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
                registeredDisabled: {
                    value: 'false',
                    isValid: true
                },
                practitioner: {
                    value: 'false',
                    isValid: true
=======
                anotherName: {
                    value: 'last name',
                    isValid: true
                },
                areYouEmployed:{
                    value: 'true',
                    isvalid: true
>>>>>>> feature(YourHealth): added your health page and tests
=======
                registeredDisabled: {
                    value: 'false',
                    isValid: true
                },
                practitioner: {
                    value: 'false',
                    isValid: true
>>>>>>> test(YourHealth): fixed test wip
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

<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
        const pageRoute = helpers.getPageRoute(6)
=======
        const pageRoute = helpers.getPageRoute(4)
>>>>>>> feature(YourHealth): added your health page and tests
=======
        const pageRoute = helpers.getPageRoute(6)
>>>>>>> test(YourHealth): fixed test wip

        expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
    })

<<<<<<< refs/remotes/origin/master
=======
   
    
    
>>>>>>> feature(YourHealth): added your health page and tests
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

<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
    it('should push to correct page on save and go back', async () => {
=======
    it('should update form status', async () => {
>>>>>>> feature(YourHealth): added your health page and tests
=======
    it('should push to correct page on save and go back', async () => {
>>>>>>> test(YourHealth): fixed test wip
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
<<<<<<< refs/remotes/origin/master
<<<<<<< refs/remotes/origin/master
            params: ['second-applicant']
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<YourHealth history={history} match={match}/>)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
=======
            params: undefined
=======
            params: ['second-applicant']
>>>>>>> test(YourHealth): fixed test wip
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<YourHealth history={history} match={match}/>)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

<<<<<<< refs/remotes/origin/master
>>>>>>> feature(YourHealth): added your health page and tests
=======
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
>>>>>>> test(YourHealth): fixed test wip
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