import { React, mount, useContextMock, renderer } from '../../../../helpers/SetupTest'
import AnyUnderSixteens from './index'
import { Applicant } from '../../../Provider'
import * as helpers from '../../../../helpers'

describe('AnyUnderSixteens', () => {

    const onChangeApplicantMock = jest.fn()
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName:{
                    value: 'first name',
                    isvalid: true
                },
                lastName:{
                    value: 'last name',
                    isvalid: true
                },
                anyChildrenUnderSixteen:{
                    value: 'true',
                    isvalid: true
                }
            },
            secondApplicant: {
                firstName:{
                    value: 'first name',
                    isvalid: true
                },
                lastName:{
                    value: 'last name',
                    isvalid: true
                },
                anyChildrenUnderSixteen:{
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

        const wrapper = mount(<AnyUnderSixteens history={history} match={match}/>)

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

        const wrapper = mount(<AnyUnderSixteens history={history} match={match}/>)

        // Act
        wrapper.find('Button').at(0).simulate('submit')

        // Assert
        const pageRoute = helpers.getPageRoute(18)
        expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
    })

    it('should push to second user on same page, when user selects false', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName:{
                    value: 'first name',
                    isvalid: true
                },
                lastName:{
                    value: 'last name',
                    isvalid: true
                },
                anyChildrenUnderSixteen:{
                    value: 'false',
                    isvalid: true
                }
            },
            secondApplicant: {
                firstName:{
                    value: 'first name',
                    isvalid: true
                },
                lastName:{
                    value: 'last name',
                    isvalid: true
                },
                anyChildrenUnderSixteen:{
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

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(17))

        const wrapper = mount(<AnyUnderSixteens history={history} match={match}/>)

        //Act
        await wrapper.find('Button').at(0).simulate('submit')
        await Promise.resolve()

        const pageRoute = helpers.getPageRoute(17)

        //Assert
        expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
    })

    it('should push to AboutUnderSixteens, when user selects true', () => {
        //Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<AnyUnderSixteens history={history} match={match}/>)

        wrapper.find('Button').at(0).simulate('submit')

        const pageRoute = helpers.getPageRoute(18)

        expect(history.push).toHaveBeenCalledWith(pageRoute)
    })

    it('should push to page 19 when user selects false and there are no second applicant', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName:{
                    value: 'first name',
                    isvalid: true
                },
                lastName:{
                    value: 'last name',
                    isvalid: true
                },
                anyChildrenUnderSixteen:{
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

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AnyUnderSixteens history={history} match={match}/>)

        await wrapper.find('Button').at(0).simulate('submit')
        await Promise.resolve()

        const pageRoute = helpers.getPageRoute(19)

        expect(history.push).toHaveBeenCalledWith(pageRoute)
    })

    it('should push to page 19 when second applicant selects false', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName:{
                    value: 'first name',
                    isvalid: true
                },
                lastName:{
                    value: 'last name',
                    isvalid: true
                },
                anyChildrenUnderSixteen:{
                    value: 'false',
                    isvalid: true
                }
            },
            secondApplicant: {
                firstName:{
                    value: 'first name',
                    isvalid: true
                },
                lastName:{
                    value: 'last name',
                    isvalid: true
                },
                anyChildrenUnderSixteen:{
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

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AnyUnderSixteens history={history} match={match}/>)

        await wrapper.find('Button').at(0).simulate('submit')
        await Promise.resolve()

        const pageRoute = helpers.getPageRoute(19)

        expect(history.push).toHaveBeenCalledWith(pageRoute)
    })

    it('should push to page 1 when single applicant selects false', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName:{
                    value: 'first name',
                    isvalid: true
                },
                lastName:{
                    value: 'last name',
                    isvalid: true
                },
                anyChildrenUnderSixteen:{
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

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AnyUnderSixteens history={history} match={match}/>)

        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        const pageRoute = helpers.getPageRoute(1)

        expect(history.push).toHaveBeenCalledWith(pageRoute)
    })

    it('should call onChangeApplicant', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<AnyUnderSixteens history={history} match={match}/>)

        // Act
        wrapper.find('input').first().simulate('change')

        // Assert
        expect(onChangeApplicantMock).toHaveBeenCalled()
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
        helpers.updateFormStatus = jest.fn().mockImplementation((form, status, setStatus) => {
            setStatus(status)
        })
        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)

        // Act
        mount(<AnyUnderSixteens history={history} match={match}/>)
        await mockPromise

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalled()
    })

    it('should push to error page on updateForm error', async () => {
        // Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName:{
                    value: 'first name',
                    isvalid: true
                },
                lastName:{
                    value: 'last name',
                    isvalid: true
                },
                anyChildrenUnderSixteen:{
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

        helpers.updateForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<AnyUnderSixteens history={history} match={match}/>)

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
                .create(<AnyUnderSixteens history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })

})