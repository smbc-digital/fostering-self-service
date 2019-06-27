import { React, mount, useContextMock, renderer } from '../../../../helpers/SetupTest'
import MarriageDate from './index'
import * as helpers from '../../../../helpers'

describe('MarriageDate', () => {

    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            onChangeStatus: onChangeStatusMock,
            dateOfMarriage: '26/06/2019'
        })
    }) 

    it('should call updateForm', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve())
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(helpers.updateForm).toHaveBeenCalled()
    })

    it('should push to next page on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(11))
    })

    it('should push to start page', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
    })

    it('should call updateForm on save and go back', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(helpers.updateForm).toHaveBeenCalled()
    })

    it('should call onChangeStatus', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalled()
    })

    it('should push to error page on updateForm error', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        
        helpers.updateForm = jest.fn().mockImplementation(() => { throw new Error() })
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
        
        helpers.updateForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<MarriageDate history={history} />)
        
        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(wrapper.find('Button').at(0).props().isLoading).toBe(true)
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