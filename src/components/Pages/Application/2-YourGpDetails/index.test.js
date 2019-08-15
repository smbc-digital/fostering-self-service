import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import YourGpDetails from './index'
import { TaskStatus } from 'helpers'
import { START_PAGE, ABOUT_YOUR_GP, FAMILY_REFERENCE } from 'routes'
import * as helpers from 'helpers'

describe('YourGpDetails', () => {
    
    const onChangeStatusMock = jest.fn()
    const onChangeTargetMock = jest.fn()

    beforeEach(() => {
        jest.resetAllMocks()
        useContextMock.mockReturnValue({
            statuses: {
                gpDetailsStatus: TaskStatus.Completed
            },
            onChangeStatus: onChangeStatusMock,
            onChangeTarget: onChangeTargetMock,
            firstApplicant: {
                nameOfGp: {
                    value: 'test',
                    isValid: true
                },
                nameOfGpPractice: {
                    value: 'test',
                    isValid: true
                },
                gpPhoneNumber: {
                    value: '01234567890',
                    isValid: true
                },
                gpAddress: {
                    value: {
                        addressLine1: 'line 1',
                        addressLine2: 'line 2',
                        town: 'town',
                        postcode: 'sk13xe'
                    },
                    isValid: true
                },
                firstName: {
                    value: 'test',
                    isValid: true
                },
                lastName: {
                    value: 'test',
                    isValid: true
                }
            },
            secondApplicant: null
        })
    })


    it('should push to next page on submit, when second applicant', () => {
        // Arrange
        useContextMock.mockReturnValue({
            statuses: {
                gpDetailsStatus: TaskStatus.None
            },
            onChangeStatus: onChangeStatusMock,
            onChangeTarget: jest.fn(),
            firstApplicant: {
                nameOfGp: {
                    value: 'test',
                    isValid: true
                },
                nameOfGpPractice: {
                    value: 'test',
                    isValid: true
                },
                gpPhoneNumber: {
                    value: '01234567890',
                    isValid: true
                },
                gpAddress: {
                    value: {
                        addressLine1: 'line 1',
                        addressLine2: 'line 2',
                        town: 'town',
                        postcode: 'sk13xe'
                    },
                    isValid: true
                },
                firstName: {
                    value: 'test',
                    isValid: true
                },
                lastName: {
                    value: 'test',
                    isValid: true
                }
            },
            secondApplicant: {
                nameOfGp: {
                    value: 'test',
                    isValid: true
                },
                nameOfGpPractice: {
                    value: 'test',
                    isValid: true
                },
                gpPhoneNumber: {
                    value: '01234567890',
                    isValid: true
                },
                gpAddress: {
                    value: {
                        addressLine1: 'line 1',
                        addressLine2: 'line 2',
                        town: 'town',
                        postcode: 'sk13xe'
                    },
                    isValid: true
                },
                firstName: {
                    value: 'test',
                    isValid: true
                },
                lastName: {
                    value: 'test',
                    isValid: true
                }
            }
        })
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }

        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(`${ABOUT_YOUR_GP}/second-applicant`)
    })

    it('should call updateApplicationForm on submit', async () => {
        //Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        //Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        //Assert
        expect(helpers.updateApplicationForm).toHaveBeenCalled()
    })

    it('should call onChangeStatus on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('gpDetailsStatus', 0)
    })

    it('should push to the next page on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(FAMILY_REFERENCE)
    })

    it('should push to error page on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockImplementation(() => { throw new Error() }) 
        
        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should call updateApplicationForm on save and go back click', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn()

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        wrapper.find('button').at(1).simulate('click')

        // Assert
        expect(helpers.updateApplicationForm).toHaveBeenCalled()
    })

    it('should push to the start page on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        await wrapper.find('button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    it('should set isLoading on submit', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn()

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(wrapper.find('SubmitButton').first().props().isLoading).toBe(true)
    })

    it('should call onChangeTarget', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        wrapper.find('input').first().simulate('change')

        // Assert
        expect(onChangeTargetMock).toHaveBeenCalled()
    })

    it('should update form status', () => {
        // Arrange
        useContextMock.mockReturnValue({
            statuses: {
                gpDetailsStatus: TaskStatus.None
            },
            onChangeStatus: onChangeStatusMock,
            onChangeTarget: jest.fn(),
            firstApplicant: {
                nameOfGp: {
                    value: 'test',
                    isValid: true
                },
                nameOfGpPractice: {
                    value: 'test',
                    isValid: true
                },
                gpPhoneNumber: {
                    value: '01234567890',
                    isValid: true
                },
                gpAddress: {
                    value: {
                        addressLine1: 'line 1',
                        addressLine2: 'line 2',
                        town: 'town',
                        postcode: 'sk13xe'
                    },
                    isValid: true
                },
                firstName: {
                    value: 'test',
                    isValid: true
                },
                lastName: {
                    value: 'test',
                    isValid: true
                }
            },
            secondApplicant: null
        })
        const match = {
            params: []
        }

        helpers.updateFormStatus = jest.fn().mockImplementation(({ currentStatus, setStatus }) => {
            setStatus(currentStatus)
        })

        // Act
        mount(<YourGpDetails history={{}} match={match}/>)

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('gpDetailsStatus', TaskStatus.None)
    })

    describe('snapshot', () => {
        
        it('should render correctly', () => {
            const tree = renderer
                .create(<YourGpDetails history={{}} match={{ params: [] }} />)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})