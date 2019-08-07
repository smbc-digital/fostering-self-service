import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import AreYouMarried from './index'
import { DATE_OF_MARRIAGE_OR_PARTNERSHIP, DATE_OF_MOVE_IN_TOGETHER, FOSTERING_HISTORY } from 'routes'

describe('AreYouMarried', () => {

    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            marriedOrInACivilPartnership: {
                value: undefined,
                isValid: false
            },
            statuses: {
                yourPartnershipStatus: 0
            },
            onChangeStatus: jest.fn()
        })
    }) 

    it('should push to next page, when married', () => {
        // Arrange
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            marriedOrInACivilPartnership: {
                value: 'true',
                isValid: true
            },
            statuses: {
                yourPartnershipStatus: 0
            },
            onChangeStatus: jest.fn()
        })
        const history = {
            push: jest.fn()
        }
        const wrapper = mount(<AreYouMarried history={history} />)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(DATE_OF_MARRIAGE_OR_PARTNERSHIP)
    })

    it('should push to next page, when not married', () => {
        // Arrange
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            marriedOrInACivilPartnership: {
                value: 'false',
                isValid: true
            },
            statuses: {
                yourPartnershipStatus: 0
            },
            onChangeStatus: jest.fn()
        })
        const history = {
            push: jest.fn()
        }
        const wrapper = mount(<AreYouMarried history={history} />)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(DATE_OF_MOVE_IN_TOGETHER)
    })

    it('should push to next page', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const wrapper = mount(<AreYouMarried history={history} />)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(FOSTERING_HISTORY)
    })

    describe('snapshot', () => {

        it('should render correctly', () => {
            // Act
            const tree = renderer
                .create(<AreYouMarried history={{}} />)
                .toJSON()

            // Assert
            expect(tree).toMatchSnapshot()
        })
    })
})