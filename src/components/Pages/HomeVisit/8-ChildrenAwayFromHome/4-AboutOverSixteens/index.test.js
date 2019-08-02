import { React, mount, useContextMock, renderer } from '../../../../../helpers/SetupTest'
import AboutOverSixteens from './index'
import { Applicant } from '../../../../Provider'
import * as helpers from '../../../../../helpers'

describe('AboutOverSixteens', () => {
    const onChangeStatusMock = jest.fn()
    const onChangeApplicantMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
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
                childrenOverSixteenLivingAwayFromHome: {
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
                            value: '15/07/1999',
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
                anyChildrenOverSixteen:{
                    value: 'true',
                    isvalid: true
                },
                childrenOverSixteenLivingAwayFromHome: {
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
                            value: '15/07/1998',
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
            params: ['second-applicant']
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AboutOverSixteens history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        const pageRoute = helpers.getPageRoute(1)
        expect(history.push).toHaveBeenCalledWith(`${pageRoute}`)
    })
  
    it('should push to next page on submit, when joint applicant', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['first-applicant']
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AboutOverSixteens history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        const pageRoute = helpers.getPageRoute(19)
        expect(history.push).toHaveBeenCalledWith(`${pageRoute}/second-applicant`)
    })

    it('should call updateForm on form sum on form submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        const wrapper = mount(<AboutOverSixteens history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(helpers.updateForm).toHaveBeenCalled()
    })

    it('should call onChangeStatus on form submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        const wrapper = mount(<AboutOverSixteens history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('childrenLivingAwayFromYourHomeStatus', 0)
    })

    it('should call updateForm on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateForm =  jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AboutOverSixteens history={history} match={match}/>)

        // Act
        await wrapper.find('button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(helpers.updateForm).toHaveBeenCalled()
    })

    it('should push to start page on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<AboutOverSixteens history={history} match={match}/>)

        // Act
        await wrapper.find('button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
    })

    it('should push to error page on updateForm error', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<AboutOverSixteens history={history} match={match}/>)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should call onChangeApplicant', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        const wrapper = mount(<AboutOverSixteens history={history} match={match}/>)

        // Act
        wrapper
            .find('input')
            .first()
            .simulate('change')

        // Assert
        expect(onChangeApplicantMock).toHaveBeenCalled()
    })

    it('should setIsDobValid when Date of birth is set', () => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
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
                childrenOverSixteenLivingAwayFromHome: {
                    value: [{
                        dateOfBirth: {
                            value: '15-07-2016',
                            isValid: false
                        }
                    }],
                    isValid: true
                }
            }
        })

        const match = {
            params: undefined
        }

        const wrapper = mount(<AboutOverSixteens history={{}} match={match}/>)

        // Act
        onChangeApplicantMock.mockReset()
        wrapper.find('input[name="year"]').simulate('change', { target: { value: '2017', name: 'year' } })
        
        // Assert
        expect(onChangeApplicantMock).toHaveBeenCalledWith({'target': {'name': 'childrenOverSixteenLivingAwayFromHome', 'value': [{'IsDobValid': false, 'dateOfBirth': null}]}}, true, 'firstApplicant')
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const match = {
                params: undefined
            }

            const tree = renderer
                .create(<AboutOverSixteens history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})