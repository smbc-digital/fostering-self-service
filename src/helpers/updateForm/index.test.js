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

    it('should parse both applicants data', () => {
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
            }
        }

        // Act
        const result = parseFormData(formData)

        // Assert
        expect(result.firstApplicant.firstName).toBe('first applicant first name')
        expect(result.secondApplicant.firstName).toBe('second applicant first name')
    })
})