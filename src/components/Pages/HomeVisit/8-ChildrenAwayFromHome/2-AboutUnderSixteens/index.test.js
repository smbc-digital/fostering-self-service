import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import { act } from 'react-dom/test-utils'
import AboutUnderSixteens from './index'
import { Applicant } from 'constants'
import * as helpers from 'helpers'
import { CHILDREN_OVER_SIXTEEN_LIVING_AWAY, CHILDREN_UNDER_SIXTEEN_LIVING_AWAY, START_PAGE } from 'routes'

describe('AboutUnderSixteens', () => {
    const onChangeStatusMock = jest.fn()
    const onChangeTargetMock = jest.fn()

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
                    value: 'ap first name',
                    isValid: true
                },
                lastName:{
                    value: 'ap last name',
                    isValid: true
                },
                childrenUnderSixteenLivingAwayFromHome: {
                    value: [{
                        firstName: {
                            value: 'first name',
                            isValid: true
                        },
                        lastName: {
                            value: 'last name',
                            isValid: true
                        },
                        gender: {
                            value: 'gender',
                            isValid: true
                        },
                        dateOfBirth: {
                            value: '15-07-1950',
                            isValid: true
                        },
                        address: {
                            addressLine1: 'Line 1',
                            addressLine2: 'Line 2',
                            town: 'Stockport',
                            postcode: 'SK1 3XE'
                        }
                    }],
                    isValid: true
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
                childrenUnderSixteenLivingAwayFromHome: {
                    value: [{
                        firstName: {
                            value: 'first name 2',
                            isValid: true
                        },
                        lastName: {
                            value: 'last name 2',
                            isValid: true
                        },
                        gender: {
                            value: 'gender 2',
                            isValid: true
                        },
                        dateOfBirth: {
                            value: '15/07/1798',
                            isValid: true
                        },
                        address: {
                            addressLine1: 'Line 1',
                            addressLine2: 'Line 2',
                            town: 'Stockport',
                            postcode: 'SK1 3XD'
                        }
                    }],
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
            firstApplicant: {
                firstName :{
                    value: 'app first name',
                    isValid: true
                },
                lastName:{
                    value: 'app last name',
                    isValid: true
                },
                childrenUnderSixteenLivingAwayFromHome: {
                    value: [{
                        firstName: {
                            value: 'first name',
                            isValid: true
                        },
                        lastName: {
                            value: 'last name',
                            isValid: true
                        },
                        gender: {
                            value: 'gender',
                            isValid: true
                        },
                        dateOfBirth: {
                            value: '15/07/1799',
                            isValid: true
                        },
                        address: {
                            addressLine1: 'Line 1',
                            addressLine2: 'Line 2',
                            town: 'Stockport',
                            postcode: 'SK1 3XE'
                        }
                    }],
                    isValid: true
                }
            }
        })

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AboutUnderSixteens history={history} match={match}/>)

        // Act
        await act(async() => {
            await wrapper.find('form').simulate('submit')
            await Promise.resolve()
        })

        // Assert
        expect(history.push).toHaveBeenCalledWith(CHILDREN_OVER_SIXTEEN_LIVING_AWAY)
    })

    it('should push to page 17 on submit, when on single applicant but joint application', async () => {
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
            firstApplicant: {
                firstName :{
                    value: 'app first name',
                    isValid: true
                },
                lastName:{
                    value: 'app last name',
                    isValid: true
                },
                childrenUnderSixteenLivingAwayFromHome: {
                    value: [{
                        firstName: {
                            value: 'first name',
                            isValid: true
                        },
                        lastName: {
                            value: 'last name',
                            isValid: true
                        },
                        gender: {
                            value: 'gender',
                            isValid: true
                        },
                        dateOfBirth: {
                            value: '15/07/1799',
                            isValid: true
                        },
                        address: {
                            addressLine1: 'Line 1',
                            addressLine2: 'Line 2',
                            town: 'Stockport',
                            postcode: 'SK1 3XE'
                        }
                    }],
                    isValid: true
                }
            },
            secondApplicant: {
                firstName :{
                    value: '2nd app first name',
                    isValid: true
                },
                lastName:{
                    value: '2nd app last name',
                    isValid: true
                },
                anyChildrenUnderSixteen: {
                    value: '',
                    isValid: true
                },
                childrenUnderSixteenLivingAwayFromHome: {
                    value: [{
                        firstName: {
                            value: '',
                            isValid: true
                        },
                        lastName: {
                            value: '',
                            isValid: true
                        },
                        gender: {
                            value: '',
                            isValid: true
                        },
                        dateOfBirth: {
                            value: '',
                            isValid: true
                        },
                        address: {
                            addressLine1: '',
                            addressLine2: '',
                            town: '',
                            postcode: ''
                        }
                    }],
                    isValid: true
                }
            }
        })

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AboutUnderSixteens history={history} match={match}/>)

        // Act
        await act(async () => {
            await wrapper.find('form').simulate('submit')
            await Promise.resolve()
        })

        // Assert
        expect(history.push).toHaveBeenCalledWith(CHILDREN_UNDER_SIXTEEN_LIVING_AWAY + '/second-applicant')
    })

    it('should push to page 19 on submit, when on joint applicant', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            firstApplicant: {
                firstName :{
                    value: 'app first name',
                    isValid: true
                },
                lastName:{
                    value: 'app last name',
                    isValid: true
                },
                childrenUnderSixteenLivingAwayFromHome: {
                    value: [{
                        firstName: {
                            value: 'first name',
                            isValid: true
                        },
                        lastName: {
                            value: 'last name',
                            isValid: true
                        },
                        gender: {
                            value: 'gender',
                            isValid: true
                        },
                        dateOfBirth: {
                            value: '15/07/1799',
                            isValid: true
                        },
                        address: {
                            addressLine1: 'Line 1',
                            addressLine2: 'Line 2',
                            town: 'Stockport',
                            postcode: 'SK1 3XE'
                        }
                    }],
                    isValid: true
                }
            },
            secondApplicant: {
                firstName :{
                    value: '2nd app first name',
                    isValid: true
                },
                lastName:{
                    value: '2nd app last name',
                    isValid: true
                },
                anyChildrenUnderSixteen: {
                    value: '',
                    isValid: true
                },
                childrenUnderSixteenLivingAwayFromHome: {
                    value: [{
                        firstName: {
                            value: '',
                            isValid: true
                        },
                        lastName: {
                            value: '',
                            isValid: true
                        },
                        gender: {
                            value: '',
                            isValid: true
                        },
                        dateOfBirth: {
                            value: '',
                            isValid: true
                        },
                        address: {
                            addressLine1: '',
                            addressLine2: '',
                            town: '',
                            postcode: ''
                        }
                    }],
                    isValid: true
                }
            }
        })

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AboutUnderSixteens history={history} match={match}/>)

        // Act
        await act(async () => {
            await wrapper.find('form').simulate('submit')
            await Promise.resolve() 
        })

        // Assert
        expect(history.push).toHaveBeenCalledWith(CHILDREN_OVER_SIXTEEN_LIVING_AWAY)
    })
    
    it('should call updateHomeVisitForm on form submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        const wrapper = mount(<AboutUnderSixteens history={history} match={match}/>)

        // Act
        await act(async () => {
            await wrapper.find('form').simulate('submit')
            await Promise.resolve()
        })

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

        const wrapper = mount(<AboutUnderSixteens history={history} match={match}/>)

        // Act
        await act(async () => {
            await wrapper.find('form').simulate('submit')
            await Promise.resolve() 
        })

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('childrenLivingAwayFromYourHomeStatus', 0)
    })

    it('should call updateHomeVisitForm on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm =  jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AboutUnderSixteens history={history} match={match}/>)

        // Act
        await act(async () => {
            await wrapper.find('button').at(1).simulate('click')
            await Promise.resolve()
        })

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

        const wrapper = mount(<AboutUnderSixteens history={history} match={match}/>)

        // Act
        await act(async () => {
            await wrapper.find('button').at(1).simulate('click')
            await Promise.resolve()
        })

        // Assert
        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    it('should push to error page on updateHomeVisitForm error', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<AboutUnderSixteens history={history} match={match}/>)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should setIsDobValid when Date of birth is set', () => {
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
                childrenUnderSixteenLivingAwayFromHome: {
                    value: [{
                        dateOfBirth: {
                            value: '15-07-1950',
                            isValid: true
                        }
                    }],
                    isValid: true
                }
            }
        })

        const match = {
            params: undefined
        }

        const wrapper = mount(<AboutUnderSixteens history={{}} match={match}/>)

        // Act
        onChangeTargetMock.mockReset()
        wrapper.find('input[name="year"]').simulate('change', { target: { value: '1950', name: 'year' } })
        
        // Assert
        expect(onChangeTargetMock).toHaveBeenCalledWith({'target': {'name': 'childrenUnderSixteenLivingAwayFromHome', 'value': [{'IsDobValid': false, 'dateOfBirth': null}]}}, false, 'firstApplicant')
    })



    it('should call onChangeTarget', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        const wrapper = mount(<AboutUnderSixteens history={history} match={match}/>)

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
                .create(<AboutUnderSixteens history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})