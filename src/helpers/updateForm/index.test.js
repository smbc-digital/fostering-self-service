import { updateFormStatus, updateForm, FormName, TaskStatus } from '../updateForm'

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

    it('should call function when FormName is TellUsAboutYourself', () => {
        const mockCallApi = jest.fn()

        const mockData = {
            test: 'test'
        }

        updateForm(FormName.TellUsAboutYourself, mockData, mockCallApi)

        expect(mockCallApi.mock.calls.length).toBe(1)
        expect(mockCallApi.mock.calls[0][0]).toBe('/about-yourself')
        expect(mockCallApi.mock.calls[0][1]).toBe(mockData)
    })
})