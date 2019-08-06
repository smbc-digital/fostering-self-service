import { 
    updateFormStatus, 
    updateApplicationForm, 
    updateHomeVisitForm,
    HomeVisitFormName,
    ApplicationFormName,
    TaskStatus, 
    StageName, 
    parseFormData 
} from '../updateForm'
import * as helpers from '../index'

describe('updateFormStatus', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should call setStatus when TaskStatus is None', () => {
        const mockSetStatus = jest.fn()

        updateFormStatus({
            form: HomeVisitFormName.TellUsAboutYourself,
             currentStatus: TaskStatus.None, 
             stage: StageName.HomeVisit,
             setStatus: mockSetStatus
        })

        expect(mockSetStatus.mock.calls.length).toBe(1)
        expect(mockSetStatus.mock.calls[0][0]).toBe(TaskStatus.NotCompleted)
    })

    it('should not call setStatus when TaskStatus is NotCompleted', () => {
        const mockSetStatus = jest.fn()

        updateFormStatus({
            form: HomeVisitFormName.TellUsAboutYourself,
            currentStatus: TaskStatus.NotCompleted, 
            stage: StageName.HomeVisit,
            setStatus: mockSetStatus
        })

        expect(mockSetStatus.mock.calls.length).toBe(0)
    })
})

describe('updateApplicationForm', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should throw error when endpoint not found', async () => {
        // Act & Assert
        await expect(updateApplicationForm('', {}))
            .rejects
            .toThrow('No matching endpoint for given form.')
    })

    it('should call fetchWithTimeout', async () => {
        // Arrange
        const mockPromise = Promise.resolve({
            ok: true, 
            json: jest.fn()
        })

        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)
        
        // Act
        await updateApplicationForm(ApplicationFormName.GpDetails, {})

        // Assert
        expect(helpers.fetchWithTimeout).toHaveBeenCalled()
    })

    it('should throw error', async () => {
        // Arrange
        const expectedError = 'Test error'
        const mockPromise = Promise.resolve({
            ok: false,
            statusText: expectedError
        })

        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)

        // Act & Assert
        await expect(updateApplicationForm(ApplicationFormName.GpDetails, {}))
            .rejects
            .toThrow(expectedError)
    })

    it('should call .json()', async () => {
        // Arrange
        const mockJson = jest.fn()

        const mockPromise = Promise.resolve({
            ok: true,
            json: mockJson
        })

        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)
        
        // Act
        await updateApplicationForm(ApplicationFormName.GpDetails, {})
        
        // Assert
        expect(mockJson).toHaveBeenCalled()
    })
})

describe('updateHomeVisitForm', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should throw error when endpoint not found', async () => {
        // Act & Assert
        await expect(updateHomeVisitForm('', {}))
            .rejects
            .toThrow('No matching endpoint for given form.')
    })

    it('should call fetchWithTimeout', async () => {
        // Arrange
        const mockPromise = Promise.resolve({
            ok: true, 
            json: jest.fn()
        })

        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)
        
        // Act
        await updateHomeVisitForm(HomeVisitFormName.YourEmploymentDetails, {})

        // Assert
        expect(helpers.fetchWithTimeout).toHaveBeenCalled()
    })

    it('should throw error', async () => {
        // Arrange
        const expectedError = 'Test error'
        const mockPromise = Promise.resolve({
            ok: false,
            statusText: expectedError
        })

        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)

        // Act & Assert
        await expect(updateHomeVisitForm(HomeVisitFormName.YourEmploymentDetails, {}))
            .rejects
            .toThrow(expectedError)
    })

    it('should call .json()', async () => {
        // Arrange
        const mockJson = jest.fn()

        const mockPromise = Promise.resolve({
            ok: true,
            json: mockJson
        })

        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)
        
        // Act
        await updateHomeVisitForm(HomeVisitFormName.YourEmploymentDetails, {})
        
        // Assert
        expect(mockJson).toHaveBeenCalled()
    })
})

describe('parseFormData()', () => {

    it('should parse both applicants data and reference details', () => {
        // Arrange
        const formData = {
            firstApplicant: {
                firstName: {
                    value: 'first applicant first name',
                    isValid: true
                }
            },
            secondApplicant: {
                firstName: {
                    value: 'second applicant first name',
                    isValid: true
                }
            },
            familyReference: {
                firstName: {
                    value: 'family reference first name',
                    isValid: true
                },
                address: {
                    value: {
                        postcode: 'family reference postcode'
                    }
                }
            },
            firstPersonalReference: {
                firstName: {
                    value: 'first personal reference first name',
                    isValid: true
                },
                address: {
                    value: {
                        postcode: 'first personal reference postcode'
                    }
                }
            },
            secondPersonalReference: {
                firstName: {
                    value: 'second personal reference first name',
                    isValid: true
                },
                address: {
                    value: {
                        postcode: 'second personal reference postcode'
                    }
                }
            }
        }

        // Act
        const result = parseFormData(formData)

        // Assert
        expect(result.firstApplicant.firstName).toBe('first applicant first name')
        expect(result.secondApplicant.firstName).toBe('second applicant first name')
        expect(result.familyReference.firstName).toBe('family reference first name')
        expect(result.familyReference.address.postcode).toBe('family reference postcode')
        expect(result.firstPersonalReference.firstName).toBe('first personal reference first name')
        expect(result.firstPersonalReference.address.postcode).toBe('first personal reference postcode')
        expect(result.secondPersonalReference.firstName).toBe('second personal reference first name')
        expect(result.secondPersonalReference.address.postcode).toBe('second personal reference postcode')
    })
})

describe('getFormUpdateEndpoint' , () => {
 
    const getFormUpdateEndpoint = (formName, expectedEnpoint) => {
        it('should return correct endpoin for form', async () => {
            const mockPromise = Promise.resolve({
                ok: true, 
                json: jest.fn()
            })
    
            helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)
            
            // Act
            await updateHomeVisitForm(formName, {})
    
            // Assert
            expect(helpers.fetchWithTimeout).toHaveBeenCalledWith(expectedEnpoint, {
                method: 'PATCH',
                credentials: 'include',
                body: '{}',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }, 30000)
        })
    }

    getFormUpdateEndpoint(HomeVisitFormName.YourEmploymentDetails, '/fostering/home-visit/your-employment-details')
    getFormUpdateEndpoint(HomeVisitFormName.LanguagesSpokenInYourHome, '/fostering/home-visit/languages-spoken-in-your-home')
    getFormUpdateEndpoint(HomeVisitFormName.YourFosteringHistory, '/fostering/home-visit/your-fostering-history')
    getFormUpdateEndpoint(HomeVisitFormName.YourPartnership, '/fostering/home-visit/partnership-status')
    getFormUpdateEndpoint(HomeVisitFormName.TellUsAboutYourInterestInFostering, '/fostering/home-visit/interest-in-fostering')
    getFormUpdateEndpoint(HomeVisitFormName.YourHealth, '/fostering/home-visit/about-your-health')
    getFormUpdateEndpoint(HomeVisitFormName.YourHousehold, '/fostering/home-visit/household')
    getFormUpdateEndpoint(HomeVisitFormName.ChildrenLivingAwayFromYourHome, '/fostering/home-visit/children-living-away-from-home')
})