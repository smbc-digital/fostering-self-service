import { React, mount, useContextMock, renderer } from '../../../../../helpers/SetupTest'
import HaveYouPreviouslyApplied from './index'
import { Applicant } from '../../../../Provider'
import * as helpers from '../../../../../helpers'

describe('HaveYouPreviouslyApplied', () => {

    const onChangeApplicantMock = jest.fn()
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: onChangeApplicantMock,
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

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<HaveYouPreviouslyApplied history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(10)+'/second-applicant')
    })

    it('should push to correct page onSubmit with second applicant', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<HaveYouPreviouslyApplied history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(11))
    })

    it('should push to correct page on error', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateForm = jest.fn().mockImplementation(() => { throw new Error() })

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

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<HaveYouPreviouslyApplied history={history} match={match}/>)

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
                .create(<HaveYouPreviouslyApplied history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})