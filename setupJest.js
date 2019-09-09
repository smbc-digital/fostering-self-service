global.fetch = require('jest-fetch-mock')

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

