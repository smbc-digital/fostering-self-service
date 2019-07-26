import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import PeopleInYourHousehold from './index'
import * as helpers from 'helpers'

describe('PeopleInYourHousehold', () => {
    const mockOnChange = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: mockOnChange,
            otherPeopleInYourHousehold: {
                value: [],
                isValid: false
            },
        })
    })

    it('Should call history.push on submit', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        // Act
        const wrapper = mount(<PeopleInYourHousehold history={history} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(16))
    })

    it('Should call onChange with new values', () => {
        // Act
        const wrapper = mount(<PeopleInYourHousehold history={history} />)
        wrapper.find('input').at(1).simulate('change')

        // Assert
        expect(mockOnChange).toHaveBeenCalled()
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<PeopleInYourHousehold history={{}}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})