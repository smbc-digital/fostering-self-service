import moment from 'moment-timezone'
import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import { BrowserRouter as Router } from 'react-router-dom'
import Start from './index'

describe('Start', () => {

    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn()

        useContextMock.mockReturnValue({
            homeVisitDateTime: {
                value: moment().add(10, 'minutes').format('DD/MM/YYYY HH:mm')
            },
            enableAdditionalInformationSection: {
                value: true
            },
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
       
        expect(wrapper.find('span').get(0).props.className).toEqual('status-completed')
        expect(wrapper.find('span').get(1).props.className).toEqual('status-completed')
        expect(wrapper.find('span').get(2).props.className).toEqual('status-completed')
    })

    it('should render disabled task list items', () => {
        // Arrange
        useContextMock.mockReturnValue({
            statuses: {},
            secondApplicant: {},
            homeVisitDateTime: { 
                value: moment().add(30, 'minutes').format('DD/MM/YYYY HH:mm')
            },
            enableAdditionalInformationSection: {
                value: true
            },
        })

        // Act
        let wrapper = mount(<Router><Start /></Router>)

        // Assert
        wrapper.find('FormLinks').children('TaskLink').forEach(node => {
            expect(node.props().disabled).toBe(true)
        })
    })

    it('should render task list items', () => {
        // Arrange
        useContextMock.mockReturnValue({
            homeVisitDateTime: {
                value: moment().add(10, 'd').format('DD/MM/YYYY HH:mm')
            },
            enableAdditionalInformationSection: {
                value: false
            },
            statuses: {}
        })

        // Act
        let wrapper = mount(<Router><Start /></Router>)

        // Assert
        wrapper.find('FormLinks').children('TaskLink').forEach(node => {
            expect(node.props().disabled).toBe(false)
        })
    })
    
    it('should render correct Task status after home visit is completed', () => {
        useContextMock.mockReturnValue({
            homeVisitDateTime: {
                value: moment().subtract(10, 'minutes').format('DD/MM/YYYY HH:mm')
            },
            enableAdditionalInformationSection: {
                value: false
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
                value: moment().subtract(10, 'minutes').format('DD/MM/YYYY HH:mm')
            },
            enableAdditionalInformationSection: {
                value: true
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


    it('should not render TaskLink statuses', () => {
        // Arrange
        useContextMock.mockReturnValue({
            homeVisitDateTime: {
                value: moment().subtract(10, 'minutes').format('DD/MM/YYYY HH:mm')
            },
            enableAdditionalInformationSection: {
                value: true
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
        wrapper.find('TaskLink').forEach(item => {
            expect(item.props().status).toBe(undefined)
        })
    })

    it('should render home visit date and time', () => {
        //Arrange
        const mockedDate = moment()
        useContextMock.mockReturnValue({
            homeVisitDateTime: {
                value: mockedDate.format('DD/MM/YYYY HH:mm')
            },
            enableAdditionalInformationSection: {
                value: true
            },
            statuses: {
                tellUsAboutYourselfStatus: 1,
                yourEmploymentDetailsStatus: 1,
                languageSpokenInYourHomeStatus: 1,
                yourPartnershipStatus: 1,
                yourFosteringHistoryStatus: 1,
            }
        })

        //Act
        const wrapper = mount(<Router><Start/></Router>)

        //Assert
        expect(wrapper.find('TaskItem').at(3).text()).toContain(mockedDate.format('DD/MM/YYYY'))
        expect(wrapper.find('TaskItem').at(3).text()).toContain(mockedDate.format('HH:mm'))
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            useContextMock.mockReturnValue({
                homeVisitDateTime: {
                    value: null
                },
                enableAdditionalInformationSection: {
                    value: true
                },
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

            const tree = renderer
                .create(<Router><Start/></Router>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('renders correctly with home visit date', () => {
            useContextMock.mockReturnValue({
                homeVisitDateTime: {
                    value: moment('25/07/2190 13:10', 'DD/MM/YYYY HH:mm')
                },
                enableAdditionalInformationSection: {
                    value: true
                },
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

            const tree = renderer
                .create(<Router><Start/></Router>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})