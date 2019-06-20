import PropTypes from 'prop-types'
import { React, mount } from '../../helpers/SetupTest'
import Provider, { Applicant } from '../Provider'
import { Context } from '../../context/'
import * as helpers from '../../helpers'

const TestComponent = ({ context: {
    onChange,
    onChangeApplicant,
    onChangeStatus,
    someOtherProperty,
    firstApplicant,
    secondApplicant,
    status }
}) => {
    const onClick = () => {
        onChange(
            {
                target: {
                    name: 'someOtherProperty',
                    value: 'newValue'
                }
            },
            true
        )
    }

    const onClickApplicant = () => {
        onChangeApplicant(
            {
                target: {
                    name: 'firstName',
                    value: 'newName'
                }
            },
            true,
            Applicant.FirstApplicant
        )
    }

    const onClickStatus = () => {
        onChangeStatus(
            'status',
            1
        )
    }

    return (
        <div>
            <button
                id="test-button"
                onClick={onClick}
            >
                Test button
			</button>
            <button
                id="test-button-applicant"
                onClick={onClickApplicant}
            >
                Test button applicant
            </button>
            <button
                id="test-button-status"
                onClick={onClickStatus}
            >
                Test button status
            </button>
            <p className="name">{firstApplicant.firstName.value}</p>
            <p className="last-name">{firstApplicant.lastName.value}</p>
            <p className="status">{status}</p>
            <p className="someOtherProperty">{someOtherProperty.value}</p>
            {secondApplicant && <p className="second-applicant-name">{secondApplicant.firstName.value}</p>}
        </div>
    )
}

TestComponent.propTypes = {
    context: PropTypes.object
}

const mountProviderWithCase = async (children, secondApplicant) => {
    const mockCaseResponse = {
        fosteringCase: {
            statuses: {
                status: 0
            },
            firstApplicant: {
                firstName: 'firstName',
                lastName: ''
            },
            secondApplicant: secondApplicant || null,
            someOtherProperty: 'value'
        },
        country: [''], 
        ethnicity: [''], 
        nationality: ['']
    }

    const responseMock = { json: jest.fn().mockReturnValue(mockCaseResponse) }
    const fetchPromise = Promise.resolve(responseMock)
    helpers.fetchWithTimeout = jest.fn().mockReturnValue(fetchPromise)
    const wrapper = mount(<Provider>{children}</Provider>)

    // Ensure the response is mapped to context and isLoading state is updated
    await fetchPromise
    wrapper.setProps()
    await fetchPromise
    wrapper.setProps()

    return [wrapper, fetchPromise]
}

describe('Provider', () => {

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should render loading state', () => {
        // Arrange
        const wrapper = mount(<Provider />)

        // Assert
        expect(wrapper.find('p').text()).toEqual('Loading...')
    })

    it('should render error state', async () => {
        // Arrange
        const fetchPromise = Promise.reject(new Error())
        const wrapper = mount(<Provider />)
        helpers.fetchWithTimeout = jest.fn().mockReturnValue(fetchPromise)

        // Act & Assert
        try {
            await fetchPromise
        } catch (error) {
            wrapper.update()
        }

        try {
            await fetchPromise
        } catch (error) {
            expect(wrapper.find('p').text()).toEqual('Error')
        }
    })

    it('should render itself', async () => {
        // Arrange
        const [wrapper] = await mountProviderWithCase()

        // Assert
        expect(wrapper.find('Provider').exists()).toBe(true)
    })

    it('should map case to context', async () => {
        // Arrange
        const [wrapper] = await mountProviderWithCase(<Context.Consumer>{context => <TestComponent context={context} />}</Context.Consumer>)

        // Assert
        expect(wrapper.find('.name').text()).toEqual('firstName')
        expect(wrapper.find('.last-name').text()).toEqual('')
    })

    it('should map second applicant to context', async () => {
        // Arrange
        const [wrapper] = await mountProviderWithCase(<Context.Consumer>{context => <TestComponent context={context} />}</Context.Consumer>, { firstName: 'testName' })

        // Assert
        expect(wrapper.find('.second-applicant-name').text()).toEqual('testName')
    })

    describe('onChange', () => {
        it('should update state', async () => {
            // Arrange
            const [wrapper, fetchPromise] = await mountProviderWithCase(<Context.Consumer>{context => <TestComponent context={context} />}</Context.Consumer>)

            // Assert
            expect(wrapper.find('.someOtherProperty').text()).toEqual('value')
            wrapper.find('#test-button').simulate('click')
            wrapper.update()

            await fetchPromise
            expect(wrapper.find('.someOtherProperty').text()).toEqual('newValue')
        })
    })

    describe('onChangeApplicant', () => {
        it('should update state', async () => {
            // Arrange
            const [wrapper, fetchPromise] = await mountProviderWithCase(
                <Context.Consumer>
                    {context => <TestComponent context={context} />}
                </Context.Consumer>
            )

            // Assert
            expect(wrapper.find('.name').text()).toEqual('firstName')
            wrapper.find('#test-button-applicant').simulate('click')
            wrapper.update()

            await fetchPromise
            expect(wrapper.find('.name').text()).toEqual('newName')
        })
    })

    describe('onChangeStatus', () => {
        it('should update status', async () => {
            // Arrange
            const [wrapper, fetchPromise] = await mountProviderWithCase(
                <Context.Consumer>
                    {context => <TestComponent context={context} />}
                </Context.Consumer>
            )

            // Assert
            expect(wrapper.find('.status').text()).toEqual('0')

            wrapper.find('#test-button-status').simulate('click')
            wrapper.update()

            await fetchPromise
            expect(wrapper.find('.status').text()).toEqual('1')
        })
    })
})