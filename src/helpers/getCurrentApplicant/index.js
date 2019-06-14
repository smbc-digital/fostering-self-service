import { Applicant } from '../../components/Provider'
import { SecondApplicantRoute } from '../../config'

const getCurrentApplicant = match => {
    if (match.params && match.params[0] === SecondApplicantRoute) {
        return Applicant.SecondApplicant
    }

    return Applicant.FirstApplicant
}

export default getCurrentApplicant