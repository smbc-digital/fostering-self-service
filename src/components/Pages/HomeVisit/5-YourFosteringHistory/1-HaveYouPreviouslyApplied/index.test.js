import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import HaveYouPreviouslyApplied from './index'
import { Applicant } from 'constants'
import * as helpers from 'helpers'
import { FOSTERING_HISTORY, ABOUT_YOUR_HEALTH, START_PAGE } from 'routes'

describe('HaveYouPreviouslyApplied', () => {

    const onChangeTargetMock = jest.fn()
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            firstApplicant: {
                previouslyApplied: {
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
                }
            },
            secondApplicant: {
                previouslyApplied: {
                    value: 'false',
                    isValid: true
                },
                firstName: {
                    value: 'first',
                    isValid: true
                },
                lastName: {
                    value: 'last',
                    isValid: true
                }
            }
        })
    })

    it('should push to correct page onSubmit with single applicant', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<HaveYouPreviouslyApplied history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        expect(history.push).toHaveBeenCalledWith(FOSTERING_HISTORY +'/second-applicant')
    })

    it('should push to correct page onSubmit with second applicant', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<HaveYouPreviouslyApplied history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        expect(history.push).toHaveBeenCalledWith(ABOUT_YOUR_HEALTH)
    })

    it('should push to correct page on error', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })

        const wrapper = mount(<HaveYouPreviouslyApplied history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        expect(history.push).toHaveBeenCalledWith('/error')
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

        const wrapper = mount(<HaveYouPreviouslyApplied history={history} match={match}/>)

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
                .create(<HaveYouPreviouslyApplied history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})