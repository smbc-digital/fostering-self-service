import updateFromStatus, { FormName, TaskStatus } from '../updateFormStatus'

describe('updateFromStatus', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should call setStatus when TaskStatus is None', () => {
        const mockSetStatus = jest.fn()

        updateFromStatus(FormName.TellUsAboutYourself, TaskStatus.None, mockSetStatus)

        expect(mockSetStatus.mock.calls.length).toBe(1)
        expect(mockSetStatus.mock.calls[0][0]).toBe(TaskStatus.NotCompleted)
    })

    it('should not call setStatus when TaskStatus is NotCompleted', () => {
        const mockSetStatus = jest.fn()

        updateFromStatus(FormName.TellUsAboutYourself, TaskStatus.NotCompleted, mockSetStatus)

        expect(mockSetStatus.mock.calls.length).toBe(0)
    })
})