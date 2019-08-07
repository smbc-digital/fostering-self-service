import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import PeopleInYourHousehold from './index'
import * as helpers from 'helpers'

describe('PeopleInYourHousehold', () => {
    const mockOnChange = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: mockOnChange,
            otherPeopleInYourHousehold: {
                value: [{'IsDobValid': false, 'dateOfBirth': '2016-02-20', 'firstName': 'test'}],
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
        wrapper.find('input').at(1).simulate('change', { target: { value: 'test', name: 'firstName' } })

        // Assert
        expect(mockOnChange).toHaveBeenCalled()
    })

    it('Should call onChange with IsDobValid value', () => {
        // Act
        const wrapper = mount(<PeopleInYourHousehold history={history} />)
        mockOnChange.mockReset()
        wrapper.find('input[name="year"]').simulate('change', { target: { value: '2015', name: 'year' } })

        // Assert
        expect(mockOnChange).toHaveBeenCalledWith({'target': {'name': 'otherPeopleInYourHousehold', 'value': [{'IsDobValid': true, 'dateOfBirth': '2015-2-20', 'firstName': 'test'}]}}, true)
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