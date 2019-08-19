import React from 'react'
import SubmitButton from '../SubmitButton'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Applicant } from 'constants'

Enzyme.configure({ adapter: new Adapter() })

describe('SubmitButton', () => {

    it('should render Next Step and back button when the current applicant is first and there is no second applicant', () => {
        // Arrange
        const props = {
            currentApplicant: Applicant.FirstApplicant,
            history: {}
        }

        const wrapper = mount(
            <SubmitButton {...props} />
        )
        
        // Assert
        expect(wrapper.find('Button')).toHaveLength(2)
        expect(wrapper.find('Anchor').exists()).toBe(true)
    })

    it('should render only next step', () => {
        // Arrange
        const props = {
            currentApplicant: Applicant.FirstApplicant,
            secondApplicant: {},
            history: {}
        }

        const wrapper = mount(
            <SubmitButton {...props} />
        )
        
        // Assert
        expect(wrapper.find('Button')).toHaveLength(1)
        expect(wrapper.find('Anchor').exists()).toBe(true)
    })
})