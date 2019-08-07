import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import MarriageDate from './index'
import * as helpers from 'helpers'
import { FOSTERING_HISTORY, START_PAGE } from 'routes'

describe('MarriageDate', () => {

    const onChangeStatusMock = jest.fn()
    const onChangeMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: onChangeMock,
            onChangeStatus: onChangeStatusMock,
            dateOfMarriage: '26/06/2019'
        })
    }) 

    it('should call updateHomeVisitForm', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve())
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(helpers.updateHomeVisitForm).toHaveBeenCalled()
    })

    it('should push to next page on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(FOSTERING_HISTORY)
    })

    it('should push to start page', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    it('should call updateHomeVisitForm on save and go back', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(helpers.updateHomeVisitForm).toHaveBeenCalled()
    })

    it('should call onChangeStatus', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalled()
    })

    it('should push to error page on updateHomeVisitForm error', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should set isLoading', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(wrapper.find('Button').at(0).props().isLoading).toBe(true)
    })

    it('should set isValid', () => {
        // Arrange
        const wrapper = mount(<MarriageDate history={{}} />)

        // Act
        wrapper.find('input[name="day"]').simulate('change', { target: { value: '0', name: 'day' } })

        // Assert
        expect(wrapper.find('Button').at(1).props().isValid).toBe(false)
    })

    it('should call onChange', () => {
        // Arrange
        const wrapper = mount(<MarriageDate history={{}} />)

        // Act
        wrapper.find('input[name="day"]').simulate('change', { target: { value: '0', name: 'day' } })

        // Assert
        expect(onChangeMock).toHaveBeenCalled()
    })

    describe('snapshot', () => {

        it('should render correctly', () => {
            // Act
            const tree = renderer
                .create(<MarriageDate history={{}} />)
                .toJSON()

            // Assert
            expect(tree).toMatchSnapshot()
        })
    })
})