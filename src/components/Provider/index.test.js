import PropTypes from 'prop-types'
import { React, mount } from 'helpers/SetupTest'
import Provider from '../Provider'
import { Applicant } from 'constants'
import { Context } from 'context'

const TestComponent = ({ context: {
    onChange,
    onChangeTarget,
    onChangeStatus,
    someOtherProperty,
    firstApplicant,
    secondApplicant,
    familyReference,
    statuses: { status } }
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
        onChangeTarget(
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
            <p className="address">{familyReference.address.value.postcode}</p>
            <p className="status">{status}</p>
            <p className="someOtherProperty">{someOtherProperty.value}</p>
            {secondApplicant && <p className="second-applicant-name">{secondApplicant.firstName.value}</p>}
        </div>
    )
}

TestComponent.propTypes = {
    context: PropTypes.object
}

describe('Provider', () => {

    delete window.location
    
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should map case to context', async () => {
        // Arrange
        const wrapper = mount(<Provider><Context.Consumer>{context => <TestComponent context={context} />}</Context.Consumer></Provider>)

        // Assert
        expect(wrapper.find('.name').text()).toEqual('firstName')
        expect(wrapper.find('.last-name').text()).toEqual('')
        expect(wrapper.find('.address').text()).toEqual('')
    })

    it('should map second applicant to context', async () => {
        // Arrange
        const wrapper = mount(<Provider><Context.Consumer>{context => <TestComponent context={context} />}</Context.Consumer></Provider>)

        // Assert
        expect(wrapper.find('.second-applicant-name').text()).toEqual('testName')
    })

    describe('onChange', () => {
        it('should update state', async () => {
            // Arrange
            const wrapper = mount(
				<Provider>
					<Context.Consumer>{context => <TestComponent context={context} />}</Context.Consumer>
				</Provider>
			)

            // Assert
            expect(wrapper.find('.someOtherProperty').text()).toEqual('value')
            wrapper.find('#test-button').simulate('click')
            wrapper.update()

            expect(wrapper.find('.someOtherProperty').text()).toEqual('newValue')
        })
    })

    describe('onChangeTarget', () => {
        it('should update state', async () => {
            // Arrange
            const wrapper = mount(
                <Provider>
                    <Context.Consumer>
                        {context => <TestComponent context={context} />}
                    </Context.Consumer>
                </Provider>
            )

            // Assert
            expect(wrapper.find('.name').text()).toEqual('firstName')
            wrapper.find('#test-button-applicant').simulate('click')
            wrapper.update()

            expect(wrapper.find('.name').text()).toEqual('newName')
        })
    })

    describe('onChangeStatus', () => {
        it('should update status', async () => {
            // Arrange
            const wrapper = mount(
                <Provider>
                    <Context.Consumer>
                        {context => <TestComponent context={context} />}
                    </Context.Consumer>
                </Provider>
            )

            // Assert
            expect(wrapper.find('.status').text()).toEqual('0')

            wrapper.find('#test-button-status').simulate('click')
            wrapper.update()

            expect(wrapper.find('.status').text()).toEqual('1')
        })
    })
})