import { Applicant } from '../../components/Provider'

const getCurrentApplicant = match => {
    if (match.params && match.params[0] === 'second-applicant') {
        return Applicant.SecondApplicant
    }

    return Applicant.FirstApplicant
}

export default getCurrentApplicant