import { updateFormStatus, updateForm, FormName, TaskStatus, parseFormData } from '../updateForm'
import * as helpers from '../index'

describe('updateFormStatus', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should call setStatus when TaskStatus is None', () => {
        const mockSetStatus = jest.fn()

        updateFormStatus(FormName.TellUsAboutYourself, TaskStatus.None, mockSetStatus)

        expect(mockSetStatus.mock.calls.length).toBe(1)
        expect(mockSetStatus.mock.calls[0][0]).toBe(TaskStatus.NotCompleted)
    })

    it('should not call setStatus when TaskStatus is NotCompleted', () => {
        const mockSetStatus = jest.fn()

        updateFormStatus(FormName.TellUsAboutYourself, TaskStatus.NotCompleted, mockSetStatus)

        expect(mockSetStatus.mock.calls.length).toBe(0)
    })
})

describe('updateForm', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should throw error when endpoint not found', async () => {
        // Act & Assert
        await expect(updateForm('', {}))
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
        await updateForm(FormName.TellUsAboutYourself, {})

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
        await expect(updateForm(FormName.TellUsAboutYourself, {}))
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
        await updateForm(FormName.TellUsAboutYourself, {})
        
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
            await updateForm(formName, {})
    
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

    getFormUpdateEndpoint(FormName.YourEmploymentDetails, '/fostering/your-employment-details')
    getFormUpdateEndpoint(FormName.LanguagesSpokenInYourHome, '/fostering/languages-spoken-in-your-home')
    getFormUpdateEndpoint(FormName.YourFosteringHistory, '/fostering/your-fostering-history')
    getFormUpdateEndpoint(FormName.YourPartnership, '/fostering/partnership-status')
    getFormUpdateEndpoint(FormName.TellUsAboutYourInterestInFostering, '/fostering/interest-in-fostering')
    getFormUpdateEndpoint(FormName.YourHealth, '/fostering/about-your-health')
    getFormUpdateEndpoint(FormName.YourHousehold, '/fostering/household')
    getFormUpdateEndpoint(FormName.ChildrenLivingAwayFromYourHome, '/fostering/children-living-away-from-home')
    getFormUpdateEndpoint(FormName.GpDetails, '/fostering/gp-details')
    getFormUpdateEndpoint(FormName.References, '/fostering/update-references')

})