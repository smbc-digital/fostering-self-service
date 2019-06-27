import { React, mount, useContextMock, renderer } from '../../../helpers/SetupTest'
import { BrowserRouter as Router } from 'react-router-dom'
import Start from './index'

describe('Start', () => {

    beforeEach(() => {
        useContextMock.mockReturnValue({
            statuses: {
                tellUsAboutYourselfStatus: 1,
                yourEmploymentDetailsStatus: 2,
                languageSpokenInYourHomeStatus: 1,
                yourPartnershipStatus: 1,
                yourFosteringHistoryStatus: 2,
            },
            secondApplicant: {
                
            }
        })
    })
    
    it('should render correct Task status', () => {
        var wrapper = mount(<Router><Start/></Router>)
       
        expect(wrapper.find('span').get(2).props.className).toEqual('status-completed')
        expect(wrapper.find('span').get(3).props.className).toEqual('status-not-completed')
    })

    describe('snapshot', () => {
        it('renders correctly', () => {

            const tree = renderer
                .create(<Router><Start/></Router>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})