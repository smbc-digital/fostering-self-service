import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import { act } from 'react-dom/test-utils'
import DoYouKnowCouncillors from './index'
import * as helpers from 'helpers'
import { 
    ABOUT_RELATIONSHIP_TO_COUNCIL_EMPLOYEES, 
    START_PAGE,
    RELATIONSHIP_TO_COUNCIL_EMPLOYEES 
} from 'routes'

describe('DoYouKnowCouncillors', () => {

    const onChangeStatusMock = jest.fn()
    const onChangeTargetMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            firstApplicant: {
                hasContactWithCouncillor: {
                    value: '',
                    isValid: false
                }
            },
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            statuses: {
                councillorsOrEmployeesStatus: 0
            }
        })
    })

    it('should call updateApplicationForm on submit', async () => {
        // Arrange
        useContextMock.mockReturnValue({
            firstApplicant: {
                hasContactWithCouncillor: {
                    value: 'false',
                    isValid: false
                }
            },
            onChangeTarget: jest.fn(),
            statuses: {
                councillorsOrEmployeesStatus: 0
            },
            onChangeStatus: onChangeStatusMock
        })
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<DoYouKnowCouncillors history={history} match={match}/>)

        await act(async () => {
            await wrapper.find('form').simulate('submit')
            await Promise.resolve()
        })

        // Assert
        expect(helpers.updateApplicationForm).toHaveBeenCalled()
    })
    
    const nextPageTestInputs = [
        {
            expectedRoute: ABOUT_RELATIONSHIP_TO_COUNCIL_EMPLOYEES,
            matchParams: [],
            firstApplicant: {
                hasContactWithCouncillor: {
                    value: true,
                    isValid: false
                },
                firstName: {
                    value: 'first name'
                },
                lastName: {
                    value: 'last name'
                }
            },
            secondApplicant: {}
        },
        {
            expectedRoute: `${ABOUT_RELATIONSHIP_TO_COUNCIL_EMPLOYEES}/second-applicant`,
            matchParams: ['second-applicant'],
            firstApplicant: {},
            secondApplicant: {
                hasContactWithCouncillor: {
                    value: true,
                    isValid: false
                },
                firstName: {
                    value: 'first name'
                },
                lastName: {
                    value: 'last name'
                }
            }
        },
        {
            expectedRoute: START_PAGE,
            matchParams: [],
            firstApplicant: {
                hasContactWithCouncillor: {
                    value: false,
                    isValid: false
                }
            }
        },
        {
            expectedRoute: `${RELATIONSHIP_TO_COUNCIL_EMPLOYEES}/second-applicant`,
            matchParams: [],
            firstApplicant: {
                hasContactWithCouncillor: {
                    value: false,
                    isValid: false
                },
                firstName: {
                    value: 'first name'
                },
                lastName: {
                    value: 'last name'
                }
            },
            secondApplicant: {}
        }
    ]

    nextPageTestInputs.forEach(({ expectedRoute, firstApplicant, matchParams, secondApplicant }) => {
        it('should push to the next page on submit', async () => { 
            // Arrange
            useContextMock.mockReturnValue({
                firstApplicant,
                secondApplicant, 
                onChangeTarget: jest.fn(),
                onChangeStatus: jest.fn(),
                statuses: {
                    councillorsOrEmployeesStatus: 0
                }
            })
            helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 
            const history = {
                push: jest.fn()
            }
            const match = {
                params: matchParams
            }

            // Act
            const wrapper = mount(<DoYouKnowCouncillors history={history} match={match} />)
            await act(async () => {
                await wrapper.find('form').simulate('submit')
                await Promise.resolve()
            })

            // Assert
            expect(history.push).toHaveBeenCalledWith(expectedRoute)
        })
    })

    it('should set isLoading', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }

        // Make the update throw an error since isLoading is set back to false on success
        helpers.updateApplicationForm = jest.fn().mockImplementation(() => { throw new Error() })

        // Act
        const wrapper = mount(<DoYouKnowCouncillors history={history} match={match} />)
        await act(async () => {
            await wrapper.find('form').simulate('submit')
            wrapper.update()
        })
        
        // Assert
        expect(wrapper.find('Button').first().props().isLoading).toEqual(true)
    })

    it('should update form status', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<DoYouKnowCouncillors history={history} match={match}/>)
        await act(async () => {
            await wrapper.find('form').simulate('submit')
            await Promise.resolve()
        })

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('councillorsOrEmployeesStatus', 0)
    })

    it('should push to error page on submit', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockImplementation(() => { throw new Error() })

        // Act
        const wrapper = mount(<DoYouKnowCouncillors history={history} match={match}/>)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should push to start page on save and go back click', async () => {
        // Arrange
        useContextMock.mockReturnValue({
            firstApplicant: {
                hasContactWithCouncillor: {
                    value: false,
                    isValid: true
                }
            },
            statuses: {
                councillorsOrEmployeesStatus: 0
            },
            onChangeTarget: jest.fn(),
            onChangeStatus: onChangeStatusMock
        })
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<DoYouKnowCouncillors history={history} match={match}/>)
        await act(async () => {
            await wrapper.find('button').at(1).simulate('click')
            await Promise.resolve()
        })

        // Assert
        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    it('should call updateFormStatus', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateFormStatus = jest.fn() 

        // Act
        mount(<DoYouKnowCouncillors history={history} match={match} />)

        // Assert
        expect(helpers.updateFormStatus).toHaveBeenCalled()
    })

    it('should call onChangeTarget', () => {
        // Arrange 
        const history = {
            push: jest.fn()
        }

        const match = {
            params: []
        }

        // Act
        const wrapper = mount(<DoYouKnowCouncillors history={history} match={match} />)
        wrapper.find('input').first().simulate('change')

        // Assert
        expect(onChangeTargetMock).toHaveBeenCalled()
    })

    describe('snapshot', () => {
        it('should render correctly', () => {
            const tree = renderer
                .create(<DoYouKnowCouncillors history={{}} match={{ params: [] }} />)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})