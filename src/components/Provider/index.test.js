import { React, mount } from '../../helpers/SetupTest'
import Provider from '../Provider'
import { Context } from '../../context/'
import * as helpers from '../../helpers'

const TestComponent = ({ context: { onChange, displayRecaptcha, firstName, lastName } }) => {
    const onClick = () => {
		onChange(
			{
				target: {
					name: 'firstName',
					value: 'new value'
				}
			},
			true
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
			{displayRecaptcha ? <p className="recaptcha" /> : <p className="no-recaptcha" />}
			<p className="name">{firstName.value}</p>
			<p className="last-name">{lastName.value}</p>
		</div>
	)
}

const mountProviderWithCase = async (children) => {
    const mockCaseResponse = {
        statuses: {
            status: 0
        },
        firstName: 'test',
        lastName: null
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
        const wrapper = mount(<Provider/>)

        // Assert
        expect(wrapper.find('p').text()).toEqual('Loading...')
    })

    it('should render error state', async () => {
        // Arrange
        const fetchPromise = Promise.reject(new Error())
        const wrapper = mount(<Provider/>)
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
        const [wrapper] = await mountProviderWithCase(<Context.Consumer>{context => <TestComponent context={context}/>}</Context.Consumer>)

        // Assert
        expect(wrapper.find('.name').text()).toEqual('test')
        expect(wrapper.find('.last-name').text()).toEqual('')
    })

    describe('reCaptcha', () => {
        it('should set display reCaptcha correctly when no div exists', async () => {
            // Arrange
            const [wrapper] = await mountProviderWithCase(<Context.Consumer>{context => <TestComponent context={context}/>}</Context.Consumer>)

            //Assert
            expect(wrapper.find('.no-recaptcha').exists()).toBe(true)
        })

        it('should set display reCaptcha correctly when div exists and value is true', async () => {
            // Arrange
            document.getElementById = jest.fn()
            document.getElementById.mockReturnValue(
                {
                    innerHTML: 'true'
                }
            )
            const [wrapper] = await mountProviderWithCase(<Context.Consumer>{context => <TestComponent context={context}/>}</Context.Consumer>)
            
            // Assert
            expect(wrapper.find('.recaptcha').exists()).toBe(true)
        })

        it('should set display reCaptcha correctly when div exists and value is false', async () => {
            // Arrange
            document.getElementById = jest.fn()
            document.getElementById.mockReturnValue(
                {
                    innerHTML: 'false'
                }
            )
            const [wrapper] = await mountProviderWithCase(<Context.Consumer>{context => <TestComponent context={context}/>}</Context.Consumer>)
            
            // Assert
            expect(wrapper.find('.no-recaptcha').exists()).toBe(true)
        })
    })

    describe('onChange', () => {
        it('should update state', async () => {
            // Arrange
            const [wrapper, fetchPromise] = await mountProviderWithCase(<Context.Consumer>{context => <TestComponent context={context}/>}</Context.Consumer>)

            // Assert
            expect(wrapper.find('.name').text()).toEqual('test')
            wrapper.find('#test-button').simulate('click')
            wrapper.update()
            
            await fetchPromise
            expect(wrapper.find('.name').text()).toEqual('new value')
        })
    })
})