import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import DoYouHaveAnyPets from './index'
import * as helpers from 'helpers'

describe('DoYouHaveAnyPets', () => {
    const mockOnChangeStatus = jest.fn()
    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            onChangeStatus: mockOnChangeStatus,
            doYouHaveAnyPets: {
                value: '',
                isValid: false
            },
            petsInformation: {
                value: '',
                isValid: false
            },
            otherPeopleInYourHousehold: {
                value: [],
                isValid: false
            },
            anyOtherPeopleInYourHousehold: {
                value: false,
                isValid: false
            },
            statuses: {
                yourHouseholdStatus: 0
            }
        })
    })

    it('Should call history.push on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        // Act
        const wrapper = mount(<DoYouHaveAnyPets history={history} />)
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(17))
        expect(mockOnChangeStatus).toHaveBeenCalledWith('yourHouseholdStatus', 0)
    })

    it('Should call history.push on submit when goBack button pressed', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        // Act
        const wrapper = mount(<DoYouHaveAnyPets history={history} />)
        await wrapper.find('Button').at(1).simulate('click')
        await Promise.resolve()
        
        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
        expect(mockOnChangeStatus).toHaveBeenCalledWith('yourHouseholdStatus', 0)
    })

    it('Should go to error page', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error()})

        // Act
        const wrapper = mount(<DoYouHaveAnyPets history={history} />)
        wrapper.find('Button').at(1).simulate('click')
        
        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('Should show textarea when user has pets', () => {
        // Arrange
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            onChangeStatus: mockOnChangeStatus,
            doYouHaveAnyPets: {
                value: true,
                isValid: false
            },
            petsInformation: {
                value: '',
                isValid: false
            },
            otherPeopleInYourHousehold: {
                value: [],
                isValid: false
            },
            anyOtherPeopleInYourHousehold: {
                value: false,
                isValid: false
            },
            statuses: {
                yourHouseholdStatus: 0
            }
        })

        // Act
        const wrapper = mount(<DoYouHaveAnyPets history={history} />)
        
        // Assert
        expect(wrapper.find('textarea').exists()).toBe(true)
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<DoYouHaveAnyPets history={{}}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})