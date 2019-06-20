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

const callFrontendApi = async (endpoint, formData) => await fetch(endpoint,
    {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

export async function updateForm(form, formData, callApi = callFrontendApi) {
    switch (form) {
        case FormName.TellUsAboutYourself:
            return await callApi('/about-yourself', formData)
    }
}