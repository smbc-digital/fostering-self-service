let API_ROOT = ''
let SecondApplicantRoute = 'second-applicant'
let Applicant = {
	FirstApplicant: 'firstApplicant',
	SecondApplicant: 'secondApplicant'
}
const hostname = window && window.location && window.location.hostname
const port = window && window.location && window.location.port

if (hostname === 'localhost' && port === '8080') {
    API_ROOT = 'http://localhost:57726'
}

export {
    API_ROOT,
    SecondApplicantRoute,
    Applicant
}