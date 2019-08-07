import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import TypesOfFostering from './index'
import * as helpers from 'helpers'
import { START_PAGE, YOUR_HOUSEHOLD } from 'routes'

describe('TypesOfFostering', () => {

    const typesOfFostering = {
        value: []
    }
    const reasonsForFostering = {
        value: 'Test'
    }
    const onChangeStatusMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            typesOfFostering,
            reasonsForFostering,
            onChange: jest.fn(),
            onChangeStatus: onChangeStatusMock
        })
    })

    it('should push to next page', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve())
        const wrapper = mount(<TypesOfFostering history={history} />)

        // Act
        wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(YOUR_HOUSEHOLD)
    })

    it('should call updateHomeVisitForm', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve())
        const wrapper = mount(<TypesOfFostering history={history} />)

        // Act
        wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(helpers.updateHomeVisitForm).toHaveBeenCalledWith(helpers.HomeVisitFormName.TellUsAboutYourInterestInFostering, {
            reasonsForFostering,
            typesOfFostering
        })
    })

    it('should push to the error page', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error('Error') })
        const wrapper = mount(<TypesOfFostering history={history} />)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should update form status', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<TypesOfFostering history={history} />)

        // Act
        wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('tellUsAboutYourInterestInFosteringStatus', 0)
    })

    it('should set isLoading', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<TypesOfFostering history={history} />)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(wrapper.find('Button').at(0).props().isLoading).toBe(true)
    })

    it('should push to start page', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))
        const wrapper = mount(<TypesOfFostering history={history} />)

        // Act
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()
        
        // Assert
        expect(history.push).toHaveBeenCalledWith(START_PAGE)
    })

    describe('snapshot', () => {

        it('should render correctly', () => {
            // Act
            const tree = renderer
                .create(<TypesOfFostering history={{}} />)
                .toJSON()

            // Assert
            expect(tree).toMatchSnapshot()
        })
    })
})



