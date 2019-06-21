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
    LanguageSpokenInYourHome: 2,
    YourPartnership: 3,
    YourFosteringHistory: 4,
    YourHealth: 5,
    TellUsAboutYourInterestInFostering: 6,
    YourHousehold: 7,
    ChildrenLivingAwayFromYourHome: 7
}

export function updateFormStatus(form, currentStatus, setStatus) {
    if (currentStatus === TaskStatus.None) {
        fetch('/fostering/update-form-status',
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
            })

        setStatus(TaskStatus.NotCompleted)
    }
}

const callFrontendApi = async (endpoint, formData) => {
    return await fetch(endpoint,
        {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
}

const reduceProperties = object => Object.keys(object).reduce((acc, property) => {
	return {
		...acc,
		[property]: object[property].value
	}
}, {})

const parseFormData = ({ firstApplicant, secondApplicant, ...formData }) => {
    let parsedObject = reduceProperties(formData)

    if (firstApplicant) {
        parsedObject.firstApplicant = reduceProperties(firstApplicant)
    }

    if (secondApplicant) {
        parsedObject.secondApplicant = reduceProperties(secondApplicant)
    }

    return parsedObject
}

export async function updateForm(form, formData, callApi = callFrontendApi) {
    let response = null
    switch (form) {
        case FormName.TellUsAboutYourself:
            response = await callApi('/fostering/about-yourself', parseFormData(formData))
            break
    }

    if(response.status !== 200) {
        return {
            isSuccessful: false
        }
    }

    try{
        response = await response.json()
    } catch(ex) {
        return {
            isSuccessful: false
        }
    }

    return {
        isSuccessful: true,
        status: response
    }
}