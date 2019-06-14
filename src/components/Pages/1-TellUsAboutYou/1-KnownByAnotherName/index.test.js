import { React, mount, useContextMock, renderer } from '../../../../helpers/SetupTest'
import KnownByAnotherName from './index'
import { Applicant } from '../../../Provider'

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
                }
            }
        })
    })
    
    it('should push to next page on submit', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const wrapper = mount(<KnownByAnotherName history={history} />)

        // Act
        wrapper.find('Button').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalled()
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<KnownByAnotherName history={{}} />)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})