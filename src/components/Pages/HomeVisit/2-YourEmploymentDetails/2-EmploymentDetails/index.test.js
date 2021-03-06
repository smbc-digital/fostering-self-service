import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import EmploymentDetails from './index'
import { Applicant } from 'constants'
import * as helpers from 'helpers'
import { LANGUAGES_SPOKEN_IN_YOUR_HOME, ARE_YOU_EMPLOYED, START_PAGE } from 'routes'

describe('EmploymentDetails', () => {

    const onChangeStatusMock = jest.fn()
    const onChangeTargetMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            country: [],
            nationality: [],
            ethnicity: [],
            firstApplicant: {
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                isEmployed:{
                    value: 'true',
                    isValid: true
                },
                currentEmployer: {
                    value: 'employer1',
                    isValid: true
                },
                currentHoursOfWork: {
                    value: '1',
                    isValid: true
                },
                jobTitle: {
                    value: 'ceo',
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
                isEmployed:{
                    value: 'true',
                    isValid: true
                },
                currentEmployer: {
                    value: 'employer2',
                    isValid: true
                },
                currentHoursOfWork: {
                    value: '2',
                    isValid: true
                },
                jobTitle: {
                    value: 'ceo2',
                    isValid: true
                }
            }
        })
    })

    it('should push to next page on submit, when single applicant', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            country: [],
            nationality: [],
            ethnicity: [],
            firstApplicant: {
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                isEmployed:{
                    value: 'true',
                    isValid: true
                },
                currentEmployer: {
                    value: 'employer1',
                    isValid: true
                },
                currentHoursOfWork: {
                    value: '1',
                    isValid: true
                },
                jobTitle: {
                    value: 'ceo',
                    isValid: true
                }
            }
        })

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<EmploymentDetails history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(LANGUAGES_SPOKEN_IN_YOUR_HOME)
    })

    it('should push to next page on submit, when second applicant', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<EmploymentDetails history={history} match={match}/>)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(`${ARE_YOU_EMPLOYED}/second-applicant`)
    })

    it('should call updateForm on form submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        const wrapper = mount(<EmploymentDetails history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(helpers.updateHomeVisitForm).toHaveBeenCalled()
    })

    it('should call onChangeStatus on form submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        const wrapper = mount(<EmploymentDetails history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('yourEmploymentDetailsStatus', 0)
    })

    it('should call updateForm on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm =  jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<EmploymentDetails history={history} match={match}/>)

        // Act
        await wrapper.find('button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(helpers.updateHomeVisitForm).toHaveBeenCalled()
    })

    it('should push to start page on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<EmploymentDetails history={history} match={match}/>)

        // Act
        await wrapper.find('button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    it('should push to error page on updateForm error', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<EmploymentDetails history={history} match={match}/>)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should call onChangeTarget', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        const wrapper = mount(<EmploymentDetails history={history} match={match}/>)

        // Act
        wrapper
            .find('input')
            .first()
            .simulate('change')

        // Assert
        expect(onChangeTargetMock).toHaveBeenCalled()
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const match = {
                params: undefined
            }

            const tree = renderer
                .create(<EmploymentDetails history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})