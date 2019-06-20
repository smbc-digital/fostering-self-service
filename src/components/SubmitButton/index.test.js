import React from 'react'
import SubmitButton from '../SubmitButton'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Applicant } from '../../../Provider'

Enzyme.configure({ adapter: new Adapter() })

describe('SubmitButton', () => {
    afterEach(() => {
        global.scrollTo.mockReset()
    })

    it('should render Next Step and back button when the current applicant is first and there is no second applicant', () => {
        // Arrange
        const props = {
            currentApplicant: Applicant.FirstApplicant
        }

        const wrapper = mount(
            <SubmitButton {...props} />
        )
        
        // Assert
        expect(wrapper.find('')).toHaveBeenCalledWith(0,0)
    })
})