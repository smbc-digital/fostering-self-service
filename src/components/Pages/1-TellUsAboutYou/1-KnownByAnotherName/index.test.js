import { React, mount, useContextMock, renderer } from '../../../../helpers/SetupTest'
import KnownByAnotherName from './index'
import { Applicant } from '../../../Provider'
import { getPageRoute } from '../../../../helpers'

describe('KnownByAnotherName', () => {

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeApplicant: jest.fn(),
            onChangeStatus: jest.fn(),
            statuses: {
                TellUsAboutYourselfStatus: 0
            },
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

        const wrapper = mount(<KnownByAnotherName history={history} match={match}/>)

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

        const wrapper = mount(<KnownByAnotherName history={history} match={match}/>)

        // Act
        wrapper.find('Button').simulate('submit')

        // Assert
        const pageRoute = getPageRoute(3)
        expect(history.push).toHaveBeenCalledWith(pageRoute + '/second-applicant')
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const match = {
                params: undefined
            }

            const tree = renderer
                .create(<KnownByAnotherName history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})