import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import MoreAboutYou from './index'
import { Applicant } from 'components/Provider'
import * as helpers from 'helpers'
import { ARE_YOU_EMPLOYED, KNOWN_BY_ANOTHER_NAME, START_PAGE } from 'routes'

describe('MoreAboutYou', () => {

    const onChangeStatusMock = jest.fn()
    const onChangeTargetMock = jest.fn()

    beforeEach(() => {
        useContextMock.mockReturnValue({
            currentApplicant: Applicant.FirstApplicant,
            onChangeTarget: onChangeTargetMock,
            onChangeStatus: onChangeStatusMock,
            country: [],
            nationality: [],
            ethnicity: [],
            firstApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'true',
                    isValid: true
                },
                firstName: {
                    value: 'first name',
                    isValid: true
                },
                lastName: {
                    value: 'last name',
                    isValid: true
                },
                sexualOrientation: {
                    value: 'test',
                    isValid: true
                },
                nationality: {
                    value: 'a place',
                    isValid: true
                },
                ethnicity: {
                    value: 'a place',
                    isValid: true
                },
                religion: {
                    value: 'a place',
                    isValid: true
                },
                placeOfBirth: {
                    value: 'a place',
                    isValid: true
                }, 
                gender: {
                    value: 'a place',
                    isValid: true
                }
            },
            secondApplicant: {
                everBeenKnownByAnotherName: {
                    value: 'false',
                    isValid: true
                },
                firstName: {
                    value: 'second applicant first name',
                    isValid: true
                },
                lastName: {
                    value: 'second applicant last name',
                    isValid: true
                },
                sexualOrientation: {
                    value: 'test',
                    isValid: true
                },
                nationality: {
                    value: 'a place',
                    isValid: true
                }, 
                ethnicity: {
                    value: 'a place',
                    isValid: true
                }, 
                religion: {
                    value: 'a place',
                    isValid: true
                }, 
                placeOfBirth: {
                    value: 'a place',
                    isValid: true
                }, 
                gender: {
                    value: 'a place',
                    isValid: true
                }
            }
        })
    })

    it('should push to next page on submit, when first applicant', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(ARE_YOU_EMPLOYED)
    })

    it('should push to next page on submit, when second applicant', () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: undefined
        }

        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith(`${KNOWN_BY_ANOTHER_NAME}/second-applicant`)
    })

    it('should call updateForm on form submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(helpers.updateHomeVisitForm).toHaveBeenCalled()
    })

    it('should call onChangeStatus on form submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('tellUsAboutYourselfStatus', 0)
    })

    it('should call updateForm on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm =  jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        await wrapper.find('button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(helpers.updateHomeVisitForm).toHaveBeenCalled()
    })

    it('should push to start page on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }
        helpers.updateHomeVisitForm = jest.fn().mockReturnValue(Promise.resolve(0))

        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        await wrapper.find('button').at(1).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(START_PAGE)        
    })

    it('should push to error page on updateForm error', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        helpers.updateHomeVisitForm = jest.fn().mockImplementation(() => { throw new Error() })
        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

    it('should call onChangeTarget', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }

        const match = {
            params: ['second-applicant']
        }

        const wrapper = mount(<MoreAboutYou history={history} match={match}/>)

        // Act
        wrapper
            .find('input')
            .first()
            .simulate('change')

        // Assert
        expect(onChangeTargetMock).toHaveBeenCalled()
    })

    describe('snapshot', () => {
        it('renders correctly', () => {
            const match = {
                params: undefined
            }

            const tree = renderer
                .create(<MoreAboutYou history={{}} match={match}/>)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})