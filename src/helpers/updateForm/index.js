import { fetchWithTimeout } from '../index'

export const TaskStatus = {
    None: 0,
    Completed: 1,
    NotCompleted: 2,
    CantStart: 3
}

export const FormName =
{
    TellUsAboutYourself: 0,
    YourEmploymentDetails: 1,
    LanguagesSpokenInYourHome: 2,
    YourPartnership: 3,
    YourFosteringHistory: 4,
    YourHealth: 5,
    TellUsAboutYourInterestInFostering: 6,
    YourHousehold: 7,
    ChildrenLivingAwayFromYourHome: 7
}

export const updateFormStatus = (form, currentStatus, setStatus) => {
    if (currentStatus === TaskStatus.None) {
        fetchWithTimeout('/fostering/update-form-status',
            {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify({
                    status: TaskStatus.NotCompleted,
                    form
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }, 30000)

        setStatus(TaskStatus.NotCompleted)
    }
}

const reduceProperties = object => Object.keys(object).reduce((acc, property) => {
	return {
		...acc,
		[property]: object[property].value
	}
}, {})

export const parseFormData = ({ firstApplicant, secondApplicant, ...formData }) => {
    let parsedObject = reduceProperties(formData)

    if (firstApplicant) {
        parsedObject.firstApplicant = reduceProperties(firstApplicant)
    }

    if (secondApplicant) {
        parsedObject.secondApplicant = reduceProperties(secondApplicant)
    }

    return parsedObject
}

const getFormUpdateEndpoint = form => {
    switch (form) {
        case FormName.TellUsAboutYourself:
            return '/fostering/about-yourself'
        case FormName.YourEmploymentDetails:
            return '/fostering/your-employment-details'
        case FormName.LanguagesSpokenInYourHome:
            return '/fostering/languages-spoken-in-your-home'
        case FormName.YourFosteringHistory:
            return '/fostering/your-fostering-history'
        case FormName.YourPartnership:
            return '/fostering/partnership-status'
        case FormName.TellUsAboutYourInterestInFostering:
            return '/fostering/interest-in-fostering'
        default:
            throw new Error('No matching endpoint for given form.')
    }
}

export const updateForm = async (form, formData) => {
    const endpoint = getFormUpdateEndpoint(form)
    const parsedFormData = parseFormData(formData)

    const response = await fetchWithTimeout(endpoint, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(parsedFormData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }, 30000)

    if (!response.ok) {
        throw Error(response.statusText)
    }

    return await response.json()
}