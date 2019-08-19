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

global.__FORM_DATA = {
	fosteringCase: {
		statuses: {
			status: 0
		},
		firstApplicant: {
			firstName: 'firstName',
			lastName: '',
			addressHistory: [{address: {}, dateFrom: {}}]
		},
		secondApplicant: {
			firstName: 'testName' ,
			addressHistory: [{address: {}, dateFrom: {}}]
        },
		familyReference: {
			firstName: 'family',
			lastName: '',
			address: {
				postcode: ''
			}
		},
		firstPersonalReference: {
			firstName: 'firstPersonal',
			lastName: '',
			address: ''
		},
		secondPersonalReference: {
			firstName: 'secondPersonal',
			lastName: '',
			address: ''
		},
		someOtherProperty: 'value'
	},
	country: [''],
	ethnicity: [''],
	nationality: ['']
}

