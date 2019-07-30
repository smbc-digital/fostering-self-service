import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import YourGpDetails from './index'
import { TaskStatus } from 'helpers'
import * as helpers from 'helpers'

describe('YourGpDetails', () => {
    
    const onChangeStatusMock = jest.fn()
    const onChangeApplicantMock = jest.fn()

    beforeEach(() => {
        jest.resetAllMocks()
        useContextMock.mockReturnValue({
            statuses: {
                gpDetailsStatus: TaskStatus.Completed
            },
            onChangeStatus: onChangeStatusMock,
            onChangeApplicant: onChangeApplicantMock,
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
                }
            },
            secondApplicant: null
        })
    })

    it('should update form status', () => {
        // Arrange
        useContextMock.mockReturnValue({
            statuses: {
                gpDetailsStatus: TaskStatus.None
            },
            onChangeStatus: onChangeStatusMock,
            onChangeApplicant: jest.fn(),
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
                }
            },
            secondApplicant: null
        })
        const match = {
            params: []
        }

        helpers.updateFormStatus = jest.fn().mockImplementation((form, status, setStatus) => {
            setStatus(status)
        })

        // Act
        mount(<YourGpDetails match={match}/>)

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('gpDetailsStatus', TaskStatus.None)
    })

    it('should push to next page on submit, when second applicant', () => {
        // Arrange
        useContextMock.mockReturnValue({
            statuses: {
                gpDetailsStatus: TaskStatus.None
            },
            onChangeStatus: onChangeStatusMock,
            onChangeApplicant: jest.fn(),
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
                }
            }
        })
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(`${helpers.getPageRoute(22)}/second-applicant`)
    })

    it('should call updateForm on submit', async () => {
        //Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        //Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        //Assert
        expect(helpers.updateForm).toHaveBeenCalled()
    })

    it('should call onChangeStatus on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

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
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
    })

    it('should push to error page on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateForm = jest.fn().mockImplementation(() => { throw new Error() }) 
        
        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should call updateForm on save and go back click', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateForm = jest.fn()

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        wrapper.find('button').at(1).simulate('click')

        // Assert
        expect(helpers.updateForm).toHaveBeenCalled()
    })

    it('should push to the start page on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        await wrapper.find('button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
    })

    it('should set isLoading on submit', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateForm = jest.fn()

        // Act
        const wrapper = mount(<YourGpDetails history={history} match={match} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(wrapper.find('SubmitButton').first().props().isLoading).toBe(true)
    })

    it('should call onChangeApplicant', () => {
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
        expect(onChangeApplicantMock).toHaveBeenCalled()
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