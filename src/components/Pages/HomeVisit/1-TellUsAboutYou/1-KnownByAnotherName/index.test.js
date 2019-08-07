import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import KnownByAnotherName from './index'
import { Applicant } from 'components/Provider'
import * as helpers from 'helpers'

describe('KnownByAnotherName', () => {

    const onChangeTargetMock = jest.fn()
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                TellUsAboutYourselfStatus: 0
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

        const wrapper = mount(<KnownByAnotherName history={history} match={match}/>)

        // Act
        wrapper.find('Button').simulate('submit')

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

        const wrapper = mount(<KnownByAnotherName history={history} match={match}/>)

        // Act
        wrapper.find('Button').simulate('submit')

        // Assert
        const pageRoute = helpers.getPageRoute(3)
        expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
    })

    it('should call onChangeTarget', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<KnownByAnotherName history={history} match={match}/>)

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
        helpers.updateFormStatus = jest.fn().mockImplementation(({ setStatus, currentStatus }) => {
            setStatus(currentStatus)
        })
        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)

        // Act
        mount(<KnownByAnotherName history={history} match={match}/>)
        await mockPromise

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalled()

    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const match = {
                params: undefined
            }

            const tree = renderer
                .create(<KnownByAnotherName history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})