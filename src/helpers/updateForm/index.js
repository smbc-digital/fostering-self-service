import { fetchWithTimeout } from '../index'

const TaskStatus = {
    None: 0,
    Completed: 1,
    NotCompleted: 2,
    CantStart: 3
}

const StageName = {
    HomeVisit: 0,
    Application: 1
}

const HomeVisitFormName = {
    TellUsAboutYourself: 0,
    YourEmploymentDetails: 1,
    LanguagesSpokenInYourHome: 2,
    YourPartnership: 3,
    YourFosteringHistory: 4,
    YourHealth: 5,
    TellUsAboutYourInterestInFostering: 6,
    YourHousehold: 7,
    ChildrenLivingAwayFromYourHome: 8
}

const ApplicationFormName = {
    References: 0,
    GpDetails: 1,
    AddressHistory: 2
}

const getHomeVisitUpdateEndpoint = form => {
    switch (form) {
        case HomeVisitFormName.TellUsAboutYourself:
            return '/fostering/home-visit/about-yourself'
        case HomeVisitFormName.YourEmploymentDetails:
            return '/fostering/home-visit/your-employment-details'
        case HomeVisitFormName.LanguagesSpokenInYourHome:
            return '/fostering/home-visit/languages-spoken-in-your-home'
        case HomeVisitFormName.YourFosteringHistory:
            return '/fostering/home-visit/your-fostering-history'
        case HomeVisitFormName.YourPartnership:
            return '/fostering/home-visit/partnership-status'
        case HomeVisitFormName.TellUsAboutYourInterestInFostering:
            return '/fostering/home-visit/interest-in-fostering'
        case HomeVisitFormName.YourHealth:
            return '/fostering/home-visit/about-your-health'
        case HomeVisitFormName.YourHousehold:
            return '/fostering/home-visit/household'
        case HomeVisitFormName.ChildrenLivingAwayFromYourHome:
            return '/fostering/home-visit/children-living-away-from-home'
        default:
            throw new Error('No matching endpoint for given form.')
    }
}

const getApplicationUpdateEndpoint = form => {
    switch (form) {
        case ApplicationFormName.References:
            return '/fostering/application/references'
        case ApplicationFormName.GpDetails:
            return '/fostering/application/gp-details'
        default:
            throw new Error('No matching endpoint for given form.')
    }
}

const getFormStageEndpoint = stage => {
    switch (stage) {
        case StageName.HomeVisit: 
            return '/fostering/home-visit'
        case StageName.Application:
            return '/fostering/application'
        default:
            throw new Error('No matching endpoint for given stage.')
    }
}

const reduceProperties = object => Object.keys(object).reduce((acc, property) => {
    return {
        ...acc,
        [property]: object[property].value
    }
}, {})

const updateForm = async (endpoint, formData) => {
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

const updateFormStatus = ({ form, stage, currentStatus, setStatus }) => {
    if (currentStatus === TaskStatus.None) {
        fetchWithTimeout(`${getFormStageEndpoint(stage)}/status`,
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

const parseFormData = ({ firstApplicant, secondApplicant, familyReference, firstPersonalReference, secondPersonalReference, ...formData }) => {
    let parsedObject = reduceProperties(formData)

    if (firstApplicant) {
        parsedObject.firstApplicant = reduceProperties(firstApplicant)
    }

    if (secondApplicant) {
        parsedObject.secondApplicant = reduceProperties(secondApplicant)
    }

    if (familyReference) {
        parsedObject.familyReference = reduceProperties(familyReference)
        parsedObject.familyReference.address = familyReference.address.value
    }

    if (firstPersonalReference) {
        parsedObject.firstPersonalReference = reduceProperties(firstPersonalReference)
        parsedObject.firstPersonalReference.address = firstPersonalReference.address.value
    }

    if (secondPersonalReference) {
        parsedObject.secondPersonalReference = reduceProperties(secondPersonalReference)
        parsedObject.secondPersonalReference.address = secondPersonalReference.address.value
    }

    return parsedObject
}

const updateApplicationForm = async (form, formData) => {
    const endpoint = getApplicationUpdateEndpoint(form)

    return await updateForm(endpoint, formData)
}

const updateHomeVisitForm = async (form, formData) => {
    const endpoint = getHomeVisitUpdateEndpoint(form)

    return await updateForm(endpoint, formData)
}

export {
    TaskStatus,
    StageName,
    HomeVisitFormName,
    ApplicationFormName,
    updateFormStatus,
    parseFormData,
    updateApplicationForm,
    updateHomeVisitForm
}