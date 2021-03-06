import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import { act } from 'react-dom/test-utils'
import AnyOverSixteens from './index'
import { Applicant } from 'constants'
import * as helpers from 'helpers'
import { CHILDREN_OVER_SIXTEEN_LIVING_AWAY, START_PAGE, ABOUT_CHILDREN_OVER_SIXTEEN_LIVING_AWAY } from 'routes'

describe('AnyOverSixteens', () => {

    const onChangeTargetMock = jest.fn()
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName :{
                    value: 'first name',
                    isValid: true
                },
                lastName:{
                    value: 'last name',
                    isValid: true
                },
                anyChildrenOverSixteen:{
                    value: 'true',
                    isvalid: true
                }
            },
            secondApplicant: {
                firstName :{
                    value: 'first name',
                    isValid: true
                },
                lastName:{
                    value: 'last name',
                    isValid: true
                },
                anyChildrenOverSixteen:{
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

        const wrapper = mount(<AnyOverSixteens history={history} match={match}/>)

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

        const wrapper = mount(<AnyOverSixteens history={history} match={match}/>)

        // Act
        wrapper.find('Button').at(0).simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(ABOUT_CHILDREN_OVER_SIXTEEN_LIVING_AWAY + '/second-applicant')
    })

    it('should push to second user on same page, when user selects false', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName :{
                    value: 'ap first name',
                    isValid: true
                },
                lastName:{
                    value: 'ap last name',
                    isValid: true
                },
                anyChildrenOverSixteen:{
                    value: 'false',
                    isvalid: true
                }
            },
            secondApplicant: {
                firstName :{
                    value: 'ap first name',
                    isValid: true
                },
                lastName:{
                    value: 'ap last name',
                    isValid: true
                },
                anyChildrenOverSixteen:{
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

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(19))

        const wrapper = mount(<AnyOverSixteens history={history} match={match}/>)

        //Act
        await act(async () => {
            await wrapper.find('Button').at(0).simulate('submit')
            await Promise.resolve()
        })

        //Assert
        expect(history.push).toHaveBeenCalledWith(CHILDREN_OVER_SIXTEEN_LIVING_AWAY + '/second-applicant')
    })

    it('should push to AboutOverSixteens, when user selects true', () => {
        //Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<AnyOverSixteens history={history} match={match}/>)

        wrapper.find('Button').at(0).simulate('submit')

        expect(history.push).toHaveBeenCalledWith(ABOUT_CHILDREN_OVER_SIXTEEN_LIVING_AWAY)
    })

    it('should push to page 21 when user selects false and there are no second applicant', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName :{
                    value: 'ap first name',
                    isValid: true
                },
                lastName:{
                    value: 'ap last name',
                    isValid: true
                },
                anyChildrenOverSixteen:{
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

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AnyOverSixteens history={history} match={match}/>)

        await act(async () => {
            await wrapper.find('Button').at(0).simulate('submit')
            await Promise.resolve()
        })

        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    it('should push to page 21 when second applicant selects false', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName :{
                    value: 'ap first name',
                    isValid: true
                },
                lastName:{
                    value: 'ap last name',
                    isValid: true
                },
                anyChildrenOverSixteen:{
                    value: 'false',
                    isvalid: true
                }
            },
            secondApplicant: {
                firstName :{
                    value: 'ap first name',
                    isValid: true
                },
                lastName:{
                    value: 'ap last name',
                    isValid: true
                },
                anyChildrenOverSixteen:{
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

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AnyOverSixteens history={history} match={match}/>)

        await act(async () => {
            await wrapper.find('Button').at(0).simulate('submit')
            await Promise.resolve()
        })

        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    it('should push to page 1 when single applicant selects false', async () => {

        //Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName :{
                    value: 'ap first name',
                    isValid: true
                },
                lastName:{
                    value: 'ap last name',
                    isValid: true
                },
                anyChildrenOverSixteen:{
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

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AnyOverSixteens history={history} match={match}/>)

        await act(async () => {
            await wrapper.find('Button').at(1).simulate('click')
            await Promise.resolve()
        })

        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    it('should call onChangeTarget', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<AnyOverSixteens history={history} match={match}/>)

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
        helpers.updateHomeVisitFormStatus = jest.fn().mockImplementation((form, status, setStatus) => {
            setStatus(status)
        })
        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)

        // Act
        mount(<AnyOverSixteens history={history} match={match}/>)
        await act(async () => await mockPromise)

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalled()
    })

    it('should push to error page on updateHomeVisitForm error', async () => {
        // Arrange
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                childrenLivingAwayFromYourHomeStatus: 0
            },
            firstApplicant: {
                firstName :{
                    value: 'ap first name',
                    isValid: true
                },
                lastName:{
                    value: 'ap last name',
                    isValid: true
                },
                anyChildrenOverSixteen:{
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

        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<AnyOverSixteens history={history} match={match}/>)

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
                .create(<AnyOverSixteens history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })

})