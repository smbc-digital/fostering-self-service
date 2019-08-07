import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import YourHealth from './index'
import { Applicant } from 'components/Provider'
import * as helpers from '/helpers'
import { ABOUT_YOUR_HEALTH, START_PAGE } from 'routes'

describe('YourHealth', () => {

    const onChangeTargetMock = jest.fn()
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                YourHealth: 0
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

    it('should push to error page on updateHomeVisitForm error', async () => {
        // Arrange
        const match = {
            params: [
                'second-applicant'
            ]
        }
        const history = {
            push: jest.fn()
        }

        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<YourHealth history={history} match={match} />)

        // Act
        await wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should push to second user on same page, when user selects false', () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                YourHealth: 0
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
                },
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
                registeredDisabled: {
                    value: 'false',
                    isValid: true
                },
                practitioner: {
                    value: 'false',
                    isValid: true
                },
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

        expect(history.push).toHaveBeenCalledWith(ABOUT_YOUR_HEALTH + '/second-applicant')
    })

    it('should call onChangeTarget', () => {
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
        expect(onChangeTargetMock).toHaveBeenCalled()
    })

    it('should push to correct page on save and go back', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<YourHealth history={history} match={match}/>)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })
    
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