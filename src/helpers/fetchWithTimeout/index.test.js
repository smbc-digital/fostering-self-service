import fetchWithTimeout from './index'

describe('fetchWithTimeout', () => {
    
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should throw error on timeout', async () => {
        // Arrange
        const fetchPromise = new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 100)
        })

        global.fetch = jest.fn().mockReturnValue(fetchPromise)

        // Act & Assert
        await (expect(fetchWithTimeout('test',{}, 10)).rejects.toThrow('Timeout'))
    })

    it('should return result', async () => {
        // Arrange
        const mockResponse = { foo: 'bar '}
        const fetchPromise = new Promise(resolve => {
            setTimeout(() => {
                resolve(mockResponse)
            }, 100)
        })
        global.fetch = jest.fn().mockReturnValue(fetchPromise)

        // Act
        const result = await fetchWithTimeout('test')

        // Assert
        expect(result).toEqual(mockResponse)
    })
})