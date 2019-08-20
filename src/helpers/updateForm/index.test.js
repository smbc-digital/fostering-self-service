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

    it('should reduce addrssHistory for first Application', async () => {
        const mockPromise = Promise.resolve({
            ok: true, 
            json: jest.fn()
        })

        const formDate = {
            firstApplicant: { 
                addressHistory: {
                    value: [
                        {address: {
                            addressLine1: {
                                value: undefined,
                                isValid: false
                            },
                            town: {
                                value: undefined,
                                isValid: false
                            },
                            country: {
                                value: undefined,
                                isValid: false
                            }
                        }, dateFrom: { value: '01/01/1999', isValid: true }}
                ]}
            },
            secondApplicant: { 
                addressHistory: {
                    value: [
                        {address: {
                            addressLine1: {
                                value: 'line1',
                                isValid: true
                            },
                            addressLine2: {
                                value: 'line2',
                                isValid: true
                            },
                            town: {
                                value: 'town',
                                isValid: true
                            },
                            county: {
                                value: 'county',
                                isValid: true
                            },
                            country: {
                                value: 'country',
                                isValid: true
                            },
                            postcode: {
                                value: 'postcode',
                                isValid: true
                            }
                        }, dateFrom: { value: '01/01/1999', isValid: true }}
                ]}
            }
        }

        helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)
        
        // Act
        await updateApplicationForm(ApplicationFormName.AddressHistory, formDate)

        // Assert
        expect(helpers.fetchWithTimeout).toHaveBeenCalledWith('/fostering/application/address-history', {
            method: 'PATCH',
            credentials: 'include',
            body: '{"firstApplicant":{"addressHistory":[{"address":{"addressLine2":"","county":"","postcode":""},"dateFrom":"01/01/1999"}]},"secondApplicant":{"addressHistory":[{"address":{"addressLine1":"line1","addressLine2":"line2","town":"town","county":"county","country":"country","postcode":"postcode"},"dateFrom":"01/01/1999"}]}}',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 30000)
    })
})

describe('getFormUpdateEndpoint' , () => {
 
    const getHomeVisitFormUpdateEndpoint = (formName, expectedEnpoint) => {
        it('should return correct endpoin for home visit form', async () => {
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

    getHomeVisitFormUpdateEndpoint(HomeVisitFormName.YourEmploymentDetails, '/fostering/home-visit/your-employment-details')
    getHomeVisitFormUpdateEndpoint(HomeVisitFormName.TellUsAboutYourself, '/fostering/home-visit/about-yourself')
    getHomeVisitFormUpdateEndpoint(HomeVisitFormName.LanguagesSpokenInYourHome, '/fostering/home-visit/languages-spoken-in-your-home')
    getHomeVisitFormUpdateEndpoint(HomeVisitFormName.YourFosteringHistory, '/fostering/home-visit/your-fostering-history')
    getHomeVisitFormUpdateEndpoint(HomeVisitFormName.YourPartnership, '/fostering/home-visit/partnership-status')
    getHomeVisitFormUpdateEndpoint(HomeVisitFormName.TellUsAboutYourInterestInFostering, '/fostering/home-visit/interest-in-fostering')
    getHomeVisitFormUpdateEndpoint(HomeVisitFormName.YourHealth, '/fostering/home-visit/about-your-health')
    getHomeVisitFormUpdateEndpoint(HomeVisitFormName.YourHousehold, '/fostering/home-visit/household')
    getHomeVisitFormUpdateEndpoint(HomeVisitFormName.ChildrenLivingAwayFromYourHome, '/fostering/home-visit/children-living-away-from-home')


    const getApplicationFormUpdateEndpoint = (formName, expectedEnpoint) => {
        it('should return correct endpoin for application form', async () => {
            const mockPromise = Promise.resolve({
                ok: true, 
                json: jest.fn()
            })
    
            helpers.fetchWithTimeout = jest.fn().mockReturnValue(mockPromise)
            
            // Act
            await updateApplicationForm(formName, {})
    
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

    getApplicationFormUpdateEndpoint(ApplicationFormName.AddressHistory, '/fostering/application/address-history')
    getApplicationFormUpdateEndpoint(ApplicationFormName.GpDetails, '/fostering/application/gp-details')
    getApplicationFormUpdateEndpoint(ApplicationFormName.References, '/fostering/application/references')
    getApplicationFormUpdateEndpoint(ApplicationFormName.Councillors, '/fostering/application/councillors-details')
})