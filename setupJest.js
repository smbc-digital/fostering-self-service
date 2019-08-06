global.fetch = require('jest-fetch-mock')


/**
 * Suppress React 16.8 act() warnings globally.
 * The react teams fix won't be out of alpha until 16.9.0.
 */
const consoleError = console.error
global.console = {
    ...global.console,
    error: (...args) => {
        if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
            consoleError(...args)
        }
    }
}
