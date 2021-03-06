import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import AboutYourInterest from './index'
import * as helpers from 'helpers'
import { TYPES_OF_FOSTERING } from 'routes'

describe('AboutYourInterest', () => {

    const onChangeStatusMock = jest.fn()
    helpers.updateFormStatus = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            onChange: jest.fn(),
            onChangeStatus: onChangeStatusMock,
            reasonsForFostering: '',
            statuses: {
                tellUsAboutYourInterestInFosteringStatus: 0
            }
        })
    })

    it('should update form status', async () => {
        // Arrange
        const mockPromise = Promise.resolve()
        helpers.updateFormStatus = jest.fn().mockImplementation(({ currentStatus, setStatus }) => {
            setStatus(currentStatus)
        })
        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)
        
        mount(<AboutYourInterest history={{}} />)
        
        // Act
        await mockPromise

        // Assert
        expect(helpers.updateFormStatus).toHaveBeenCalled()
        expect(onChangeStatusMock).toHaveBeenCalled()
    })
    
    it('should push to next page', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const wrapper = mount(<AboutYourInterest history={history} />)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(TYPES_OF_FOSTERING)
    })

    describe('snapshot', () => {

        it('should render correctly', () => {
            // Act
            const tree = renderer
                .create(<AboutYourInterest history={{}} />)
                .toJSON()

            // Assert
            expect(tree).toMatchSnapshot()
        })
    })
})