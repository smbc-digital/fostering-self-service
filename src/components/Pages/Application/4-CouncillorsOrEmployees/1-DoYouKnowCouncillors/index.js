import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Anchor, RadioInputsContainer, Button } from 'smbc-react-components'
import { Context } from 'context'
import { 
    getCurrentApplicant, 
    updateApplicationForm,
    updateFormStatus, 
    ApplicationFormName,
    StageName
} from 'helpers'
import { 
    ABOUT_RELATIONSHIP_TO_COUNCIL_EMPLOYEES,
    RELATIONSHIP_TO_COUNCIL_EMPLOYEES,
    START_PAGE
} from 'routes'
import { Applicant } from 'constants'

const DoYouKnowCouncillors = ({ history, match }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)
    const currentApplicant = getCurrentApplicant(match)
    const { 
        firstApplicant, 
        secondApplicant, 
        onChangeTarget,
        onChangeStatus,
        statuses: { councillorsOrEmployeesStatus },
        [currentApplicant]: { hasContactWithCouncillor }
    } = useContext(Context)
    
    useEffect(() => {
        updateFormStatus({
            form: ApplicationFormName.Councillors,
            stage: StageName.Application,
            currentStatus: councillorsOrEmployeesStatus,
            setStatus: newStatus => onChangeStatus('councillorsOrEmployeesStatus', newStatus)
        })
    }, [])

    const hasContactWithCouncillorRadioValue = `${hasContactWithCouncillor.value}`

    const options = [
        {
            label: 'Yes',
            id: 'has-contact-with-councillor-yes',
            name: 'hasContactWithCouncillor',
            value: 'true'
        },
        {
            label: 'No',
            id: 'has-contact-with-councillor-no',
            name: 'hasContactWithCouncillor',
            value: 'false'
        }
    ]

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateApplicationForm(ApplicationFormName.Councillors, {
                firstApplicant,
                secondApplicant
            })
            onChangeStatus('councillorsOrEmployeesStatus', status)
            history.push(nextPageRoute)
        } catch(error) {
            console.log('YOU HAVE A ERROR, DIK DIK: ', error)
            history.push('/error')
        }
    }

    const onSubmit = event => {
        event.preventDefault()

        if (hasContactWithCouncillorRadioValue === 'true') {
            let nextPageRoute = ABOUT_RELATIONSHIP_TO_COUNCIL_EMPLOYEES

            if (currentApplicant === Applicant.SecondApplicant) {
                nextPageRoute += '/second-applicant'
            }

            history.push(nextPageRoute)
            return
        }

        let nextPageRoute = START_PAGE

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            nextPageRoute = `${RELATIONSHIP_TO_COUNCIL_EMPLOYEES}/second-applicant`
        }

        handleFormUpdate(nextPageRoute)
    }

    const onSaveAndGoBackClick = event => {
        event.preventDefault()
        event.stopPropagation()

        handleFormUpdate(START_PAGE)
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <form onSubmit={onSubmit}>
                <RadioInputsContainer
                    displayHeading
                    header='Do you have a personal relationship or any contact with a local councillor or council employee?'
                    value={hasContactWithCouncillorRadioValue}
                    onChange={(event, isValid) => onChangeTarget(event, isValid, currentApplicant)}
                    options={options}
                />
                <Button
                    label={hasContactWithCouncillorRadioValue === 'false' ? 'Save and next step' : 'Next step'}
                    isValid={!saveAndGoBackClicked && hasContactWithCouncillor.isValid}
                    isLoading={isLoading && !saveAndGoBackClicked}
                />
                <Anchor label='Back' history={history} />
                <Button
                    label="Save and go back to fostering area"
                    isValid={!isLoading && !saveAndGoBackClicked && hasContactWithCouncillorRadioValue === 'false'  && hasContactWithCouncillor.isValid}
                    isLoading={isLoading && saveAndGoBackClicked}
                    colour={hasContactWithCouncillorRadioValue !== 'false' ? 'disabled' : 'inverted'}
                    onButtonClick={event => {
                            setSaveAndGoBackClicked(true)
                            onSaveAndGoBackClick(event)
                        }
                    }
                    useLeftChevron
                />
            </form>
        </Fragment>
    )
}

export default DoYouKnowCouncillors