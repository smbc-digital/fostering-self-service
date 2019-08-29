import { Applicant, SECOND_APPLICANT_ROUTE } from 'constants'

const getCurrentApplicant = match => {
    if (match.params && match.params[0] === SECOND_APPLICANT_ROUTE) {
        return Applicant.SecondApplicant
    }

    return Applicant.FirstApplicant
}

export default getCurrentApplicant