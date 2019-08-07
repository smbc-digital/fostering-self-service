import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import AnyPeopleInYourHousehold from './index'
import { DO_YOU_HAVE_ANY_PETS, WHO_LIVES_IN_YOUR_HOME } from 'routes'

describe('AnyPeopleInYourHousehold', () => {
    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            onChangeStatus: jest.fn(),
            anyOtherPeopleInYourHousehold: {
                value: '',
                isValid: false
            },
            statuses: {
                yourHouseholdStatus: 0
            }
        })
    })

    it('Should call history.push on submit', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        // Act
        const wrapper = mount(<AnyPeopleInYourHousehold history={history} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(DO_YOU_HAVE_ANY_PETS)
    })

    
    it('Should call history.push on submit when value is true', () => {
        // Arrange 
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            onChangeStatus: jest.fn(),
            anyOtherPeopleInYourHousehold: {
                value: true,
                isValid: false
            },
            statuses: {
                yourHouseholdStatus: 0
            }
        })
        const history = {
            push: jest.fn()
        }

        // Act
        const wrapper = mount(<AnyPeopleInYourHousehold history={history} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(WHO_LIVES_IN_YOUR_HOME)
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<AnyPeopleInYourHousehold history={{}}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})