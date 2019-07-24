let API_ROOT = ''
let AfterHomeVisitTimePeriod = {
    unit: 'minutes',
    value: 5
}
let SecondApplicantRoute = 'second-applicant'
let Applicant = {
	FirstApplicant: 'firstApplicant',
	SecondApplicant: 'secondApplicant'
}
const FosteringErrorRoute = '/fostering/error'

const hostname = window && window.location && window.location.hostname
const port = window && window.location && window.location.port

if (hostname === 'localhost' && port === '8080') {
    API_ROOT = 'http://localhost:57726'
} else if (hostname === 'myaccount.stockport.gov.uk' || hostname === 'staging-dts.smbcdigital.net') {
    AfterHomeVisitTimePeriod = {
        unit: 'hours',
        value: 3
    }
}

export {
    API_ROOT,
    SecondApplicantRoute,
    Applicant,
    FosteringErrorRoute,
    AfterHomeVisitTimePeriod
}