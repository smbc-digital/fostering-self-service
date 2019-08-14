import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import { START_PAGE, RELATIONSHIP_TO_COUNCIL_EMPLOYEES } from 'routes'
import AboutCouncillors from './index'
import * as helpers from 'helpers'

describe('AboutCouncillors', () => {
    const mockOnChangeTarget = jest.fn()
    const mockOnChangeStatus = jest.fn()

    beforeEach(() => {
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0))

        useContextMock.mockReturnValue({
            firstApplicant: {
                councillorRelationshipDetails: {
                    value: [],
                    isValid: false
                }
            },
            onChangeTarget: mockOnChangeTarget,
            onChangeStatus: mockOnChangeStatus
        })
    })

    const nextPageTestInputs = [
        {
            expectedRoute: START_PAGE,
            matchParams: ['second-applicant'],
            secondApplicant: {
                councillorRelationshipDetails: {
                    value: []
                }
            }
        },
        {
            expectedRoute: `${RELATIONSHIP_TO_COUNCIL_EMPLOYEES}/second-applicant`,
            matchParams: [],
            secondApplicant: {}
        },
        {
            expectedRoute: START_PAGE,
            matchParams: [],
            secondApplicant: undefined
        }
    ]

    nextPageTestInputs.forEach(({ expectedRoute, matchParams, secondApplicant }) => {
        it('should push to next page', async () => {
            // Arrange
            useContextMock.mockReturnValue({
                firstApplicant: {
                    councillorRelationshipDetails: {
                        value: [],
                        isValid: false
                    }
                },
                secondApplicant,
                onChangeTarget: mockOnChangeTarget,
                onChangeStatus: jest.fn()
            })
            const match = {
                params: matchParams
            }

            const history = {
                push: jest.fn()
            }

            // Act
            const wrapper = mount(<AboutCouncillors history={history} match={match} />)
            wrapper.find('form').simulate('submit')
            await Promise.resolve()

            // Assert
            expect(history.push).toHaveBeenCalledWith(expectedRoute)
        })
    })

    it('should call updateApplicationForm', async () => {
        // Arrange        
        const match = {
            params: []
        }

        const history = {
            push: jest.fn()
        }

        // Act
        const wrapper = mount(<AboutCouncillors history={history} match={match} />)
        wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(helpers.updateApplicationForm).toHaveBeenCalled()
    })

    it('should push to error page on submit', () => {
        // Arrange
        const match = {
            params: []
        }

        const history = {
            push: jest.fn()
        }

        helpers.updateApplicationForm = jest.fn().mockImplementation(() => { throw new Error() })

        // Act 
        const wrapper = mount(<AboutCouncillors history={history} match={match} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should call onChangeStatus', async () => {
        // Arrange 
        const match = {
            params: []
        }

        const history = {
            push: jest.fn()
        }

        // Act
        const wrapper = mount(<AboutCouncillors history={history} match={match} />)
        wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(mockOnChangeStatus).toHaveBeenCalledWith('councillorsOrEmployeesStatus', 0)
    })

    it('should set isLoading', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: []
        }

        // Act
        const wrapper = mount(<AboutCouncillors history={history} match={match} />)
        wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(wrapper.find('Button').first().props().isLoading).toBe(true)
    })

    it('should set isValid', () => {
        // Arrange
        const match = {
            params: []
        }

        const history = {
            push: jest.fn()
        }

        useContextMock.mockReturnValue({
            firstApplicant: {
                councillorRelationshipDetails: {
                    value: [{
                        relationship: 'somthing great',
                        councillorName: 'some great name'
                    }],
                    isValid: true
                }
            },
            onChangeTarget: mockOnChangeTarget,
            onChangeStatus: mockOnChangeStatus
        })

        // Act
        const wrapper = mount(<AboutCouncillors match={match} history={history} />)

        // Assert
        expect(wrapper.find('Button').first().props().isValid).toBe(true)
        expect(wrapper.find('Button').last().props().isValid).toBe(true)
    })

    it('should set isValid to false', () => {
        // Arrange
        const match = {
            params: []
        }

        const history = {
            push: jest.fn()
        }

        useContextMock.mockReturnValue({
            firstApplicant: {
                councillorRelationshipDetails: {
                    value: [],
                    isValid: false
                }
            },
            onChangeTarget: mockOnChangeTarget,
            onChangeStatus: mockOnChangeStatus
        })

        // Act
        const wrapper = mount(<AboutCouncillors match={match} history={history} />)

        // Assert
        expect(wrapper.find('Button').first().props().isValid).toBe(false)
        expect(wrapper.find('Button').last().props().isValid).toBe(false)
    })

    it('should call onChangeTarget', () => {
        // Arrange
        const match = {
            params: []
        }

        const history = {
            push: jest.fn()
        }

        // Act
        const wrapper = mount(<AboutCouncillors match={match} history={history} />)
        wrapper.find('input#councillorName').first().simulate('change', { target: { name: 'councillorName', value: 'test'}})
        wrapper.find('textarea#relationship').first().simulate('change', { target: { name: 'relationship', value: 'test'}})

        // Assert
        expect(mockOnChangeTarget).toHaveBeenCalledTimes(2)

    })

    it ('should call updateApplicationForm with start page', async () => {
        // Arrange
        const match = {
            params: []
        }

        const history = {
            push: jest.fn()
        }

        useContextMock.mockReturnValue({
            firstApplicant: {
                councillorRelationshipDetails: {
                    value: [
                        {
                            relationship: 'test',
                            councillorName: 'test'
                        }
                    ],
                    isValid: true
                }
            },
            onChangeTarget: mockOnChangeTarget,
            onChangeStatus: mockOnChangeStatus
        })

        // Act
        const wrapper = mount(<AboutCouncillors match={match} history={history} />)
        wrapper.find('Button').last().simulate('click')
        await Promise.resolve()

        // Assert
        expect(helpers.updateApplicationForm).toHaveBeenCalled()
    })

    describe('snapshot', () => {
        it('should render correctly', () => {
            const tree = renderer
                .create(<AboutCouncillors history={{}} match={{ params: [] }} />)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})
