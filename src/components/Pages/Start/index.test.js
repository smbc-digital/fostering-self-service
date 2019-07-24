import moment from 'moment'
import { React, mount, useContextMock, renderer } from '../../../helpers/SetupTest'
import { BrowserRouter as Router } from 'react-router-dom'
import Start from './index'
import moment from 'moment'

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
                
            },
            homeVisitDateTime: {
                value: moment().add(60, 'm')
            }
        })
    })
    
    it('should render correct Task status', () => {
        var wrapper = mount(<Router><Start/></Router>)
       
        expect(wrapper.find('span').get(2).props.className).toEqual('status-completed')
        expect(wrapper.find('span').get(3).props.className).toEqual('status-not-completed')
    })

    it('should render disabled task list items', () => {
        // Arrange
        useContextMock.mockReturnValue({
            statuses: {},
            secondApplicant: {},
            homeVisitDateTime: { 
                value: moment().add(30, 'm')
            }
        })

        // Act
        let wrapper = mount(<Router><Start /></Router>)

        // Assert
        wrapper.find('FormLinks').children('TaskLink').forEach(node => {
            expect(node.props().disabled).toBe(true)
        })
    })

    it('should render task list items', () => {
        // Act
        let wrapper = mount(<Router><Start /></Router>)

        // Assert
        wrapper.find('FormLinks').children('TaskLink').forEach(node => {
            expect(node.props().disabled).toBe(false)
        })
    it('should render correct Task status after home visit is completed', () => {
        useContextMock.mockReturnValue({
            homeVisitDateTime: {
                value: moment().subtract(10, 'minutes')
            },
            statuses: {
                tellUsAboutYourselfStatus: 1,
                yourEmploymentDetailsStatus: 1,
                languageSpokenInYourHomeStatus: 1,
                yourPartnershipStatus: 1,
                yourFosteringHistoryStatus: 1,
            },
        })

        var wrapper = mount(<Router><Start/></Router>)
        expect(wrapper.find('TaskItem').get(2).props.status).toEqual(1)
    })

    it('should render correct status for Home Visit section', () => {
        // Arrange
        useContextMock.mockReturnValue({
            homeVisitDateTime: {
                value: moment().subtract(10, 'minutes')
            },
            statuses: {
                tellUsAboutYourselfStatus: 1,
                yourEmploymentDetailsStatus: 1,
                languageSpokenInYourHomeStatus: 1,
                yourPartnershipStatus: 1,
                yourFosteringHistoryStatus: 1,
            },
        })
        var wrapper = mount(<Router><Start/></Router>)
        
        // Assert
        expect(wrapper.find('TaskItem').get(3).props.status).toEqual(1)
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