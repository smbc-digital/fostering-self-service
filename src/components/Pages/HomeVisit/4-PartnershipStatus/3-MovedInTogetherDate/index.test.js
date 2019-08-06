import { React, mount, useContextMock } from 'helpers/SetupTest'
import MovedInTogetherDate from './index'
import * as helpers from 'helpers'

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
    const onChangeMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: onChangeMock,
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

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve())

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

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve())

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
    })

    it('should call updateHomeVisitForm', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve())

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(helpers.updateHomeVisitForm).toHaveBeenCalledWith(helpers.HomeVisitFormName.YourPartnership, {
            dateMovedInTogether,
            marriedOrInACivilPartnership
        })
    })

    it('should call update form', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve())

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(helpers.updateHomeVisitForm).toHaveBeenCalled()
    })

    it('should update form status', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

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

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(wrapper.find('Button').at(0).props().isLoading).toBe(true)

    })

    it('should push to error page', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })

        const wrapper = mount(<MovedInTogetherDate history={history}/>)

        // Act
        await wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })


    it('should set isValid', () => {
        // Arrange
        const wrapper = mount(<MovedInTogetherDate history={{}} />)

        // Act
        wrapper.find('input[name="month"]').simulate('change', { target: { value: '0', name: 'month' } })

        // Assert
        expect(wrapper.find('Button').at(1).props().isValid).toBe(false)
    })

    it('should call onChange', () => {
        // Arrange
        const wrapper = mount(<MovedInTogetherDate history={{}} />)

        // Act
        wrapper.find('input[name="month"]').simulate('change', { target: { value: '0', name: 'month' } })

        // Assert
        expect(onChangeMock).toHaveBeenCalled()
    })
})