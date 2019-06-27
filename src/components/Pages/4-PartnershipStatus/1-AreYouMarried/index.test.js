import { React, mount, useContextMock, renderer } from '../../../../helpers/SetupTest'
import AreYouMarried from './index'
import { getPageRoute } from '../../../../helpers'

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
        expect(history.push).toHaveBeenCalledWith(getPageRoute(8))
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
        expect(history.push).toHaveBeenCalledWith(getPageRoute(9))
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
        expect(history.push).toHaveBeenCalledWith(getPageRoute(10))
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