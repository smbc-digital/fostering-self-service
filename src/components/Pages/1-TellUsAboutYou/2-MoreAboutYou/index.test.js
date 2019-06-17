import { React, mount, useContextMock, renderer } from '../../../../helpers/SetupTest'
import MoreAboutYou from './index'
import { Applicant } from '../../../Provider'
import { getPageRoute } from '../../../../helpers'

describe('KnownByAnotherName', () => {

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: jest.fn(),
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
                sexualOrientation: {
                    value: 'test',
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
                sexualOrientation: {
                    value: 'test',
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

        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        wrapper.find('Button').simulate('submit')

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

        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        wrapper.find('Button').simulate('submit')

        // Assert
        const pageRoute = getPageRoute(1)
        expect(history.push).toHaveBeenCalledWith(pageRoute)
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const match = {
                params: undefined
            }

            const tree = renderer
                .create(<MoreAboutYou history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})