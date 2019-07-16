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

        const wrapper = mount(<YourHealth history={history} match={match}/>)

        // Act
        wrapper.find('Button').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalled()
    })

    it('should push to error page on updateForm error', async () => {
        // Arrange
        const match = {
            params: [
                'second-applicant'
            ]
        }
        const history = {
            push: jest.fn()
        }

        helpers.updateForm = jest.fn().mockImplementation(() => { throw new Error() })
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
            onChangeApplicant: onChangeApplicantMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                YourHealth: 0
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
                registeredDisabled: {
                    value: 'false',
                    isValid: true
                },
                practitioner: {
                    value: 'false',
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
                registeredDisabled: {
                    value: 'false',
                    isValid: true
                },
                practitioner: {
                    value: 'false',
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

        const wrapper = mount(<YourHealth history={history} match={match}/>)

        wrapper.find('Button').simulate('submit')

        const pageRoute = helpers.getPageRoute(11)

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