import { Applicant } from 'constants'
import { SecondApplicantRoute } from '../../config'

const getCurrentApplicant = match => {
    if (match.params && match.params[0] === SecondApplicantRoute) {
        return Applicant.SecondApplicant
    }

    return Applicant.FirstApplicant
}

export default getCurrentApplicant