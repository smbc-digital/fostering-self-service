import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import YourGpDetails from './index'
import { TaskStatus } from 'helpers'
import * as helpers from 'helpers'

describe('YourGpDetails', () => {
    
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
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
    })

    it('should update form status', () => {
        // Arrange
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
        expect(history.push).toHaveBeenCalledWith(`${helpers.getPageRoute(21)}/second-applicant`)
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
})