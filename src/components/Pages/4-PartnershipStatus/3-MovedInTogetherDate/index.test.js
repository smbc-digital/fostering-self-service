import { React, mount, useContextMock, renderer } from '../../../../helpers/SetupTest'
import MovedInTogetherDate from './index'
import * as helpers from '../../../../helpers';

describe('MovedInTogetherDate', () => {
    const onChangeStatus = jest.fn()
    const dateMovedInTogether = {
        value: '',
        isValid: false
    }
    const marriedOrInACivilPartnership = {
        value: 'true',
        isValid: false
    }

    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            onChangeStatus,
            dateMovedInTogether,
            marriedOrInACivilPartnership
        })
    })

    it('should push to next page', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve())

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(10))
    })

    it('should push to start page', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve())

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
    })

    it('should call updateForm', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve())

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(helpers.updateForm).toHaveBeenCalledWith(helpers.FormName.YourPartnership, {
            dateMovedInTogether,
            marriedOrInACivilPartnership
        })
    })

    it('should call update form', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve())

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(helpers.updateForm).toHaveBeenCalled()
    })

    it('should update form status', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(onChangeStatus).toHaveBeenCalled()
    })

    it('should set isLoading', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(wrapper.find('Button').at(0).props().isLoading).toBe(true)

    })
})